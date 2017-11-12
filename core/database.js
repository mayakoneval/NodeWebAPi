var pg = require("pg");

var conString = "pg://admin:guest@localhost:5432/maya_table";

var pool  = new pg.Pool({
  user: 'maya',
  host: 'localhost',
  database: 'names',
  password: 'guest'
});

function listTable (req, res) {
  pool.query('SELECT * FROM people')
      .then(response =>  {res.write(JSON.stringify(response.rows))})
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

pool.query("CREATE TABLE IF NOT EXISTS people(firstname varchar(80), lastname varchar(80))");

var insert_text = "INSERT INTO people (firstname, lastname) values($1, $2) RETURNING *";
/*var famous_names = [['Maya', 'Koneval'], ['Barack', 'Obama'], ['Justin', 'Trudeau']];

for(var i = 0; i<famous_names.length; i++) {
  addValue(famous_names[i]);
}*/

//add a listener to figure out when to end pool
