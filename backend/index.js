const express =  require('express');
const {setup} = require('./middlewares/setup');
const User = require('./routes/user-route');
const Post = require('./routes/post-route');
const socket = require('socket.io');
const setupIO = require('./middlewares/socket');
const http = require('http');
require('dotenv').config();

const app = express();
setup(app);
const server = http.createServer(app)
const io = socket(server);
setupIO(io);

app.use('/user', User);
app.use('/post', Post);
  
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port:${PORT}`));