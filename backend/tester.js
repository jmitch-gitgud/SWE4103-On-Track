const reader = require("xlsx");
const Pool = require("pg").Pool;


function SendTermSchedule(filename)
{
    if (filename !== undefined)
    {
      if (filename.slice(-4) === "xlsx")
      {
        const file = reader.readFile(filename);

        let data = [];
  
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
          host: '127.0.0.1',
          user: "postgres",
          database: "SWE4103_db",
          password: "SWE4103",
          port: 5432
        });

        let teachers = [];
        let periods = [];

        data.forEach(row => {
          teachers.push(row[0]);
          let temp2 = [];
          temp2.push(row[1]);
          temp2.push(row[2]);
          temp2.push(row[3]);
          temp2.push(row[4]);
          periods.push(temp2);
        });

        const query2 = "SELECT Staff_ID FROM staff WHERE username = $1;"
        const query1 = "INSERT INTO schedule VALUES ($1, $2, $3, $4, $5);"

        pool.connect((err, client, done) => {
            if (err) throw err;
              try {
                teachers.forEach(row => {
                  const user = [];
                  var id;

                  user.push(row);
                
                  pool.query(query2, user, (err, res) => {
                      if (err) {
                          console.log(err.stack);
                      } else {
                          id = res.rows[0];

                          if(id != undefined)
                          { 
                            
                              const schedule = [];
                              schedule.push(id.staff_id);
                              schedule.push(...periods[teachers.indexOf(row)]);

                              pool.query(query1, schedule, (err, res) => {
                                if (err) {
                                    console.log(err.stack);
                                } else {
                                    console.log("inserted for user: " + user[0] + "\n" +
                                              " row:", schedule + "\n");
                                }
                              
                              });
                          }
                          else
                          {
                              console.log("Error on user row: " + user[0] + "\n Failed insert: " +
                                        "The given user does not exist.\n");
                          }
                      }
                  });
              });
              } finally {
                done();
              }
        });

        return "File Successfully Inserted";

      }
      else
      {
        return "Invalid File Type Given";
      }
    }
    else
    {
      return "No File Recieved";
    }

}


exports.SendTermSchedule = SendTermSchedule;

