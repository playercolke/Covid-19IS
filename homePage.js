function writeHomePage(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });

    let html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <style>
                .home {
                    width: 500px;
                    margin: 0 auto;
                    font-family: 'Times New Roman', Times, serif;
                }
                .home h1 {
                    width: 100%;
                    text-align: center;
                    font-size: 40px;
                    padding: 20px 0 20px 0;
                }
                .home button {
                    text-align: center;
                    width: 100%;
                    font-size: 20px;
                    color: white;
                    margin: 10px 0 10px 0;
                    padding: 20px 0 20px 0;
                    background-color: grey;
                    box-sizing: border-box;
                }
            </style>
        </head>
        <body>
            <div class="home">
                <h1>LAB HOME</h1>
                <form action="/testCollection" method="get">
                    <button>Test Collection</button>
                </form>
                <form action="/poolMapping" method="get">
                    <button>Pool Mapping</button>
                </form>
                <form action="/wellTesting" method="get">
                    <button>Well Testing</button>
                </form>
            </div>
        </body>
    </html>
    `;

    res.write(html);
    res.end();
}

module.exports.writeHomePage = writeHomePage;