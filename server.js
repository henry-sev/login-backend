const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
  res.statusCode = '200';
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); 
  res.setHeader('Content-Type', 'application/json');
  // res.end('{"name": "hello"}');
  fs.readFile('./user.json', (err, data) => {
    if (err) throw err;
    res.end(data);
  })
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server is running');
})