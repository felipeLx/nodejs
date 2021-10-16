const path = require('path')
const express  = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname + './chat-type/public')))
app.get('/', (req, res) => res.sendFile(__dirname + './chat-type/public/index.html'))

io.on('connect', socket => {
    //sockect connect
    io.emit('broadcast', '[Server] : Olá, precisa de ajuda?')

    socket.on('message', msg => {
        console.log(`message received from user: ${msg.from}`);
        console.log(`message received content: ${msg.content}`);
        // io.emit('message', msg);
    })

    socket.on('disconnect', () => {
        io.emit('broadcast', '[Server] : Até já')
    })
})

const port = process.env.Port || 5000
app.set('port', port)

http.listen(port, () => {
    console.log('connect on Port: ' + port)
})