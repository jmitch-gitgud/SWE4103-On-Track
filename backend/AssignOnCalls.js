



function assign(available, absent)
{
    //arguments are 2D arrays 

    // each row in the 2D arrays are structured: staff_id, p1, p2, p3, p4


    const text = 'INSERT INTO Placements(placement_id, absent_teacher, onCall_teacher, period_filled, course_name) VALUES (DEFAULT, $1, $2, $3, $4)';
    
    const {Client} = require("pg");
    

    const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'postgres',
    password: 'Shadow12071207*',
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
        if(available[j][0] == absent[i][0])
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

        if(absent[i][1] == 'A')
        {
            filled = false; 

            j = 0; 

            for(k = 0; k < absSched.length; k++)
            {
               if(absSched[k][0] == absent[i][0])
                 courseCode = absSched[k][1];
            }

            if(courseCode != 'free')
            {

                while(!filled && j < available.length )
                {
                    if(available[j][1] == 'free') //need to figure out what the free period is
                    {

                        placements.push([absent[i][0], available[j][0], 'p1', courseCode])
                        filled = true; 
                        available.splice(j , 1);
                    }              

                    j++; 
                }

                
                if(!filled)
                    placements.push([absent[i][0], 'Study Hall' , 'p1', courseCode])
            }
        }



        if(absent[i][2] == 'A')
        {
            filled = false; 

            j = 0; 


            for(k = 0; k < absSched.length; k++)
            {
               if(absSched[k][0] == absent[i][0])
                 courseCode = absSched[k][2];
            }


            if(courseCode != 'free')
            {

                while(!filled && j < available.length )
                {
                    if(available[j][2] == 'free') 
                    {
                        placements.push([absent[i][0], available[j][0], 'p2', courseCode])
                        filled = true;
                        available.splice(j , 1); 
                    }              

                    j++; 
                }

                
                if(!filled)
                    placements.push([absent[i][0], 'Study Hall' , 'p2', courseCode])

            }
        }



        if(absent[i][3] == 'A')
        {

            filled = false; 

            j = 0; 

            for(k = 0; k < absSched.length; k++)
            {
               if(absSched[k][0] == absent[i][0])
                 courseCode = absSched[k][3];
            }


            if(courseCode != 'free')
            {
                while(!filled && j < available.length )
                {
                    if(available[j][3] == 'free') 
                    {
                        placements.push([absent[i][0], available[j][0], 'p3', courseCode])
                        filled = true; 
                        available.splice(j , 1);
                    }              

                    j++; 
                }

                
                if(!filled)
                    placements.push([absent[i][0], 'Study Hall' , 'p3', courseCode])
            }
        }




        if(absent[i][4] == 'A')
        {

            filled = false; 

            j = 0; 


            for(k = 0; k < absSched.length; k++)
            {
               if(absSched[k][0] == absent[i][0])
                 courseCode = absSched[k][4];
            }


            if(courseCode != 'free')
            {
                while(!filled && j < available.length )
                {
                    if(available[j][4] == 'free') 
                    {
                       placements.push([absent[i][0], available[j][0], 'p4', courseCode])
                       filled = true; 
                       available.splice(j , 1);
                     }              

                    j++; 
                }

                 if(!filled)
                     placements.push([absent[i][0], 'Study Hall' , 'p4', courseCode])
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
    
    

}












