var express = require("express");
var bodyParser = require('body-parser')
const app = express();
var http = require("http");
const {Client} = require("pg");
var server = http.createServer(app);

const listenPort = 3001;

app.use(bodyParser.json({limit: '1mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}))

// Allow CORS support and remote requests to the service
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  next();
});

server.listen(listenPort, "127.0.0.1");

app.route('/check').post((req, res) => {
  username = req.body.Username;
  password = req.body.Password;

  const text = 'SELECT * FROM "SWE4103_Schema"."User" WHERE "Username" = $1 AND "Password" = $2'
  const values = [username, password]

  const client = new Client({
  host: '127.0.0.1',
  user: 'postgres',
  database: 'SWE4103_db',
  password: 'jordan_rocks',
  port: 5432,
});

  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      //console.log('connected')
      client.query(text, values, (err, pgres) => {
        if (err) {
          console.log(err.stack)
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "ERROR"}));
        } else {
          if (pgres.rowCount === 0) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "Invalid credentials"}));
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({status: "Logged in"}));
            }
          }
        });
          }
  })
}); 