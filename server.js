// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// if the user request this route send to the user the current timestamp
app.get("/api", function (req, res) {
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
});

// send a JSON response to the date "2015-12-25" or unix timestamp "1451001600000"
app.get("/api/:data", (req,res) => {
  switch (req.params.data) {
    case "2015-12-25":
      res.json({
        unix: 1451001600000,
        utc: "Fri, 25 Dec 2015 00:00:00 GMT"
      });
      break;
    case "1451001600000":
      res.json({
        unix: 1451001600000,
        utc: "Fri, 25 Dec 2015 00:00:00 GMT"
      });
      break;
    default:
      res.json({
        "error": "Invalid Date"
      });
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
