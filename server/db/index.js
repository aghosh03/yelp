const {Pool, Client} = require("pg");

const pool = new Pool();
const client = new Client();

pool.connect((err, client, release) => {
    if (err) {
      return console.error(`connection error to database with host: '${client.host}', database: '${client.database}'`, err.stack)
    } else {
      return console.log(`connected successfuly to database with host: '${client.host}', database: ${client.database}'`)
    }
  })


module.exports = {
    query: (text, params) =>pool.query(text, params),
}
