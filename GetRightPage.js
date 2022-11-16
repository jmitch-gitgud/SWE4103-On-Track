

function GetRightPage(role_id)
{
    //app.route('/check').post((req, res) => {


/*
    const Pool = require("pg").Pool;
       
         
    const pool = new Pool({
        host: '127.0.0.1',
        user: 'postgres',
        database: 'postgres',
        password: 'Shadow12071207*',
        port: 5432,
      });*/

      //const userRoleQuery = 'SELECT role_id FROM "public"."staff" WHERE "username" = $1 AND "password" = $2';
    
      
    //  let username = 'officeAdminUser'; 
       // let password = 'oapassword'; 
      var rightPage = "steven";

    //  let data = [username, password];
     
      /*
      pool.connect((err, client, done) => {
         if (err) throw err;
               
          try {
                 pool.query(userRoleQuery,data,(err, res) => {
                         if (err) {
                             console.log(err.stack);
                         } else {

                            console.log(res.rows[0].role_id);*/
                           
                            console.log(role_id);
     
                                if(role_id == 1)
                                 {                                   
                                    rightPage =  "/fulltime";                                  
                                 }
                                 if(role_id == 2)
                                 {
                                    rightPage =  "/supply"; 
                                 }
                                 if(role_id == 3)
                                 {
                                    rightPage = "/oa"; 
                                 }
                                 if(role_id == 4)
                                 {
                                    rightPage = "/vp"; 
                                 }
                                 if(role_id == 5)
                                 {
                                    rightPage =  "/operations";
                                 }
                                /*
                                 console.log(rightPage);


                         }
                     });
        }
                finally {
                   done();
            }}     

            );

            return rightPage;
*/    

return rightPage;
}


exports.GetRightPage = GetRightPage; 