const axios = require('axios');

test('Testing Role Assignment - OA', () => {
    
    axios.post('http://localhost:3001/check', {
        Username: 'jmitch', 
        Password: 'jordan_rocks'
    })
      .then(function (response) {
        if(response) {
            JSON.stringify(response);
        }  
        expect(response).toBe('{status: "Logged in", page: oa}');
      })
      .catch(function (error) {
        console.log(error);
      });
});