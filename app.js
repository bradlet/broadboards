//using node express
const express = require('express');
const app = express();

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
  console.log(username)
  res.redirect("/")
});

app.listen(5000);
