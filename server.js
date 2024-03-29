// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var bodyParser = require('body-parser')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  //console.log(req.params.date_string);
  if(req.params.date_string==' '|| req.params.date_string==undefined){
    var date_utc = new Date().toUTCString();
    var date_unix = new Date().getTime();
    
  }else if(req.params.date_string.split('-').length==3){
    var date_utc = new Date(req.params.date_string).toUTCString();
    var date_unix = new Date(req.params.date_string).getTime();
    
  }else if(isNaN(Number(req.params.date_string))){ 
    res.json({"error" : "Invalid Date" });
    
  }else{
    var date_utc = new Date(Number(req.params.date_string)*1000).toUTCString();
    var date_unix = Number(req.params.date_string);
  }
  res.json({"unix": date_unix, "utc": date_utc});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
