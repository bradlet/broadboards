const express = require('express');
const session = require('express-session');
const encryptPW = require('./account_control.js');

const app = express();
const port = process.env.PORT || 5000;
const { Pool, Client } = require('pg')
const path = require('path')

const client = new Client({
  user: 'test',
  host: 'test-1.cy3saq57ddpe.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: '12345678',
  port: 5432,
})
client.connect()

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static(path.join(__dirname, 'broadboards/build')))
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(session({
    secret: process.env.SECRET || "DEFAULTSECRETYOUSHOULDSETASECRET",
    resave: false,
    saveUninitialized: true,
}));

// Root == Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/broadboards/build/index.html'))
})

// GET route to fetch initial threads to broadboards
app.get('/getThreads/:numOfThreads', (req, res) => {
  console.log('@ getThreads')

  startingNumOfThreads = req.params['numOfThreads']
  // query = 'SELECT t2.id, t2.title, t2.content, t2.created, t1.username '+
  // 'FROM "BroadBoards".user t1,  "BroadBoards".thread t2 '
  // + 'WHERE t1.id = t2.user_id ORDER BY t2.ID desc ' +
  // 'LIMIT ' + startingNumOfThreads;

  query = 'SELECT * FROM "BroadBoards".thread ORDER BY ID desc ' +
  'LIMIT $1';
  values = [startingNumOfThreads]

  client
    .query(query, values)
    .then(results => {
      results = results.rows
      res.send(results)
    })
    .catch(err => console.log(err))
});

// GET route to fetch number of threds stored in the database
app.get('/getThreadCount', (req, res) => {
  console.log('@ getThreadCount')

  query = 'SELECT COUNT(*) FROM "BroadBoards".thread ';

  client
    .query(query)
    .then(results => {
      results = results.rows[0]['count']
      res.send(results)
      return results
    })
    .catch(err => console.log(err))
});

// GET route to fetch threads after client scrolls to bottom of the page
app.get('/getRollingThreads/:numOfThreads/:totalThreads/:skipThreads', (req, res) => {
  console.log('@ getRollingThreads')

  startingNumOfThreads = req.params['numOfThreads']
  skipThreads = req.params['skipThreads']
  total = req.params['totalThreads']
  skipBy = total - skipThreads
  // console.log('skipThreads: ' + skipThreads)
  // console.log('total: ' + total)

  query = 'SELECT * FROM "BroadBoards".thread WHERE ID <= $1'
  + ' ORDER BY ID desc ' + 'LIMIT $2';
  values = [skipBy, startingNumOfThreads]

  client
    .query(query, values)
    .then(results => {
      results = results.rows
      // console.log(results)
      res.send(results)
      return results
    })
    .catch(err => console.log(err))
});

app.post('/postThread', (req, res) => {
  console.log('@ postThread')
  // console.log(req.body)
  if (!req.session.user) {
    res.redirect(401, '/'); //401 == unauthorized access
    return;
  }
  title = req.body.title
  content = req.body.thread
  created = new Date().toISOString()
  username = req.session.user

  query = 'INSERT INTO "BroadBoards".thread (title, content, created, username) ' +
  'VALUES ($1, $2, $3, $4)';
  values = [title, content, created, username]
  console.log(values);

  client
    .query(query, values)
    // .then(results => console.log(results))
    .catch(err => console.log(err))
  res.redirect('/')
});

// login - create an account API endpoints

// GET route to check if username exists in the database
// Sends true if there was another user with the same username
app.get('/checkUsernameExists/:username',(req, res) => {
  console.log('@ checkUsernameExists')

  query = 'SELECT count(*) FROM "BroadBoards".user ' +
  'WHERE LOWER(username) = LOWER($1)';
  suppliedUsername = req.params['username']
  // console.log(req.params['username'])
  values = [suppliedUsername]

  client
    .query(query, values)
    .then(results => {
      results = results.rows[0]['count']
      if (results == 0) res.send(false);
      else res.send(true)
    })
    .catch(err => console.log(err))
});

// GET route to check if username exists in the database
// Sends true if there was user with the same supplied email
app.get('/checkEmailExists/:email',(req, res) => {
  console.log('@ checkEmailExists')

  query = 'SELECT count(*) FROM "BroadBoards".user ' +
  'WHERE LOWER(email) = LOWER($1)';
  suppliedEmail = req.params['email']
  values = [suppliedEmail]

  client
    .query(query, values)
    .then(results => {
      console.log(results)
      results = results.rows[0]['count']
      if (results == 0) res.send(false);
      else res.send(true)
    })
    .catch(err => console.log(err))
});

