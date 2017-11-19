const http = require('http');
var mqtt = require('mqtt');
var db = require("./database");

var mqtt_client = mqtt.connect('mqtt://test.mosquitto.org');

const port = 3000;
const querystring = require('querystring');

function onRequest(req, res) {
    var query_string = querystring.parse((req.url).substring(1));
    res.writeHead(200, { "Content-Type": "application/json" });
    if(query_string.listtablecontent != undefined) {
      db.listTable(req, res);
    }
    else if(query_string.firstname != undefined) {
      res.end("Successfully added content. firstname: " + query_string.firstname + ", lastname: " + query_string.lastname);
      mqtt_client.publish('test', 'added'+JSON.stringify(query_string));
      db.addValue(req, res, [query_string.firstname, query_string.lastname]);
    }
    else {
      res.end("Oops looks like this is not a valid url for this Node web API, try adding a name with /firstname=___&lastname=______, or see your current table of names in JSON format with /listtablecontent");
    }
}

http.createServer(onRequest).listen(port);
mqtt_client.end();
console.log("Server has started.");
