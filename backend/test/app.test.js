const axios = require('axios');

 test('Testing Role Assignment - OA', async () => { 
    await expect(doPostRequest()).resolves.toStrictEqual({"page": "/oa", "status": "Logged in"});
 });

async function doPostRequest() {

    let payload = {
        Username: 'jmitch', 
        Password: 'jordan_rocks'
    };

    let res = await axios.post('http://localhost:3001/check', payload);

    let data = res.data;
    return data;
}