// Grab active session's username
app.get('/checkSession',(req, res) => {
  if (req.session.user) {
    console.log(req.session.user)
    res.send(req.session.user);
  }
  else
    res.send([]);
});

// POST route to check if the supplied password match actual password
app.post('/checkPassword',(req, res) => {
  console.log('@ checkPassword')
  var passwordMatch = false;

  query = 'SELECT * FROM "BroadBoards".user ' +
  'WHERE LOWER(username) = LOWER($1)';
  suppliedUsername = req.body.username
  suppliedPassword = req.body.password
  values = [suppliedUsername]

  client
    .query(query, values)
    .then(results => {
      results = results.rows
      console.log(results.length);
      if (results.length != 0 && encryptPW.checkPW(suppliedPassword, results[0]['password'])) {
        req.session.user = suppliedUsername;
        res.redirect('/');
      }
      else {
        console.log("Failed login attempt by " + suppliedUsername + "; Incorrect Pass.");
        res.redirect('/login.html');
      }
    })
    .catch(err => console.log(err))
});

// POST route to create a user
// expects: username, first, last, email and password
app.post('/createUser',(req, res) => {
  console.log('@ createUser')

  username = req.body.username
  email = req.body.email
  password = req.body.password
  joined = new Date().toISOString()
  password = encryptPW.encryptPW(password);
  console.log("Recieved sign-up request: " + username)

  query = 'INSERT INTO "BroadBoards".user (username, first, last, email, password, joined) ' +
  'VALUES ($1, $2, $3, $4, $5, $6)';
  values = [username, " ", " ", email, password, joined]
  console.log(values);
  client
    .query(query, values)
    // .then(results => console.log(results))
    .catch(err => console.log(err))
  res.redirect('/')
});

// ===================================================
/* This section represents the same API endpoints
   but using the testing tables instead of
   the production ones */
/*
// create a GET route
app.get('/getThreads/:numOfThreads', (req, res) => {
  console.log('@ getThreads')
  startingNumOfThreads = req.params['numOfThreads']
  //console.log(startingNumOfThreads)
  query = 'SELECT * FROM testThreads ORDER BY ID desc ' +
  'LIMIT ' + startingNumOfThreads;

  // client.query(query, (err, res) => {
  //   // console.log(res.rows)
  //   results = res.rows
  //   // console.log(results)
  //   test = results.map(entry => entry['thread'].replace(/\s+$/, ''))
  //   console.log(test[0].replace(/\s+$/, ''))
  //   console.log(test)
  //   client.end()
  //   return test
  // })

  client
    .query(query)
    .then(results => {
      results = results.rows
      results = results.map(entry => entry['thread'].replace(/\s+$/, ''))
      res.send(results)
      return results
    })
    // .then(data => console.log(data))
    .catch(err => console.log(err))
});

app.get('/getThreadCount', (req, res) => {
  console.log('@ getThreadCount')
  query = 'SELECT COUNT(*) FROM "BroadBoards".thread ';

  client
    .query(query)
    .then(results => {
      results = results.rows[0]['count']
      res.send(results)
      return results
    })
    .catch(err => console.log(err))
});

app.get('/getRollingThreads/:numOfThreads/:totalThreads/:skipThreads', (req, res) => {
  console.log('@ getRollingThreads')
  startingNumOfThreads = req.params['numOfThreads']
  skipThreads = req.params['skipThreads']
  total = req.params['totalThreads']
  skipBy = total - skipThreads
  // console.log('skipThreads: ' + skipThreads)
  // console.log('total: ' + total)

  query = 'SELECT * FROM testThreads WHERE ID <= ' + skipBy + ' ORDER BY ID desc ' + 'LIMIT ' + startingNumOfThreads;
  client
    .query(query)
    .then(results => {
      // console.log(results.rows)
      results = results.rows
      results = results.map(entry => entry['thread'].replace(/\s+$/, ''))
      res.send(results)
      return results
    })
    .catch(err => console.log(err))
});

app.post('/postThread', (req, res) => {
  console.log('@ postThread')
  // console.log(req.body)

  user = req.body.user
  title = req.body.title
  thread = req.body.thread

  // TODO change to include all data
  query = 'INSERT INTO testThreads (thread) VALUES ($1)';
  values = [thread]

  client
    .query(query, values)
    // .then(results => console.log(results))
    .catch(err => console.log(err))
  res.redirect('/')
});
*/
