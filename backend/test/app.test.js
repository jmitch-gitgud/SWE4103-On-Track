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

// ========== '/long' endpoint ===========
 test('Adding a Multi-Day Absence', async () => {
    await expect(addMultiDayAbsence()).resolves.toStrictEqual({"status" : "inserted"});
});

async function addMultiDayAbsence(){

   let payload = {
    StartDate: '2022-12-12',
    EndDate: '2023-01-01',
    Staff: 3
       
   }

    let res = await axios.post('http://localhost:3001/long', payload);
    let data = res.data
    return data
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

// === TEST for Role Assignment, '/check' endpoint ===




test('Testing Role Assignment - OA', async () => {
    await expect(doPostRequest()).resolves.toStrictEqual({ "page": "/oa", "status": "Logged in" });
});

async function doPostRequest() {

    let payload = {

        Username: 'user1000',
        Password: 'pass1000'
    };

    let res = await axios.post('http://localhost:3001/check', payload);
    
    let data = res.data;
    return data;
}







