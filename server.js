// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;


// Table reservations (DATA)
// =============================================================
var tables = [{
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

var waitlist = [{
        customerName: "Ahmed",
        customerEmail: "afhaque89@gmail.com",
        customerID: "afhaque89",
        phoneNumber: "979-587-0887"
    },
    {
        customerName: "John Liscar",
        phoneNumber: "7065706063",
        customerEmail: "john.liscar@gmail.com",
        customerID: ""
    },
    {
        customerName: "Austin Branham",
        phoneNumber: "7708837281",
        customerEmail: "austinhb1993@gmail.com",
        customerID: ""
    },
    {
        customerName: "Rick James",
        phoneNumber: "555 555 5555",
        customerEmail: "rickjames@rickjames.com",
        customerID: ""
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
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newreservation = req.body
    // Using a RegEx Pattern to remove spaces from newCharacter
    if (tables.length < 2) {
        tables.push(newreservation);
        res.json(true);
        console.log(true);
    } else {
        waitlist.push(newreservation);
        res.json(false);
        console.log(false);
    }

    console.log(waitlist);
    console.log(tables);

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});