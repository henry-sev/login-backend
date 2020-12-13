const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
  res.statusCode = '200';
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); 
  res.setHeader('Content-Type', 'application/json');
  // res.end('{"name": "hello"}');

  switch (req.method) {
    case 'GET':
      getUser(res);
      break;
    case 'POST':
      updateUser(req, res);
      break;
  }
  // fs.readFile('./user.json', (err, data) => {
  //   if (err) throw err;
  //   res.end(data);
  // })
});

async function readFileContent(filename) {
  return await new Promise((resolve, reject) => {
    fs.readFile(filename, async (err, data) => {
      err ? reject(err) : resolve(data);
    });
  }) ;
}

function getUser(res) {
  readFileContent('./user.json').then(data => {res.end(data)});
}

function updateUser(req, res) {
  readFileContent('./user.json').then(items => {
    items = JSON.parse(items);
    let data = '';
    req.on('data', chunk =>{data += chunk});

    req.on('end', () => {
      const maxId = items
        .reduce((maxItem, item) => (maxItem.id > item.id ? maxItem.id : item.id), 0);
      let newItem = JSON.parse(data);
      newItem.id = maxId + 1;
      items.push(newItem);
      fs.writeFileSync('./user.json', JSON.stringify(items));
      res.end(JSON.stringify(items));
      // res.end('已新增用户数据')
    });
  });

}

server.listen(3000, '127.0.0.1', () => {
  console.log('Server is running');
})