var pg = require("pg");

var conString = "pg://admin:guest@localhost:5432/maya_table";

var pool  = new pg.Pool({
  user: 'maya',
  host: 'localhost',
  database: 'names',
  password: 'guest'
});

pool.query("CREATE TABLE IF NOT EXISTS people(firstname varchar(80), lastname varchar(80))");

var insert_text = "INSERT INTO people (firstname, lastname) values($1, $2) RETURNING *";

function listTable (req, res) {
  pool.query('SELECT * FROM people')
      .then(response =>  {
        res.write(JSON.stringify(response.rows))
        res.end();
      })
      .catch(e => console.error(e.stack));
}

function addValue (req, res, name_array) {
  pool.query(insert_text, name_array)
    .then(res => {
      console.log(res.rows[0]);
    })
    .catch(e => console.error(e.stack));
}

module.exports = {
  listTable: listTable, 
  addValue: addValue
};

//add a listener to end the pool
