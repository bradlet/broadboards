/*
  FILENAME: database_creation.js
  PURPOSE:
    Automate the process of creating database tables for broadboards
*/

// required dependencies
const { Pool, Client } = require('pg')
// insert database information here
const client = new Client({
  user: CHANGE,
  host: CHANGE,
  database: CHANGE,
  password: CHANGE,
  port: CHANGE,
})
client.connect()

