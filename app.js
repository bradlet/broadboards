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
});

app.listen(5000);
