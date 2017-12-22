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


//NOTE:  I added the "1" to tables and waitlist to work with empty arrays.  Remove the 1 if we want to work with full arrays.
var tables1 = [{
        customerName: "Ahmed",
        customerEmail: "afhaque89@gmail.com",
        customerID: "afhaque89",
        phoneNumber: "979-587-0887"
    },
    {
        customerName: "John Liscar",
        phoneNumber: "7065706063",
        customerEmail: "john.liscar@gmail.com",
        customerID: "1424"
    },
    {
        customerName: "Austin Branham",
        phoneNumber: "7708837281",
        customerEmail: "austinhb1993@gmail.com",
        customerID: "1354"
    },
    {
        customerName: "Rick James",
        phoneNumber: "555 555 5555",
        customerEmail: "rickjames@rickjames.com",
        customerID: "9193"
    },
    {
        customerName: "Miki",
        phoneNumber: "555-555-5555",
        customerEmail: "miki@gmail.com",
        customerID: "miki3"
    }
];

var waitlist1 = [{
        customerName: "Ahmed",
        customerEmail: "afhaque89@gmail.com",
        customerID: "afhaque89",
        phoneNumber: "979-587-0887"
    },
    {
        customerName: "John Liscar",
        phoneNumber: "7065706063",
        customerEmail: "john.liscar@gmail.com",
        customerID: "32"
    },
    {
        customerName: "Austin Branham",
        phoneNumber: "7708837281",
        customerEmail: "austinhb1993@gmail.com",
        customerID: "43"
    },
    {
        customerName: "Rick James",
        phoneNumber: "555 555 5555",
        customerEmail: "rickjames@rickjames.com",
        customerID: "55"
    },
    {
        customerName: "Miki",
        phoneNumber: "555-555-5555",
        customerEmail: "miki@gmail.com",
        customerID: "miki3"
    }
];
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
    newReservation.routeName = newReservation.customerName.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
   

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