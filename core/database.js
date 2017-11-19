var pg = require("pg");

var pool  = new pg.Pool({
  user: 'maya',
  host: 'localhost',
  port: '5432',
  database: 'names',
  password: 'guest'
});

pool.query("CREATE TABLE IF NOT EXISTS people(firstname varchar(80), lastname varchar(80))");

var insert_text = "INSERT INTO people (firstname, lastname) values($1, $2) RETURNING *";

function listTable (req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  pool.query('SELECT * FROM people')
      .then(response =>  {
        console.log(JSON.stringify(response.rows))
        res.write(JSON.stringify(response.rows))
        res.end();
      })
      .catch(e => console.error(e.stack));
}

function addValue (req, res, query_string) {
  res.writeHead(200, {"Content-Type": "application/json"});
  var name_array = [query_string.firstname, query_string.lastname];
  pool.query(insert_text, name_array)
    .then(response => {
      res.write("Success ");
      res.write(JSON.stringify(query_string));
      console.log(response.rows[0]);
      res.end();
    })
    .catch(e => console.error(e.stack));
}

function endPool() {
  pool.end();
}

module.exports = {
  listTable: listTable, 
  addValue: addValue,
  endPool: endPool
};

