let http = require("http");
let fs = require("fs");
let url = require("url")

let serveur = http.createServer()

serveur.on("request",(request, response) =>{
    response.writeHead(200)
    let query = (url.parse(request.url, true)).query
    let name = query.name === undefined ? "ANONYME" : query.name
    fs.readFile("index.html","utf-8", (err, data) => {
        if(err) throw err
        response.writeHead(200,{
            "Content-Type": "text/html; charset=utf-8"
        })
        data = data.replace("{{ name }}", name)
        response.end(data)
    })
})
serveur.listen(8080)
