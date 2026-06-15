const http = require('http');
const url = require('url');

const cmdQueue = [];
let latestLedStatus = '';

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const query = parseUrl.query;
    const pathname = parseUrl.pathname;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (pathname === '/send' && req.method === 'GET') {
        if (query.out) {
            latestLedStatus = decodeURIComponent(query.out).trim();
        }
        res.end('ok');
        return;
    }

    if (pathname === '/cmd' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const cmd = body.trim();
            if (cmd) cmdQueue.push(cmd);
            res.end('ok');
        });
        return;
    }

    if (pathname === '/cmd' && req.method === 'GET') {
        const resp = cmdQueue.length > 0 ? cmdQueue.shift() : '';
        res.end(resp);
        return;
    }

    if (pathname === '/getLog' && req.method === 'GET') {
        res.end(latestLedStatus);
        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

server.listen(8080, () => {
    console.log('LED service started successfully on port 8080');
});