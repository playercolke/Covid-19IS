const sql = require('mysql');

var connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Playercolke1998!",
    database: "cse316_final_project"
})

function writeEmployee(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});

    let id = req.app.get('employeeid');

    let html = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <style>
        .result {
            width: 500px;
            margin: 0 auto;
            font-family: 'Times New Roman', Times, serif;
        }

        .result h1 {
            width: 100%;
            text-align: center;
            font-size: 40px;
            padding: 20px 0 20px 0;
        }

        .result table {
            width: 100%;
            border: 1px solid;
            margin-top: 30px;
        }

        .result td,
        .result th {
            border: 1px solid;
        }
    </style>
</head>

<body>
    <div class="result">
        <h1>Testing Result</h1>
        <table>
            <tr>
                <td>Collection day</td>
                <td>Result</td>
            </tr>
    `;
    res.write(html);
    
    let query = `SELECT E.collectionTime, W.result FROM employeetest as E, welltesting as W, poolmap as P
        WHERE E.employeeID="` + id + `" and E.testBarcode=P.testBarcode and P.poolBarcode=W.poolBarcode;`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        for (let row of result) {
            res.write(`<tr>
            <th>` + row.collectionTime + `</th>\n<th>`
             + row.result + `</th></tr>`);
        }

    let closeHtml = `
    </table>
    </div>
    </body>

    </html>`;
    res.write(closeHtml);
    res.end();
    });
}

module.exports.writeEmployee = writeEmployee;