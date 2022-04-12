console.log('Nuevo Ticket HTML');

// Referencias del HTML
const lblNuevoTicket  = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});


socket.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerHTML = 'Ticket <br>' + ultimo;
})


btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', 'generador de tickets', ( ticket ) => {
        console.log('Desde el server', ticket);
        lblNuevoTicket.innerHTML = ticket;
    });

});