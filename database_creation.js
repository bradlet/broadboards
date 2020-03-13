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

// create broadboards schema
const schema = 'CREATE SCHEMA "broadboards"';
client
	.query(schema)
	.then(res => console.log(res))
	.catch(err => console.log(err))

// create user table
const createUserTable = 'CREATE TABLE "broadboards".user (' +
		'username VARCHAR(20) PRIMARY KEY, joined timestamp, ' +
		'email VARCHAR(64), password VARCHAR(100));'
client
	.query(createUserTable)
	.then(res => console.log(res))
	.catch(err => console.log(err))

// create thread table
const createThreadTable = 'CREATE TABLE "broadboards".thread (' +
		'id SERIAL PRIMARY KEY, title VARCHAR(250), ' +
		'content VARCHAR, created timestamp, ' +
		'username VARCHAR(20));'
client
	.query(createThreadTable)
	.then(res => console.log(res))
	.catch(err => console.log(err))

// create post table
const createPostTable = 'CREATE TABLE "broadboards".post (' +
		'id SERIAL PRIMARY KEY, response VARCHAR, ' +
		'created timestamp, thread_id int, ' +
		'username VARCHAR(20));'
client
	.query(createPostTable)
	.then(res => console.log(res))
	.catch(err => console.log(err))

