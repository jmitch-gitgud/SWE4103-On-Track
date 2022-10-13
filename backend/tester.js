const reader = require("xlsx");
const Pool = require("pg").Pool;
  

const file = reader.readFile("term.xlsx");
  
let data = [];
  
let count = 0;
  
for(let i = 0; i < 1; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]], { header: 1 });
   temp.forEach((res) => {
      data.push(res);
   })
}

data.shift();

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "postgres",
    password: "SWE4103",
    port: 5432
  });

  let teachers = [];
  let periods = [];

  data.forEach(row => {
    let temp1 = [];
    temp1.push(count);
    temp1.push(row[0]);
    teachers.push(temp1);
    let temp2 = [];
    temp2.push(count);
    temp2.push(row[1]);
    temp2.push(row[2]);
    temp2.push(row[3]);
    temp2.push(row[4]);
    periods.push(temp2);
    count++;
  }
    );

  //const query  = "INSERT INTO staff (staff_id, role_id, status_id, username, password) VALUES ($1, 1, 1, $2, 42);";
  const query1 = "INSERT INTO staff (staff_id, role_id, status_id, username, password) VALUES ($1, 1, 1, $2, 42);"
  const query2 = "INSERT INTO schedule VALUES ($1, $2, $3, $4, $5);"
  //const query = "INSERT INTO test VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)";

pool.connect((err, client, done) => {
    if (err) throw err;
        try {
          teachers.forEach(row => {
            client.query(query1, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          }),
          periods.forEach(row => {
            client.query(query2, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          });
        } finally {
          done();
        }
      });