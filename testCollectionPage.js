const sql = require('mysql');

var connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Playercolke1998!",
    database: "cse316_final_project"
})

function writeTestCollectionPage(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    let id = req.app.get('id');

    let query = `SELECT employeeID, testBarcode FROM employeetest
        WHERE collectBy="` + id + `";`;

    let html = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8" />
        <style>
            .testCollection {
                width: 500px;
                margin: 0 auto;
                font-family: 'Times New Roman', Times, serif;
            }

            .testCollection h1 {
                width: 100%;
                text-align: center;
                font-size: 40px;
                padding: 20px 0 20px 0;
            }

            .testCollection input[type="text"] {
                width: 80%;
                align-items: flex-end;
                padding: 15px;
                border: 1px solid black;
                margin-bottom: 20px;
                box-sizing: border-box;
            }

            .testCollection input[type="submit"] {
                width: 100%;
                padding: 15px;
                margin-top: 15px;
                background-color: gray;
                border: 0;
                box-sizing: border-box;
                cursor: pointer;
                font-weight: bold;
                color: white;
            }

            .testCollection table {
                width: 100%;
                border: 1px solid;
                margin-top: 30px;
            }
            .testCollection td, 
            .testCollection th{
                border: 1px solid;
            };
        </style>
    </head>

    <body>
        <div class="testCollection">
            <h1>Test Collection</h1>
            <form method="post" action="/testCollection">
                Employee ID:
                <input type="text" name="employeeID" value="" required>
                <br>
                Test Barcode:
                <input type="text" name="testBarcode" value="" required>
                <br>
                <input type="submit" name="action" value="Add"/>
            </form>
            <form method="post" action="/testCollection">
            <table>
                <tr>
                    <th>Employee ID</th>
                    <th>Test Barcode</th>
                </tr>`;
    res.write(html);

    connection.query(query, (err, result) => {
        if (err) throw err;
        for (let row of result) {
            res.write(`<tr>
            <th> <input type="checkbox" name="testBarcode" value="` + row.testBarcode + `">` + row.employeeID + `</th>\n<th>`
             + row.testBarcode + `</th></tr>`);
        }
        let closeHtml = `
        </table>
        <input type="submit" name="action" value="Delete"/>
        </form>
        </div>
        </body>
        </html>`;
        res.write(closeHtml);
        res.end();
    });
}

module.exports.writeTestCollectionPage = writeTestCollectionPage;