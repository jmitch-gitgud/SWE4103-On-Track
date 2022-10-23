const { Pool, Client } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "postgres",
    password: "postgres",
    port: 5432
  });


 function readAbsences(){
  const query1 = 'SELECT * FROM "SWE4103_Schema"."Work_Abscense" ORDER BY "Absence_ID" ASC';

  pool.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      pool.query(query1, (err, res) => {
        if(err){
            return err;
        }
        else{
            return res;
        }
      });
    }
});
}

const val = readAbsences();
console.log(val);


module.exports = readAbsences;