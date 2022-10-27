let getDate = require("./NameToDate.js");


function ReportWorkAbsences(filename, sheetIndex)
{
    console.log(filename);
    console.log(sheetIndex);

    //Data Declaration
    let result = null;
    const data = [];
    const Pool = require("pg").Pool;
    var XLSX = require("xlsx");

    const pool = new Pool({
        host: '127.0.0.1',
        user: "postgres",
        database: "postgres",
        password: "",
        port: 5432
      });

    if (filename !== undefined)
    {
        if (filename.slice(-4) === "xlsx")
        {
            var workbook = XLSX.readFile(filename);

            var ws = workbook.Sheets[workbook.SheetNames[sheetIndex]];

            //Get the array of dates from the name of the sheet
            let dateList = getDate.NameToDate(workbook.SheetNames[sheetIndex]);

            //Split the excel sheet into a 2d array
            var csv = XLSX.utils.sheet_to_csv(ws);

            csv = csv.split("\n");

            for(let j = 0; j < csv.length; j++)
            {
                data.push(csv[j].split(","));
            }

            //Remove all of the empty rows at the end of the sheet
            let j = data.length - 1;

            while(data[j][0] ==  '')
            {
                data.pop();

                j--;
            }

            //Remove the two headers of the worksheet
            for(let j = 0; j < 2; j++)
            {
                data.shift();
            }

            //Stored Procedure would go here
            const query = "INSERT INTO work_abscense(Absence_ID, Staff_ID, Period1, " +
                        "Period2, Period3, Period4, date) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)"

            const query2 = "SELECT Staff_ID FROM staff WHERE username = $1"

            pool.connect((err, client, done) => {
                if (err) throw err;
                  
                try {
                        data.forEach(row => {
                            const user = [];
                            var id;

                            user.push(row[0]);
                        
                            pool.query(query2, user, (err, res) => {
                                if (err) {
                                    console.log(err.stack);
                                } else {
                                    id = res.rows[0];

                                    if(id != undefined)
                                    {
                                        for(let j = 0; j < 5; j++)
                                        {
                                            let x = 4 * j;
                                            let absenceList = [];

                                            absenceList.push(id.staff_id);
                                            absenceList.push(row[x + 1]);
                                            absenceList.push(row[x + 2]);
                                            absenceList.push(row[x + 3]);
                                            absenceList.push(row[x + 4]);
                                            absenceList.push(dateList[j]);

                                            pool.query(query, absenceList, (err, res) => {
                                                if (err) {
                                                    console.log(err.stack);
                                                } else {
                                                    console.log("inserted for user: " + user[0] + "\n" +
                                                            " row:", absenceList + "\n");
                                                }
                                            });
                                        }
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

            result = "File Successfully Inserted";
        }
        else
        {
            result = "Invalid File Type Given";
        }
    }
    else
    {
        result = "No File Given";
    }

    return result;
}

exports.ReportWorkAbsences = ReportWorkAbsences;
