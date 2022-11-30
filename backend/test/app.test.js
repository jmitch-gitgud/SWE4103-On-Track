// =============== TESTING TEMPLATE ================

/*

test( <'INSERT TEST NAME HERE'>, async() => {
    await expect(<CALL TO FUNCTION>).resolves.toStrictEqual( <EXPECTED RESULTS HERE> );
});

*/


/* ========= CHOICES FOR MATHCERS =========

    ******** basic mathcers ********
    -> check that the value you get returned is the same as what you expect

    .toBe(): exact equality. Single value. 
    .toEqual(): recursively checks all fields of an object. 
    .toStrictEqual(): like "toEqual()" but accounts for undefined values. 

    ******** negation ********
    -> check that the value you get returned is NOT the same as the value you define

    .not(): place before the matcher to test for the opposite. 


    ******** truthiness *********
    -> distinguishing between, or grouping together, 'undeifned', 'null', 'false'

    .toBeNull(): only matches 'null'
    .toBeUndefined(): only matches 'undefined'
    .toBeDefined(): opposite of 'toBeUndefined()'
    .toBeFalsy(): matches anything 'if' considers 'false'
    .toBeTruthy(): matches anything 'if' considers 'true'

*/

const axios = require('axios');
const app = require('../app');



// ========= VERY BASIC EXAMPLE (no external function call) =============
test('Hopefully, a helpful test', () => {
    expect(6 + 6).toBe(12);
});


// ========== '/short' endpoint ===========
test('Adding a Single-Day Absence', async () => {
    await expect(addSingleDayAbs()).resolves.toStrictEqual({"status" : "inserted"});
});

async function addSingleDayAbs(){

    let payload = {
        AbsDate: '2023-01-01',
        Staff: 69,
        P1: true,
        P2: false,
        P3: false,
        P4: false,
    }

    let res = await axios.post('http://localhost:3001/short', payload);
    let data = res.data
    return data
}



// === TEST for Role Assignment, '/check' endpoint ===




test('Testing Role Assignment - OA', async () => {
    await expect(doPostRequest()).resolves.toStrictEqual({ "page": "/oa", "status": "Logged in" });
});

async function doPostRequest() {

    let payload = {

        Username: 'oa1',
        Password: 'password'
    };

    let res = await axios.post('http://localhost:3001/check', payload);
    
    let data = res.data;
    return data;
}

test('Testing Role Assignment FAILURE - OA', async () => {
    await expect(doPostRequestFAIL()).resolves.toStrictEqual({"status" : "Invalid credentials"});
});

async function doPostRequestFAIL() {

    let payload = {

        Username: 'fakeusername',
        Password: 'fakepassword'
    };

    let res = await axios.post('http://localhost:3001/check', payload);
    
    let data = res.data;
    
    return data;
}


test('Testing user staff_id', async () => {
    await expect(doPostRequest2()).resolves.toStrictEqual({"status" : "Invalid credentials"});
});

async function doPostRequest2() {

    let payload = {

        staff_id: 1000
    };

    let res = await axios.post('http://localhost:3001/user', payload);
    
    let data = res.data;
    return data;
}

/*

test('Testing Absent teachers',  async () => {
    await expect(checkAbsFTs()).resolves.toStrictEqual({"Absences":[{"staff_id":78,"absence_id":30,"absence_date":"2022-11-29T04:00:00.000Z","period1":"A","period2":"A","period3":"","period4":"","role_id":1,"status_id":1,"username":"FT2","password":"password","first_name":"Nathan","last_name":"Awkward","email":"nawkward@unb.ca"},{"staff_id":79,"absence_id":31,"absence_date":"2022-11-29T04:00:00.000Z","period1":"","period2":"A","period3":"","period4":"","role_id":1,"status_id":1,"username":"FT3","password":"password","first_name":"Steven","last_name":"Tyler","email":"test3@unb.ca"},{"staff_id":80,"absence_id":32,"absence_date":"2022-11-29T04:00:00.000Z","period1":"","period2":"","period3":"A","period4":"","role_id":1,"status_id":1,"username":"FT4","password":"password","first_name":"Alicia","last_name":"CarKeys","email":"test4@unb.ca"},{"staff_id":81,"absence_id":33,"absence_date":"2022-11-29T04:00:00.000Z","period1":"","period2":"","period3":"A","period4":"A","role_id":1,"status_id":1,"username":"FT5","password":"password","first_name":"Dwayne","last_name":"Johnson","email":"test5@unb.ca"}]}
        
  )  });

async function checkAbsFTs() {

  
    let res = await axios.get('http://localhost:3001/absences');
    
    let data = res.data;
    return data;
}



*/




