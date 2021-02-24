const url = require('url');
const sql = require('mysql');



function writeLoginPage(req, res, fail) {
    res.writeHead(200, {"Content-Type": "text/html"});

    let html = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>Login Page</title>
                    <meta charset="utf-8"/>
                    <style>
                    .login-form {
                        width: 500px;
                        margin: 0 auto;
                        font-family: 'Times New Roman', Times, serif;
                    }
                    .login-form h1 {
                        text-align: center;
                        color: black;
                        font-size: 25px;
                        padding: 20px 0 20px 0;
                    }
                    .login-form input[type="id"],
                    .login-form input[type="password"] {
                        width: 80%;
                        align-items: flex-end;
                        padding: 15px;
                        border: 1px solid black;
                        margin-bottom: 20px;
                        box-sizing: border-box;
                    }
                    .login-form input[type="submit"] {
                        width: 100%;
                        padding: 15px;
                        background-color: gray;
                        border: 0;
                        box-sizing: border-box;
                        cursor: pointer;
                        font-weight: bold;
                        color: white;
                    }
                    </style>
                </head>
                <body>
                <div class="login-form">
                    <h1>Lab Login Page</h1>
                    <form action="/" method="post">
                        Lab ID: <input type="id" name="id" placeholder="Lab ID" value="" required>
                        Password: <input type="password" name="password" placeholder="Password" value="" required>
                        <input type="submit" name="action" value="submit"/>
                    </form>
                    <br>
                    <form action="/" method="post">
                        Email: <input type="id" name="email" value="" required>
                        <br>
                        Password: <input type="password" name="password" value="" required>
                        <input type="submit" name="action" value="login"/>
                    </form>`;

    res.write(html);


    if (fail) {
        var closeHtml = `
        <b>Wrong ID or password, Try Again.<b>`;
        res.write(closeHtml);
    }

    closeHtml = `
        </div>
        </body>
        </html>`;

    res.write(closeHtml);
    res.end();
}

module.exports.writeLoginPage = writeLoginPage;