# Switch Shopify Web Pixel Installation Documentation


The following instructions will walk you through installing web pixel code on a Shopify store. This will allow a connection to be made from Shopify to Google Tag Manager (GTM) by pushing info from the Shopify experience to the GTM DataLayer for use in enhanced conversion tracking.

1. Login to the backend of the Shopify store, where you will be installing the web pixel.
2. Select the "Settings" option in the bottom left of your admin dashboard.\
![Shopify Webstore Settings Link](https://lh3.googleusercontent.com/d/1xCGNmfwCyTTHDQxBHuMSwVPMAZ7iJzTr)

3. Select the "Customer Events" option within the menu that will pop up. From here, select "Add Custom Pixel" and enter **"Switch Growth Web Pixel"**\
![Shopify Web Pixel Naming Popup](https://lh3.googleusercontent.com/d/1S1Eksv7ldZuelgwSFdku2djywjNsohlv)

4. Set the following for the privacy and data settings.\
![Shopify Web Pixel Privacy and Data Settings](https://lh3.googleusercontent.com/d/1siqt0XVxZt1DgqdVeYCiOBUH8_8ppyY5)

5. Paste the script code from `web_pixel.js` file in this repository.

6. Make sure to replace "GTM-XXXXXXX" with the proper GTM container ID for the store.

## Confirm Installation / Debugging

At the top of the `web_pixel.js` file, there is a `const` called `debugMode` that is set to false. By setting this to true, you will enable `console.log` calls that will fire on the Shopify store checkout or after a purchase is complete. 

The console log's output will be the state of the GTM DataLayer after the latest events data has been pushed. Make sure to turn this off once you have confirmed that things are firing as intended.
