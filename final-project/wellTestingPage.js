const sql = require('mysql');

var connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Playercolke1998!",
    database: "cse316_final_project"
})

function writeWellTestingPage(req, res) {
    res.writeHead(200, {"Content-type": "text/html"});

    var editWellBarcode = req.app.get('wellBarcode') ? req.app.get("wellBarcode") : "";
    var editPoolBarcode = req.app.get("poolBarcode") ? req.app.get("pollBarcode") : "";

    let html =`
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8" />
        <style>
            .wellTesting {
                width: 500px;
                margin: 0 auto;
                font-family: 'Times New Roman', Times, serif;
            }

            .wellTesting h1 {
                width: 100%;
                text-align: center;
                font-size: 40px;
                padding: 20px 0 20px 0;
            }

            .wellTesting input[type="text"] {
                width: 65%;
                align-items: flex-end;
                padding: 15px;
                border: 1px solid black;
                margin-bottom: 20px;
                box-sizing: border-box;
            }

            .wellTesting input[id="add"] {
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

            .wellTesting input[id="editWell"],
            .wellTesting input[id="deleteWell"] {
                width: 45%;
                margin-top: 15px;
                padding: 15px;
                background-color: gray;
                border: 0;
                box-sizing: border-box;
                cursor: pointer;
                font-weight: bold;
                color: white;
            }

            .wellTesting table {
                width: 100%;
                border: 1px solid;
                margin-top: 30px;
            }
            .wellTesting td, 
            .wellTesting th{
                border: 1px solid;
            }
        </style>
    </head>

    <body>
        <div class="wellTesting">
            <h1>Well Testing</h1>
            <form method="post" action="/wellTesting">
                Well barcode: 
                <input type="text" name="wellBarcode" value="` + editWellBarcode + `">
                <br>
                Poll barcode: 
                <input type="text" name="poolBarcode" value="` + editPoolBarcode + `">
                <br>
                Result: 
                <select name="result">
                    <option value="in progress">in progress</option>
                    <option value="negative">negative</option>
                    <option value="positive">positive</option>
                </select>
                <input type="submit" name="action" value="Add" id="add">
            </form>
            <form method="post" action="/wellTesting">
                <table>
                    <tr>
                        <td>Well Barcode</td>
                        <td>Pool Barcodes</td>
                        <td>Result</td>
                    </tr>`;
    res.write(html);

    let query = `SELECT wellBarcode, poolBarcode, result FROM welltesting;`;

    connection.query(query, (err, result) => {
        if (err) throw err;
        for (let row of result) {
            res.write(`<tr>
            <th> <input type="checkbox" name="wellBarcode" value="` + row.wellBarcode + `">` + row.wellBarcode + `</th>\n<th>`
             + row.poolBarcode + `</th>\n<th>` + row.result + `</th></tr>`);
        }
        let closeHtml = `
        
        </table>
        <input type="submit" name="action" value="Edit Well" id="editWell">
        <input type="submit" name="action" value="Delete Well" id="deleteWell">
        </form>
        </div>
        </body>
    
        </html>`;
        res.write(closeHtml);
        res.end();
    });
}

module.exports.writeWellTestingPage=writeWellTestingPage;