///////Startup //////
To run the servewr, navigate to the folder containing server.js and run 'node server'

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

The pages have been validated for HTML5 polyglot.

Gavin Parker
Mudit Gupta
