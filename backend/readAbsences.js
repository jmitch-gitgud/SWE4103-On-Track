
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

const PORT = 3001;

app.route('/getAbsences')
.get((req, res, next) => {
  let staff_id = req.query.staff_id
  const text = 'SELECT * FROM work_abscense WHERE staff_id = ' + staff_id


const client = new Client({
  host: "localhost",
  user: "postgres",
  database: "SWE4103_db",
  password: "SWE4103",
  port: 5432
});

  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      client.query(text, (err, pgres) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({status: "Invalid credentials"}));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({names : pgres.rows}));
          }
        });
          }
  })
  client.close();
})
.post((req, res, next) => {
  console.log("post")
res.send('POST request called');
})
.all((req, res, next) => {
  console.log("all")
res.send('Other requests called');
})
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

