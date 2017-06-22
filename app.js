var app = require('./config/server');

var server = app.listen(5000, function(req, res){
    console.log('Servidor ON!');
});

var io = require('socket.io').listen(server);

app.set("io", io);

io.on('connection', function(socket){
    console.log("Usuário conectado");

    socket.on('disconnect', function(){
        console.log("Usuário desconectou");
    });

    socket.on('enviarMensagem', function(data){
        socket.emit('mensagem',{apelido: data.apelido, msg: data.mensagem});
        socket.broadcast.emit('mensagem',{apelido: data.apelido, msg: data.mensagem});

        if(parseInt(data.atualizado) == 0){
            socket.emit('participante',{apelido: data.apelido});
            socket.broadcast.emit('participante',{apelido: data.apelido});
        }
        
    });
});