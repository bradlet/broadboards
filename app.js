//using SQlite3 in debug/verbose mode
const sqlite3 = require('sqlite3').verbose();
//using node express
const express = require('express');
const app = express();

// open connection to SQlite using temporary/memory only mode
let db = new sqlite3.Database(':memory:', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the in-memory SQlite database.');
	db.run("CREATE TABLE users (user TEXT)");
	console.log('Created users table')
});

// serve public/ content as static
app.use(express.static('public'));

// built-in middleware function to parse req/res
app.use(express.json());

// temporarily set to false until nested JSON is used
app.use(express.urlencoded({ extended: false }));

// route to homepage
app.get('/', (req, res) => {
	// serve public/index.html
	res.sendFile(path.join(__dirname + '/public/index.html'));
app.post("/submit", function(req, res){
	console.log('@ app.post')

	// get username from the HTML form via request body
	var username = req.body.username;

	// initite SQL statment to be used for insertion
	let statement = db.prepare("INSERT INTO users VALUES (?)");
	statement.run(username)
	console.log('Username: ' + username + ' was added to the database')
	res.redirect("/")
});

app.listen(5000);
