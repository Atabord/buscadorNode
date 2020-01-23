const app = require('./app');
const http = require('http');

const server = http.Server(app);

const PORT = 3000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))