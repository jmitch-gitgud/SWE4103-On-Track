const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'jordan_rocks',
    database: 'testbase',
    port: 5432,
});

const setupDatabase = async () => {
    try {
        await client.connect();  
        
        // Setting up database and tables
        await client.query("Create Table if not exists School( School_ID SERIAL PRIMARY KEY, School_Name VARCHAR(100) NOT NULL, School_Address VARCHAR(150) NOT NULL);");
        await client.query("Create Table if not exists Status(Status_ID SERIAL PRIMARY KEY, Status VARCHAR(25) NOT NULL);");
        await client.query("Create Table if not exists Roles(Role_ID SERIAL PRIMARY KEY, Role_Name VARCHAR(25) NOT NULL );");
        await client.query("Create Table if not exists Staff(Staff_ID SERIAL PRIMARY KEY, Role_ID integer NOT NULL, Status_ID integer NOT NULL, Username VARCHAR(50) UNIQUE NOT NULL, Password VARCHAR(50) NOT NULL, First_Name VARCHAR(50) DEFAULT 'myFirstName', Last_Name VARCHAR(50) DEFAULT 'myLastName', Email VARCHAR(50) UNIQUE, CONSTRAINT fk_Role_ID FOREIGN KEY(Role_ID) REFERENCES Roles(Role_ID), CONSTRAINT fk_Status_ID FOREIGN KEY(Status_ID) REFERENCES Status(Status_ID));");
        await client.query("Create Table if not exists VP(Staff_ID integer NOT NULL PRIMARY KEY, School_ID integer NOT NULL, CONSTRAINT fk_Staff_ID FOREIGN KEY(Staff_ID) REFERENCES Staff(Staff_ID), CONSTRAINT fk_School_ID FOREIGN KEY(Staff_ID) REFERENCES Staff(Staff_ID));");
        await client.query("Create Table if not exists OA(Staff_ID integer NOT NULL PRIMARY KEY, School_ID integer NOT NULL, CONSTRAINT fk_Staff_ID FOREIGN KEY(Staff_ID) REFERENCES Staff(Staff_ID), CONSTRAINT fk_School_ID FOREIGN KEY(Staff_ID) REFERENCES Staff(Staff_ID));");
        await client.query("Create Table if not exists Pathway(Pathway_ID SERIAL PRIMARY KEY, Pathway_Name VARCHAR(50) NOT NULL);");
        await client.query("Create Table if not exists Areas(Area_ID Serial PRIMARY KEY, Area_Name VARCHAR(75) NOT NULL);");
        await client.query("Create Table if not exists FullTime_Teacher(Staff_ID integer NOT NULL PRIMARY KEY, School_ID integer NOT NULL, Teachable_Areas integer[] NOT NULL, CONSTRAINT fk_Staff_ID FOREIGN KEY(Staff_ID) REFERENCES Staff(Staff_ID), CONSTRAINT fk_School_ID FOREIGN KEY(Staff_ID) REFERENCES Staff(Staff_ID));");
        await client.query("Create table if not exists Courses(Course_Code VARCHAR(5) NOT NULL UNIQUE PRIMARY KEY, Course_Title VARCHAR(50) NOT NULL, Course_Area integer NOT NULL, Course_Pathway integer NOT NULL, Grade_Level integer NOT NULL);");
        await client.query("Create table if not exists Work_Absence(Absence_ID SERIAL PRIMARY KEY, Staff_ID integer NOT NULL, Absence_Date date NOT NULL, Period1 VARCHAR(5), Period2 VARCHAR(5), Period3 VARCHAR(5), Period4 VARCHAR(5), CONSTRAINT fk_Staff_ID FOREIGN KEY(Staff_ID) REFERENCES Staff(Staff_ID));");
        await client.query("Create table if not exists Schedule(Staff_ID integer NOT NULL PRIMARY KEY, Period1 VARCHAR(5), Period2 VARCHAR(5), Period3 VARCHAR(5), Period4 VARCHAR(5), CONSTRAINT fk_Staff_ID FOREIGN KEY(Staff_ID) REFERENCES Staff(Staff_ID));");
        await client.query("Create Table if not exists Substitute_Teacher(Staff_ID integer NOT NULL PRIMARY KEY, Workable_Schools integer[] NOT NULL, Teachable_Areas integer[] NOT NULL, CONSTRAINT fk_Staff_ID FOREIGN KEY(Staff_ID) REFERENCES Staff(Staff_ID));");

        // Inserting test data
        await client.query("INSERT INTO Roles(Role_ID, Role_Name) VALUES (DEFAULT, 'Full-Time Teacher'), (DEFAULT, 'Substitute Teacher'), (DEFAULT, 'Office Administrator'), (DEFAULT, 'Vice Principal'), (DEFAULT, 'Office Manager');");
        await client.query("INSERT INTO Status(Status_ID, Status) VALUES (DEFAULT, 'Active'), (DEFAULT, 'Inactive');");
        await client.query("INSERT INTO Pathway(Pathway_ID, Pathway_Name) VALUES (DEFAULT, 'Open'), (DEFAULT, 'University/College Preparation'), (DEFAULT, 'Workplace Preparation');"); // What we have thus far
        await client.query("INSERT INTO Areas(Area_ID, Area_Name) VALUES (DEFAULT, 'Technilogical Education'), (DEFAULT, 'The Arts'), (DEFAULT, 'Guidance and Career Education');");

        // Inserting test staff member data - with password encryption
        await client.query("CREATE EXTENSION pgcrypto SCHEMA public;");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Office Administrator'), (SELECT status_id FROM status WHERE status = 'Active'), 'oa1', crypt('password', gen_salt('md5')), 'Jane', 'Doe', 'test@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Office Administrator'), (SELECT status_id FROM status WHERE status = 'Active'), 'oa2', crypt('password', gen_salt('md5')), 'Emily', 'Wiggins', 'test2@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Vice Principal'), (SELECT status_id FROM status WHERE status = 'Active'), 'vp1', crypt('password', gen_salt('md5')), 'Jack', 'Jackson', 'test15@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Vice Principal'), (SELECT status_id FROM status WHERE status = 'Active'), 'vp2', crypt('password', gen_salt('md5')), 'John', 'Johnson','test16@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Office Manager'), (SELECT status_id FROM status WHERE status = 'Active'), 'om1', crypt('password', gen_salt('md5')), 'Marie', 'Antoinette', 'test17@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Office Manager'), (SELECT status_id FROM status WHERE status = 'Active'), 'om2', crypt('password', gen_salt('md5')), 'Maximilien', 'Robespierre', 'test18@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Substitute Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'ST1', crypt('password', gen_salt('md5')), 'Jackmerius', 'Tacktheritrix', 'test19@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Substitute Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'ST2', crypt('password', gen_salt('md5')), 'Javaris-Jamar', 'Javarison-Lamar', 'test20@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'),'FT1', crypt('password', gen_salt('md5')), 'Ethan', 'Alward', 'ealward@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT2', crypt('password', gen_salt('md5')), 'Nathan', 'Awkward', 'nawkward@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT3', crypt('password', gen_salt('md5')), 'Steven', 'Tyler', 'test3@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT4', crypt('password', gen_salt('md5')), 'Alicia', 'CarKeys', 'test4@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT5', crypt('password', gen_salt('md5')), 'Dwayne', 'Johnson', 'test5@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT6', crypt('password', gen_salt('md5')), 'Halle', 'BlueBerry', 'test7@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT7', crypt('password', gen_salt('md5')), 'Oprah', 'Losefree', 'test8@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT8', crypt('password', gen_salt('md5')), 'Robert', 'Down', 'test9@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT9', crypt('password', gen_salt('md5')), 'Steve', 'Occupation', 'test10@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT10', crypt('password', gen_salt('md5')), 'Aubrey', 'Graham', 'test11@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT11', crypt('password', gen_salt('md5')), 'Travis', 'Scott', 'test12@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT12', crypt('password', gen_salt('md5')), 'Michael', 'Scott', 'test13@unb.ca');");
        await client.query("INSERT INTO staff (staff_id, role_id, status_id, username, password, first_name, last_name, email) VALUES (DEFAULT, (SELECT role_id FROM roles WHERE role_name = 'Full-Time Teacher'), (SELECT status_id FROM status WHERE status = 'Active'), 'FT13', crypt('password', gen_salt('md5')), 'Steve', 'Carell', 'test14@unb.ca');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT1'), 'free', 'math', 'gym', 'art');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT2'), 'math', 'free', 'gym', 'art');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT3'), 'math', 'gym', 'free', 'art');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT4'), 'math', 'gym', 'art', 'free');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT5'), 'free', 'math', 'gym', 'art');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT6'), 'math', 'free', 'art', 'gym');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT7'), 'math', 'gym', 'free', 'art');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT8'), 'math', 'gym', 'art', 'free');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT9'), 'free', 'math', 'gym', 'art');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT10'), 'math', 'free', 'art', 'gym');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT11'), 'math', 'gym', 'free', 'art');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT12'), 'math', 'gym', 'art', 'free');");
        await client.query("INSERT INTO schedule (staff_id, period1, period2, period3, period4) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT13'), 'free', 'gym', 'art', 'math');");
        await client.query("INSERT INTO work_absence (absence_id, staff_id, absence_date, period1, period2, period3, period4) VALUES (DEFAULT, (SELECT staff_id FROM staff WHERE username = 'FT2'), '2022-11-27', 'A', 'A', '', '');");
        await client.query("INSERT INTO work_absence (absence_id, staff_id, absence_date, period1, period2, period3, period4) VALUES (DEFAULT, (SELECT staff_id FROM staff WHERE username = 'FT3'), '2022-11-27', '', 'A', '', '');");
        await client.query("INSERT INTO work_absence (absence_id, staff_id, absence_date, period1, period2, period3, period4) VALUES (DEFAULT, (SELECT staff_id FROM staff WHERE username = 'FT4'), '2022-11-27', '', '', 'A', '');");
        await client.query("INSERT INTO work_absence (absence_id, staff_id, absence_date, period1, period2, period3, period4) VALUES (DEFAULT, (SELECT staff_id FROM staff WHERE username = 'FT5'), '2022-11-27', '', '', 'A', 'A');");

        await client.query("INSERT INTO FullTime_Teacher(staff_id, school_id, teachable_areas) VALUES ((SELECT staff_id FROM staff WHERE username = 'FT8'), 1, '{1}');");
        await client.query("INSERT INTO FullTime_Teacher(staff_id, school_id, teachable_areas) VALUES (9, 1, '{2}');");

        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();                                
    }
};

setupDatabase().then((result) => {
    if (result) {
        console.log('Setup has run successfully.');
    }
});
