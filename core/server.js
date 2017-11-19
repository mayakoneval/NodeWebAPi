const http = require('http');
var mqtt = require('mqtt');
var db = require("./database");

var mqtt_client = mqtt.connect('mqtt://test.mosquitto.org');

const port = 3000;
const querystring = require('querystring');

function onRequest(req, res) {
    var query_string = querystring.parse((req.url).substring(1));
    if(query_string.listtablecontent != undefined) {
      db.listTable(req, res);
    }
    else if(query_string.firstname != undefined) {
      mqtt_client.publish('xagora', 'added'+JSON.stringify(query_string));
      db.addValue(req, res, query_string);
    }
    else if(query_string.end != undefined) {
      res.end("ending");
      db.endPool();
      mqtt_client.end();
    }
    else {
      res.end("Oops looks like this is not a valid url for this Node web API, if you are using node-red try adding a name with /add?firstname=___&lastname=______, or see your current table of names in JSON format with /noderedlist. If you are not going through node-red try adding a name with /firstname=___&lastname=______, or see your current table of names in JSON format with /listtablecontent");
    }
}

http.createServer(onRequest).listen(port);
console.log("Server has started.");
