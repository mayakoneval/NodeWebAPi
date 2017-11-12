const http = require('http');
var db = require("./database");

const hostname = '127.0.0.1';
const port = 3000;
const querystring = require('querystring');

function onRequest(req, res) {
    var query_string = querystring.parse(req.url);
    if(query_string["/listtablecontent"] != undefined) {
      res.writeHead(200, { "Content-Type": "text/html" });
      db.listTable(req, res);
    }
    else if(query_string["/firstname"] != undefined) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Successfully added content. firstname: " + query_string["/firstname"] + ", lastname: " + query_string.lastname);
      db.addValue(req, res, [query_string["/firstname"], query_string.lastname]);
    }
    else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Oops looks like this is not a valid url for this Node web API, try adding a name with /firstname=___&lastname+______, or seeing your current table of names in JSON format with /listtablecontent");
    }
}

http.createServer(onRequest).listen(port);
console.log("Server has started.");
