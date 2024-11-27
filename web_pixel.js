// Initialize the Google Tag Manger / GTag Library

const gtmContainerId = "GTM-XXXXXXXX"
const debugMode = false;
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

//Initialize GTM tag
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer', gtmContainerId);

// The keys in this object are the Shopify events that are sent to the GTM
// The values are the corresponding GTM events for tracking
const shopifyToGTMEventMapping = {
  'checkout_started': 'begin_checkout', // Checkout Started Event (Checkout information page loaded)
  'checkout_contact_info_submitted': "begin_checkout", // Contact Info (email) provided in checkout form
  'checkout_shipping_info_submitted': "add_shipping_info", // Shipping Info provided in checkout form
  'payment_info_submitted': "add_payment_info", // Payment Info provided in checkout form
  'checkout_completed': "purchase", // Checkout Completed Event Purchase was made
}

// Subscribe to all Shopify events
analytics.subscribe('all_events', (event) => {
  if (event.name && shopifyToGTMEventMapping[event.name]) {
    pushCheckoutData(shopifyToGTMEventMapping[event.name], event);
  }
});

function pushCheckoutData(eventName, event) {
  // Example for accessing event data
  const checkout = event.data.checkout;
    const dataPayload = {
    "email": formatEmail(checkout?.email),
    "phone_number": formatPhone(checkout?.phone),
    "address": {
      "first_name": checkout?.shippingAddress.firstName,
      "last_name": checkout?.shippingAddress.lastName,
      "city": checkout?.shippingAddress.city,
      "region": checkout?.shippingAddress.provinceCode,
      "postal_code": checkout?.shippingAddress.zip,
      "country": checkout?.shippingAddress.countryCode
    }
  };

  var cleanedUserData = removeEmptyAttributes(dataPayload)

  if (Object.keys(cleanedUserData).length > 0) {
    // Sets the user data specific to Google products like Analytics https://support.google.com/analytics/answer/14171598?hl=en
    gtag('set', 'user_data', cleanedUserData);
    gtag('config', gtmContainerId, {'allow_enhanced_conversions':true});

    // Event specific Datalayer Push
    window.dataLayer.push(removeEmptyAttributes({
      "event": eventName,
      "transaction_id": checkout?.order?.id,
      "currency": checkout?.currencyCode,
      "price": checkout?.totalPrice.amount,
      "shipping_cost": checkout?.shippingLine.price.amount,
      "total_tax": checkout?.totalTax,
      ...cleanedUserData
    }))

    if (debugMode) {
      console.log(window.dataLayer);
    }
  }
}

function formatEmail(email) {
  if (email && email.trim() !== '') {
      email = email.toLowerCase();
      return email;
  }

  return undefined;
}

function formatPhone(phoneValue) {
  if (phoneValue && phoneValue.trim() !== '') {
        phoneValue = phoneValue.replace(/\D/g,'')
        return "+" + phoneValue;
    } else {
        return undefined;
    }
}

function removeEmptyAttributes(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj; // Return primitive values as is
  }

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v != null) // Remove null or undefined attributes
      .map(([k, v]) => [k, removeEmptyAttributes(v)]) // Recursively handle nested objects
  );
}

