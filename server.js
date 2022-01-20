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

app.get("/api/:date", (req,res) => {
  let date = req.params.date.includes('-');
  switch (date) {
    case true:
      if (isNaN(new Date(req.params.date).getTime())){
        res.json({
          "error": "Invalid Date"
        });       
      } else {
        res.json({
          unix: new Date(req.params.date).getTime(),
          utc: new Date(req.params.date).toUTCString()
        });
      }
      break;
    case false:
      if (req.params.date.indexOf(' ') == -1) {
        let unixI = parseInt(req.params.date);
        res.json({
          unix: new Date(unixI).getTime(),
          utc: new Date(unixI).toUTCString()
        });      
      } else {
        res.json({
          unix: new Date(req.params.date).getTime(),
          utc: new Date(req.params.date).toUTCString()
        });
      }
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
