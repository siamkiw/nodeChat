const fs = require("fs")
const http = require("http")
const {WebSocketServer} = require("ws")

const port = 5555
const wss1 = new WebSocketServer({ noServer: true });

wss1.on('connection', function connection(ws, req) {
    // do some thing
    console.log("on connection")

    ws.on('message', function incoming(data) {
        wss1.clients.forEach(function each(client) {
            let str = new TextDecoder().decode(data); 
            const obj = {
                ip : req.connection.remoteAddress,
                message : str
            }
            
            client.send(JSON.stringify(obj));
        //   if (client !== ws && client.readyState === WebSocket.OPEN) {
        //     client.send(data);
        //   }
        })
      })
  });

const server = http.createServer((req, res) => {
    if(req.url === "/" && req.method === "GET"){
        console.log("on GET /")

        res.writeHead(200, { 'Content-Type': 'text/html' });

        const files = fs.readFileSync("./static/index.html");

        res.write(files)

        res.end()
    }
})

server.on('upgrade', function upgrade(req, socket, head){

  if (req.url === '/ws') {
    wss1.handleUpgrade(req, socket, head, function done(ws) {
      wss1.emit('connection', ws, req);
    });
  } else {
    socket.destroy();
  }
})

server.listen(port, () => {
    console.log("listem on port ", port)
})
