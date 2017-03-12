// server.js
// host web app and link to results database

//PACKAGES
//=================================================

var express = require('express'); //call express
var app = express();
app.use(express.static('Flatfy V3'));



// SETUP
// ================================================

var port = process.env.PORT || 5000; // set the port


// ROUTES
// ================================================

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Flatfy V3/start.html');
});

//start the server
app.listen(port);
console.log("server listening on port "+ port);


