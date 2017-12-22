// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App -- I ADDED BELOW TO MAKE SURE IT WILL WORK WITH HEROKU
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Table reservations (DATA)
// =============================================================

var tables = [];
var waitlist = [];

    

//Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
});

// Search for table reservations - provides JSON
app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

// Search for waitlist reservations - provides JSON
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

// Create New Reservations - takes in JSON input
app.post("/api/new", function(req, res) {

    var newReservation = req.body
    
    // Using a RegEx Pattern to remove spaces from newCharacter
    //newReservation.routeName = newReservation.customerName.replace(/\s+/g, "").toLowerCase();
    //console.log(newReservation);
   

    if (tables.length < 5) {
         tables.push(newReservation);
         console.log(true);
         return res.json(true);
         
      } else {
          waitlist.push(newReservation);
          console.log(false);
          return res.json(false);
         
       }
    

});






// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});