const express = require('express');
const bp = require('body-parser');
const path = require('path')
const encryptPW = import('./account_control.js');

const app = express();
const { Pool, Client } = require('pg')
const port = process.env.PORT || 5000;

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/broadboards/build/index.html'))
})

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
  query = 'SELECT COUNT(*) FROM testThreads ';

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

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.post('/signup', (req, res) => {
    var user = req.body.username;
    var em = req.body.email;
    var pw = req.body.password;
    console.log("Recieved sign-up request: ${user}")
    pw = encryptPW(pw);
    console.log(typeof(pw));
});
