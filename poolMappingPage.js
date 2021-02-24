const sql = require('mysql');

var connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Playercolke1998!",
    database: "cse316_final_project"
})

function writePoolMappingPage(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});

    var count = req.app.get('count')

    let html = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8" />
        <style>
            .poolMapping {
                width: 500px;
                margin: 0 auto;
                font-family: 'Times New Roman', Times, serif;
            }

            .poolMapping h1 {
                width: 100%;
                text-align: center;
                font-size: 40px;
                padding: 20px 0 20px 0;
            }

            .poolMapping input[type="text"] {
                width: 65%;
                align-items: flex-end;
                padding: 15px;
                border: 1px solid black;
                margin-bottom: 20px;
                box-sizing: border-box;
            }

            .poolMapping input[id="add"],
            .poolMapping input[id="addPool"],
            .poolMapping input[id="editPool"],
            .poolMapping input[id="deletePool"] {
                width: 100%;
                margin-top: 15px;
                padding: 15px;
                background-color: gray;
                border: 0;
                box-sizing: border-box;
                cursor: pointer;
                font-weight: bold;
                color: white;
            }

            .poolMapping input[id="delete"] {
                background-color: gray;
                padding: 10px;
                box-sizing: border-box;
                font-weight: bold;
                color: white;
            }

            .poolMapping table {
                width: 100%;
                border: 1px solid;
                margin-top: 30px;
            }
            .poolMapping td, 
            .poolMapping th{
                border: 1px solid;
            }
        </style>
    </head>

    <body>
        <div class="poolMapping">
            <h1>Pool Mapping</h1>
            <form method="post" action="/poolMapping">
                Pool barcode: 
                <input type="text" name="poolBarcode" value="">
                <br>
                Test barcode:
    `;
    res.write(html);

    for(i = 0; i < count; i++) {
        res.write(`<input type="text" name="testBarcode" value="">
        <input type="submit" name="action" value="delete" id="delete">`);
    }

    let middleHtml = `
    <input type="submit" name="action" value="Add more rows" id="add">
    <br>
    <input type="submit" name="action" value="Submit pool" id="addPool">
    </form>
    <form method="post" action"/poolMapping">
        <table>
            <tr>
                <td>Pool Barcode</td>
                <td>Test Barcodes</td>
            </tr>
    `;
    res.write(middleHtml);

    let query = `SELECT poolBarcode, group_concat(testBarcode) as testBarcode FROM poolmap group by poolBarcode;`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        for (let row of result) {
            res.write(`<tr>
            <th> <input type="checkbox" name="testBarcode" value="` + row.testBarcode + `">` + row.poolBarcode + `</th>\n<th>`
             + row.testBarcode + `</th></tr>`);
        }
        let closeHtml = `
        </table>
        <input type="submit" name="action" value="Edit Pool" id="editPool">
        <input type="submit" name="action" value="Delete Pool" id="deletePool">
        </form>
        </div>
        </body>
        </html>
        `;
        res.write(closeHtml);
        res.end();
    });

}

module.exports.writePoolMappingPage=writePoolMappingPage;