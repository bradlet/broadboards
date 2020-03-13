/*
  FILENAME: database.test.js
  PURPOSE:
    Test database functionality
*/

// required dependencies
const { Pool, Client } = require('pg')

// TODO this will get replaced when we replace the db
// sensitive info should not be on code files
const client = new Client({
  user: 'test',
  host: 'test-1.cy3saq57ddpe.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: '12345678',
  port: 5432,
})
