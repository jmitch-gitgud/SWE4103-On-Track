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



// === TEST for Role Assignment, '/check' endpoint ===

test('Testing Role Assignment - OA', async () => {
    await expect(doPostRequest()).resolves.toStrictEqual({ "page": "/oa", "status": "Logged in" });
});

async function doPostRequest() {

    let payload = {
        Username: 'courtneyOA', 
        Password: 'O@4ever'
    };

    let res = await axios.post('http://localhost:3001/check', payload);
    
    let data = res.data;
    return data;
}

test('Add Single Day Abs', async() => {
    await expect(addSingleDayAbs()).resolves.toStrictEqual({status: "inserted"});
});

async function addSingleDayAbs() {

    let payload ={
        AbsDate: '01-01-2023',
        Staff: 31,
        P1: true,
        P2: false,
        P3: false,
        P4: true
    }
    
    let res = await axios.post('http://localhost:3001/short', payload);

    let data = res.data;
    return data;



}








