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

app.engine('html', require('ejs').renderFile);

// serve public/ content as static
// app.use(express.static('public'));

// built-in middleware function to parse req/res
app.use(express.json());

// temporarily set to false until nested JSON is used
app.use(express.urlencoded({ extended: false }));

// route to homepage
app.get('/', (req, res) => {
	// serve public/index.html
	//res.sendFile(path.join(__dirname + '/public/index.html'));
	users = getUsers(createDict)
	//createDict(users)
	res.render(__dirname + "/public/index.html",
		{user1:null, user2:null, user3:null, user4:null});
});

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

// stores usernames retrieved from
// the database into a list and returns it
// to a callback function
getUsers = (callback) => {
	console.log('@ getUsers')
	let users=[];

	let getUsersStatement =  `SELECT user FROM users`;
	db.all(getUsersStatement, [], (err, rows) => {
		if (err) {
			return console.error(err.message);
		}
		// for every row in the database, store it in the users list
		rows.forEach((row) => {users.push(row.user)});

		// once the database retrieves all users asynchronously
		// it passes the users list into a callback function
		callback(users)
	});
};

app.listen(5000);
