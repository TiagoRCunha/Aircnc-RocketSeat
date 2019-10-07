const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();

const server = http.Server(app);

const io = socketio(server);
// TODO retirei as credencias para adicionar ao repositorio
mongoose.connect('mongodb+srv://<username>:<password>@cluster0-dllf8.mongodb.net/onmi?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true });
// não recomendado para produção
const connectedUsers = {};
io.on('connection', socket => {

  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
  /*
  socket.emit('message', 'World');

  socket.on('omni', data => {
    console.log(data);
  })
  */
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})
// req.query -> Acessar query params (para post)
// req.params -> Acessar route params (para put)

app.use(cors())
app.use(express.json());
app.use('./files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);