const TicketControl =  require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    //Conexion de un cliente ...
    console.log('Cliente conectado >' + socket.id);
    
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('tickets-pendientes', ticketControl.length);

    socket.on('siguiente-ticket', (payload, callback) => {
        console.log('->Siguiente-ticket', payload);

        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
    });

    // Desconexion de clientes
    socket.on('disconnect', ()=>{
        console.log('Cliente desconectado >' + socket.id);
    });

    socket.on('atender-ticket', ({ escritorio}, callback)=>{
        if( !escritorio ){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        socket.emit('tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        if( !ticket ){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }
    });
}

module.exports = {
    socketController
}