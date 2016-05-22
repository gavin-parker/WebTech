Gavin Parker - gp14958
Mudit Gupta - mg14777

Firstly, sorry for the file size! (lots of images). Some images are needed to demonstrate functionality,
while the server stores more as holidays are added.
If safe is too slow, you could download the files from here:
https://github.com/gavin-parker/WebTech

/////Client Side/////
The pages have been validated for HTML5 polyglot.
Pages are delivered properly as XHTML to new browsers.
em & % has been used to account for different screen resolutions.

/////Old Browsers/////
On testing the site on IE11 it degrades gracefully. Most features are retained except some animations and fonts. The carousel doesn't rotate automatically.

///////Startup //////
To run the server, navigate to the folder containing server.js and run 'node server'

Without the server, a lot of the page elements will be missing.
//// Dependencies /////
Some packages have been used for the server that can be installed through npm:
bcryptjs
sqlite3

The client side uses AngularJS, Bootstrap and leaflet.

/////Security /////
All passwords are hashed/salted before being stored in the database so should be safe,
however these are sent to the server from the client using http requests. If connecting
to the https server, this is secure, however the certificate is a dummy certificate and
 for demonstration purposes we have left the regular, insecure server too.
Passwords are also stored as part of the sessiondata on the client's machine,
though this is wiped when the tab is closed.

/////Features /////
Our site (Vaca-tron) let's users submit holiday reviews, read other's reviews and
comment on them. To submit a review click 'Your Story', and you can enter the details.

To view other holidays you can scroll to the bottom of the main page and view them
on an interactive map or click 'Top Destinations' to see them with pictures in
a pinterest-style board. If logged in, you can also comment below them.

Pictures for locations are found using the pixabay-API, and location data is reverse
-geocoded through the opencagedata API.

Though rough around the edges, the site has been designed with mobile in mind,
so some elements will collapse in and flashy features will be removed when
viewing on a small device.


/////Animations/////
There is some css animation on buttons and the tiled images on the main page as
well as some js animation on the holiday submission form.
Javascript animation is used for fade in effect on scrolling.

/////Images & Drawing 
The weather/price icons are vector graphics made in inkscape while the logo is a png made in GIMP.
