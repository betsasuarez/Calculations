const http = require('http');
const bodyParser = require('body-parser');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/calculate') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const parsedParams = new URLSearchParams(parsedBody);
      const numero1 = parseFloat(parsedParams.get('numero1'));
      const numero2 = parseFloat(parsedParams.get('numero2'));
      const numero3 = parseFloat(parsedParams.get('numero3'));

      const r1 = numero1 + numero2;
      const r2 = r1 * numero3;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`R1: ${r1}<br>R2: ${r2}`);
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Calculations</title>
        </head>
        <body>
          <form action="/calculate" method="post">
             
            <input type="number"name="numero1" required><br><br>
           
            <input type="number"  name="numero2" required><br><br>
           
            <input type="number"  name="numero3" required><br><br>
            <button type="submit">Calcular</button>
          </form>
        </body>
      </html>
    `);
  }
});

server.listen(5001, () => {
  console.log('Server listening on port 5001');
});

