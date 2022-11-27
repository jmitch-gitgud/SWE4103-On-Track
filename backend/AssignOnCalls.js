



function assign(available, absent)
{
    //arguments are 2D arrays 

    // each row in the 2D arrays are structured: staff_id, p1, p2, p3, p4


    const text = 'INSERT INTO Placements(placement_id, absent_teacher, onCall_teacher, period_filled, course_name) VALUES (DEFAULT, $1, $2, $3, $4)';
    
    const {Client} = require("pg");
    

    const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'SWE4103_db',
    password: 'SWE4103',
    port: 5432,
    });






    placements = []; //For the 2d array of placements

    let absSched = [];
    let i = 0;

    while (i < absent.length) 
    { 
    let j = 0;
        
    while (j < available.length)
    {
        if(available[j].staff_id == absent[i].staff_id)
        {
            absSched.push(available[j]);
            available.splice(j, 1);
        }

        j++;
    }
    
    i++;
    }
    
    

    for(i = 0 ; i < absent.length; i++)
    {

        if(absent[i].period1 == 'A')
        {
            filled = false; 

            j = 0; 

            for(k = 0; k < absSched.length; k++)
            {
               if(absSched[k].staff_id == absent[i].staff_id)
                 courseCode = absSched[k].period1;
            }

            if(courseCode != 'free')
            {

                while(!filled && j < available.length )
                {
                    if(available[j].period1 == 'free') //need to figure out what the free period is
                    {

                        placements.push([absent[i].staff_id, available[j].staff_id, 'p1', courseCode])
                        filled = true; 
                        available.splice(j , 1);
                    }              

                    j++; 
                }

                
                if(!filled)
                    placements.push([absent[i].staff_id, 'Study Hall' , 'p1', courseCode])
            }
        }



        if(absent[i].period2 == 'A')
        {
            filled = false; 

            j = 0; 


            for(k = 0; k < absSched.length; k++)
            {
               if(absSched[k].staff_id == absent[i].staff_id)
                 courseCode = absSched[k].period2;
            }


            if(courseCode != 'free')
            {

                while(!filled && j < available.length )
                {
                    if(available[j].period2 == 'free') 
                    {
                        placements.push([absent[i].staff_id, available[j].staff_id, 'p2', courseCode])
                        filled = true;
                        available.splice(j , 1); 
                    }              

                    j++; 
                }

                
                if(!filled)
                    placements.push([absent[i].staff_id, 'Study Hall' , 'p2', courseCode])

            }
        }



        if(absent[i].period3 == 'A')
        {

            filled = false; 

            j = 0; 

            for(k = 0; k < absSched.length; k++)
            {
               if(absSched[k].staff_id == absent[i].staff_id)
                 courseCode = absSched[k].period3;
            }


            if(courseCode != 'free')
            {
                while(!filled && j < available.length )
                {
                    if(available[j].period3 == 'free') 
                    {
                        placements.push([absent[i].staff_id, available[j].staff_id, 'p3', courseCode])
                        filled = true; 
                        available.splice(j , 1);
                    }              

                    j++; 
                }

                
                if(!filled)
                    placements.push([absent[i].staff_id, 'Study Hall' , 'p3', courseCode])
            }
        }




        if(absent[i].period4 == 'A')
        {

            filled = false; 

            j = 0; 


            for(k = 0; k < absSched.length; k++)
            {
               if(absSched[k].staff_id == absent[i].staff_id)
                 courseCode = absSched[k].period4;
            }


            if(courseCode != 'free')
            {
                while(!filled && j < available.length )
                {
                    if(available[j].period4 == 'free') 
                    {
                       placements.push([absent[i].staff_id, available[j].staff_id, 'p4', courseCode])
                       filled = true; 
                       available.splice(j , 1);
                     }              

                    j++; 
                }

                 if(!filled)
                     placements.push([absent[i].staff_id, 'Study Hall' , 'p4', courseCode])
            }
        }


    }

   
    
        client.connect(err => {
          if (err) {
            console.error('connection error', err.stack)
          } else {
          
            placements.forEach(row => {
              client.query(text, row, (err, pgres) => {
                if (err) {
                  console.log(err.stack)
            }});
            })
          };
        })
    
    return placements;

}


exports.assign = assign;




