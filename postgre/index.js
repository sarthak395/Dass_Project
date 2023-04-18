const { Client } = require('pg')

const client = new Client({
  user: 'aayush',
  host: '10.1.134.133',
  database: 'pcpricetracker',
  password: 'dassteam50',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});