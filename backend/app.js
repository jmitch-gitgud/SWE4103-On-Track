var express = require("express");
var bodyParser = require('body-parser')
const app = express();
var http = require("http");
const {Client} = require("pg");
var server = http.createServer(app);
let ReportWorkAbsences = require("./ReportWorkAbsences.js");
let GetSheetNames = require("./GetSheetNames.js");
let tester = require("./tester.js");
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

  const text = 'SELECT role_id FROM "public"."staff" WHERE "username" = $1 AND "password" = $2'
  const values = [username, password]
  let rightPage;

  
    
  const client = new Client({
    host: '127.0.0.1', 
    user: 'postgres',
    database: 'postgres',
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
            if(pgres.rows[0].role_id == 1)
            {                                  
               rightPage =  "/fulltime";                                  
            }

            if(pgres.rows[0].role_id == 2)
            {
               rightPage =  "/supply";
            }

            if(pgres.rows[0].role_id == 3)
            {
               rightPage = "/oa";
            }

            if(pgres.rows[0].role_id == 4)
            {
               rightPage = "/vp";
            }

            if(pgres.rows[0].role_id == 5)
            {
               rightPage =  "/operations";
            }


              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({status: "Logged in", page: rightPage}));
            }
          }
        });
      }
  })
}); 


app.route('/user')
.get((req, res, next) => {
  const text = 'SELECT * FROM fulltime_teacher NATURAL JOIN staff'

      
  const client = new Client({
    host: '127.0.0.1', 
    user: 'postgres',
    database: 'SWE4103_db',
    password: 'SWE4103',
    port: 5432,
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
  //client.close();
})
.post((req, res, next) => {
  
  let staff_id = req.query.staff_id
  const text = 'SELECT * FROM work_abscense WHERE staff_id = ' + staff_id

    
  const client = new Client({
    host: '127.0.0.1', 
    user: 'postgres',
    database: 'SWE4103_db',
    password: 'SWE4103',
    port: 5432,
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
})
.all((req, res, next) => {
  console.log("all")
res.send('Other requests called');
}); 

app.route('/SheetNames').post((req, res) => {
  console.log(req.body.filename);
  let filename = req.body.filename;

  let name = GetSheetNames.GetSheetNames(filename);

  if(name === [])
  {
    res.writeHead(395, { "Content-Type": "application/json" });
    res.end(JSON.stringify({status: "Invalid or Empty File"}));
  }
  else
  {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({status: "Success", sheets: name}));
  }
});


app.route('/WorkAbs').post((req, res) => {
  let filename = req.body.filename;
  let index = req.body.sheetIndex;

  let result = ReportWorkAbsences.ReportWorkAbsences(filename, index);

  if(result === "Invalid File Type Given")
  {
    res.writeHead(395, { "Content-Type": "application/json" });
    res.end(JSON.stringify({status: "Invalid File Type Given"}));
  }
  else
  {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({status: "File Successfully Inserted"}));
  }
});




app.route('/SendTerm').post((req, res) => {
  let filename = req.body.filename;

  let result = tester.SendTermSchedule(filename);

  if(result === "Invalid File Type Given")
  {
    res.writeHead(395, { "Content-Type": "application/json" });
    res.end(JSON.stringify({status: "Invalid File Type Given"}));
  }
  else
  {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({status: "File Successfully Inserted"}));
  }
}) ;

app.route('/short').post((req, res) => {
  absdate = req.body.AbsDate;
  staff = req.body.Staff;
  if (req.body.P1 == true)
  {
    p1 = "A";
  }
  else
  {
    p1 = null;
  }
  if (req.body.P2 == true)
  {
    p2 = "A";
  }
  else
  {
    p2 = null;
  }
  if (req.body.P3 == true)
  {
    p3 = "A";
  }
  else
  {
    p3 = null;
  }
  if (req.body.P4 == true)
  {
    p4 = "A";
  }
  else
  {
    p4 = null;
  }


  const text = 'INSERT INTO work_abscense(absence_id, staff_id, absence_date, period1, period2, period3, period4) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)';
  const values = [staff,absdate, p1, p2, p3, p4]
  
  const client = new Client({
  host: '127.0.0.1',
  user: 'postgres',
  database: 'SWE4103_db',
  password: 'SWE4103',
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
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({status: "inserted"}));
        }});
      }
  })
}); 

app.route('/long').post((req, res) => {
  staff = req.body.Staff;
  startDate = new Date(req.body.StartDate);
  endDate = new Date(req.body.EndDate);
  count = 0;
  end = 0;
  values = [];
  while (startDate < endDate)
  {
    value = [staff, startDate, "A", "A", "A", "A"];  
    values.push(value);
    count++;
    startDate = getDay(startDate);
  }

  //console.log(values);
  
  const text = 'INSERT INTO work_abscense(absence_id, staff_id, absence_date, period1, period2, period3, period4) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)';
    
  const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'SWE4103_db',
    password: 'SWE4103',
    port: 5432,
    });
    client.connect(err => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
      //console.log('connected')
        values.forEach(row => {
          client.query(text, row, (err, pgres) => {
            if (err) {
              console.log(err.stack)
              if (end == 0)
              {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({status: "ERROR"}));
                end = 1;
                console.log(row);
              }
            } else {
              if (end == 0)
              {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({status: "inserted"}));
                console.log(row);
                end = -1;
              }
          }});
        })
      };
    })
  
  
}); 

function getDay(d)
{
  d = new Date(d);
  var date = new Date();
  date.setDate(d.getDate() + 1);
  return date;
}
