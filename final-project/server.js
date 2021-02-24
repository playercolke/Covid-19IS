const sql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const loginPage = require("./loginPage");
const homePage = require("./homePage");
const testCollectionPage = require('./testCollectionPage');
const poolMappingPage = require('./poolMappingPage');
const wellTestingPage = require("./wellTestingPage");
const employeePage = require('./employee');

var connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Playercolke1998!",
    database: "cse316_final_project"
})

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    loginPage.writeLoginPage(req, res, false);
});
app.post('/', (req, res) => {
    var action = req.body.action;
    if (action == "submit") {
        var id = req.body.id;
        var password = req.body.password;
        let check = `SELECT * FROM labemployee WHERE labID="` + id + `" AND password="` + password + `";`;
        connection.query(check, function (err, result) {
            if (err) throw err;
            else if (result.length > 0) {
                req.app.set('id', id);
                res.redirect('/home');
            }
            else {
                console.log("not good");
                loginPage.writeLoginPage(req, res, true);
            }
        });
    } else {
        var email = req.body.email;
        var password = req.body.password;
        let check = `SELECT * FROM employee WHERE email="` + email + `" AND passcode="` + password + `";`;
        connection.query(check, (err, result) => { 
            var id = result[0].employeeID;
            if (err) throw err;
            else if (result.length > 0) {
                req.app.set('employeeid', id);
                res.redirect('/employee');
            }
            else {
                console.log("not good");
                loginPage.writeLoginPage(req, res, true);
            }
        });
    }
});

app.get('/employee', (req, res) => {
    employeePage.writeEmployee(req, res);
})

app.get('/home', (req, res) => {
    homePage.writeHomePage(req, res);
});

app.get('/testCollection', (req, res) => {
    testCollectionPage.writeTestCollectionPage(req, res);
});
app.post('/testCollection', (req, res) => {
    var action = req.body.action;
    if (action == "Add") {
        var employeeID = req.body.employeeID;
        var testBarcode = req.body.testBarcode;
        var id = req.app.get('id');
        let sql = `INSERT INTO employeetest VALUES(` + testBarcode + `, ` + employeeID + `, curdate(), ` + id + `);`;
        connection.query(sql, (err, result) => {
            if (err) {
                console.log("No such employee");;
            } else {
                console.log("1 test added");
            }
            testCollectionPage.writeTestCollectionPage(req, res);
        });
    }
    else {
        var testBarcode = req.body.testBarcode;
        let sql = `DELETE FROM employeetest WHERE testBarcode= ? ;`;
        connection.query(sql, [testBarcode], (err, result) => {
            if (err) {
                console.log("No checkbox or multi boxes selected");
            }
            else {
                console.log("1 test deleted");
            }
            testCollectionPage.writeTestCollectionPage(req, res);
        });
    }
});

app.get('/poolMapping', (req, res) => {
    app.set('count', 0);
    poolMappingPage.writePoolMappingPage(req, res);
});
app.post('/poolMapping', (req, res) => {
    var action = req.body.action;
    if (action == "Add more rows") {
        count = app.get('count');
        count++;
        app.set('count', count);
        poolMappingPage.writePoolMappingPage(req, res);
    }
    else if (action == "delete") {
        count = app.get('count');
        count--;
        app.set('count', count);
        poolMappingPage.writePoolMappingPage(req, res);
    }
    else if (action == "Submit pool") {
        var poolBarcode = req.body.poolBarcode;
        let query = `SELECT * FROM pool WHERE poolBarcode=` + poolBarcode + `;`;
        connection.query(query, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                query = `INSERT INTO pool values (` + poolBarcode + `);`;
                connection.query(query, (err, result) => {
                    if (err) throw err;
                });
            }
        })
        var testBarcode = req.body.testBarcode;
        console.log(testBarcode);
        if (Array.isArray(testBarcode)) {
            for (i = 0; i < testBarcode.length - 1; i++) {
                query = `INSERT INTO poolmap VALUES(` + poolBarcode + `, ` + testBarcode[i] + `);`;
                connection.query(query, (err, result) => {
                    if (err) {
                        console.log("no such testBacode");
                    } else {
                        console.log("one pool map added");
                    }
                });
            }
            query = `INSERT INTO poolmap VALUES(` + poolBarcode + `, ` + testBarcode[testBarcode.length - 1] + `);`;
            connection.query(query, (err, result) => {
                if (err) {
                    console.log("no such testBacode");
                } else {
                    console.log("one pool map added");
                }
                poolMappingPage.writePoolMappingPage(req, res);
            });
        } else {
            query = `INSERT INTO poolmap VALUES(` + poolBarcode + `, ` + testBarcode + `);`;
            connection.query(query, (err, result) => {
                if (err) {
                    console.log("no such testBarcode or duplicate testBarcode");
                } else {
                    console.log("one pool map added");
                }
                poolMappingPage.writePoolMappingPage(req, res);
            });
        }
    }
    else if (action == "Edit Pool") {
        poolMappingPage.writePoolMappingPage(req, res);
    }
    else {
        var testBarcode = req.body.testBarcode;
        var list = testBarcode.split(",");
        console.log(list);
        for (i = 0; i < list.length - 1; i++) {
            var query = `DELETE FROM poolmap WHERE testBarcode=` + list[i] + `;`;
            connection.query(query, (err, result) => {
                if (err) throw err;
                else {
                    console.log("one pool map deleted");
                }
            });
        }
        var query = `DELETE FROM poolmap WHERE testBarcode=` + list[list.length - 1] + `;`;
        connection.query(query, (err, result) => {
            if (err) throw err;
            else {
                console.log("one pool map deleted");
            }
            poolMappingPage.writePoolMappingPage(req, res);
        });
    }
});

app.get('/wellTesting', (req, res) => {
    wellTestingPage.writeWellTestingPage(req, res);
});
app.post('/wellTesting', (req, res) => {
    var action = req.body.action;
    if (action == "Add") {
        var wellBarcode = req.body.wellBarcode;
        var poolBarcode = req.body.poolBarcode;
        var result = req.body.result;
        let query = `insert into welltesting values(` + wellBarcode + `, ` + poolBarcode + `, curdate(), null, "` + result + `");`;
        connection.query(query, (err, result) => {
            if (err) {
                console.log("not exist or duplicate wellBarcode or poolBarcode");
            }
            else {
                console.log("one well map added");
            }
            wellTestingPage.writeWellTestingPage(req, res);
        });
    }
    else if (action == "Edit Well") {
        var wellBarcode = req.body.wellBarcode;
        let query = `SELECT wellBarcode, poolBarcode FROM welltesting WHERE wellBarcode=` + wellBarcode + `;`;
        connection.query(query, (err, result) => {
            if (err) throw err;
            wellTestingPage.writeWellTestingPage(req, res);
        });
    }
    else {
        var wellBarcode = req.body.wellBarcode;
        var query = `DELETE FROM welltesting WHERE wellBarcode=` + wellBarcode + `;`;
        connection.query(query, (err, result) => {
            if (err) throw err;
            else {
                console.log("one well deleted");
            }
            wellTestingPage.writeWellTestingPage(req, res);
        })
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("port is opened"));

module.exports.connection = sql;