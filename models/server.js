const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/socketController');

class Server {

    constructor(){
        this.App = express();
        this.port = process.env.PORT || 8085;
        this.server = require('http').createServer(this.App);
        this.io = require('socket.io')(this.server);
        
        this.middlewares();

        this.routes();

        this.socketEvents();
    }
    
    socketEvents(){
        this.io.on('connection', socketController);
    }

    middlewares(){
        this.App.use(cors());
        this.App.use(express.static('public'));
    }

    routes(){
        //this.App.use(this.paths.auth, require('../routes/auth'));
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor listo en puerto', this.port);
        });
    }
}

module.exports = Server;