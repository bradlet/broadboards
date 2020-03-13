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

describe('database connection and tables existence', () => {
	it('connection established with database', done => {
    let callback = (err, res) => {
      try {
        expect(err).toBe(null);
        done();
      } catch(err) {
        done(err);
      }
    };
    client.connect(callback)
	});
  it('database has BroadBoards schema', done => {
    let callback = (err, res) => {
      try {
        expect(res.rows[0]['exists']).toBe(true);
        done();
      } catch(err) {
        done(err);
      }
    };
    query = "SELECT EXISTS ( " +
       "SELECT 1 "+
       "FROM   information_schema.tables " +
       "WHERE  table_schema = 'BroadBoards');"
    client.query(query, callback)
  });
  it('database has user table', done => {
    let callback = (err, res) => {
      try {
        expect(res.rows[0]['exists']).toBe(true);
        done();
      } catch(err) {
        done(err);
      }
    };
    query = "SELECT EXISTS ( " +
       "SELECT 1 "+
       "FROM   information_schema.tables " +
       "WHERE  table_schema = 'BroadBoards'"+
       "AND    table_name = 'user');"
    client.query(query, callback)
  });
  it('database has thread table', done => {
    let callback = (err, res) => {
      try {
        expect(res.rows[0]['exists']).toBe(true);
        done();
      } catch(err) {
        done(err);
      }
    };
    query = "SELECT EXISTS ( " +
       "SELECT 1 "+
       "FROM   information_schema.tables " +
       "WHERE  table_schema = 'BroadBoards'"+
       "AND    table_name = 'thread');"
    client.query(query, callback)
  });
  it('database has post table', done => {
    let callback = (err, res) => {
      try {
        expect(res.rows[0]['exists']).toBe(true);
        done();
      } catch(err) {
        done(err);
      }
    };
    query = "SELECT EXISTS ( " +
       "SELECT 1 "+
       "FROM   information_schema.tables " +
       "WHERE  table_schema = 'BroadBoards'"+
       "AND    table_name = 'post');"
    client.query(query, callback)
  });
  afterAll(() => {
    return client.end();
  })
});