test('Testing Available teachers',  async () => {
    await expect(checkAvailFTs()).resolves.toStrictEqual({"Avail":[{"staff_id":77,"period1":"free","period2":"math","period3":"gym","period4":"art","role_id":1,"status_id":1,"username":"FT1","password":"password","first_name":"Ethan","last_name":"Alward","email":"ealward@unb.ca"},{"staff_id":78,"period1":"math","period2":"free","period3":"gym","period4":"art","role_id":1,"status_id":1,"username":"FT2","password":"password","first_name":"Nathan","last_name":"Awkward","email":"nawkward@unb.ca"},{"staff_id":79,"period1":"math","period2":"gym","period3":"free","period4":"art","role_id":1,"status_id":1,"username":"FT3","password":"password","first_name":"Steven","last_name":"Tyler","email":"test3@unb.ca"},{"staff_id":80,"period1":"math","period2":"gym","period3":"art","period4":"free","role_id":1,"status_id":1,"username":"FT4","password":"password","first_name":"Alicia","last_name":"CarKeys","email":"test4@unb.ca"},{"staff_id":81,"period1":"free","period2":"math","period3":"gym","period4":"art","role_id":1,"status_id":1,"username":"FT5","password":"password","first_name":"Dwayne","last_name":"Johnson","email":"test5@unb.ca"},{"staff_id":82,"period1":"math","period2":"free","period3":"art","period4":"gym","role_id":1,"status_id":1,"username":"FT6","password":"password","first_name":"Halle","last_name":"BlueBerry","email":"test7@unb.ca"},{"staff_id":83,"period1":"math","period2":"gym","period3":"free","period4":"art","role_id":1,"status_id":1,"username":"FT7","password":"password","first_name":"Oprah","last_name":"Losefree","email":"test8@unb.ca"},{"staff_id":84,"period1":"math","period2":"gym","period3":"art","period4":"free","role_id":1,"status_id":1,"username":"FT8","password":"password","first_name":"Robert","last_name":"Down","email":"test9@unb.ca"},{"staff_id":85,"period1":"free","period2":"math","period3":"gym","period4":"art","role_id":1,"status_id":1,"username":"FT9","password":"password","first_name":"Steve","last_name":"Occupation","email":"test10@unb.ca"},{"staff_id":86,"period1":"math","period2":"free","period3":"art","period4":"gym","role_id":1,"status_id":1,"username":"FT10","password":"password","first_name":"Aubrey","last_name":"Graham","email":"test11@unb.ca"},{"staff_id":87,"period1":"math","period2":"gym","period3":"free","period4":"art","role_id":1,"status_id":1,"username":"FT11","password":"password","first_name":"Travis","last_name":"Scott","email":"test12@unb.ca"},{"staff_id":88,"period1":"math","period2":"gym","period3":"art","period4":"free","role_id":1,"status_id":1,"username":"FT12","password":"password","first_name":"Michael","last_name":"Scott","email":"test13@unb.ca"},{"staff_id":89,"period1":"free","period2":"gym","period3":"art","period4":"math","role_id":1,"status_id":1,"username":"FT13","password":"password","first_name":"Steve","last_name":"Carell","email":"test14@unb.ca"}]} )


});

async function checkAvailFTs() {

  
    let res = await axios.get('http://localhost:3001/avail');
    
    let data = res.data;
    return data;
}


// ========== '/oncall' endpoint ===========
test('Generating Oncalls', async () => {
    await expect(genOncalls()).resolves.toStrictEqual({Oncalls : [["L M", "Study Hall", "p2", "Math"]]});
});

async function genOncalls(){

    let payload = {
        Avail: [{staff_id: 1, period1: "Math", period2: "Math", period3: "free",period4: "Math", first_name: "L", last_name: "M"}, 
        {staff_id: 2, period1: "free", period2: "Math", period3: "Hist",period4: "Math", first_name: "C", last_name: "D"}],
        Abs: [{staff_id: 1, period1: "", period2: "A", period3: "",period4: "", first_name: "L", last_name: "M"}]
    }


    let res = await axios.post('http://localhost:3001/oncall', payload);
    let data = res.data
    return data
}


test('Generating Oncalls Fail', async () => {
    await expect(genOncallsFail()).resolves.toStrictEqual({Oncalls : "ERROR"});
});

async function genOncallsFail(){

    let payload = {
        Avail: [],
        Abs: []
    }


    let res = await axios.post('http://localhost:3001/oncall', payload);
    let data = res.data
    return data
}