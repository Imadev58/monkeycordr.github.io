const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

let messages = {};
let servers = [
    { name: 'S1', icon: 'https://via.placeholder.com/48' },
    { name: 'S2', icon: 'https://via.placeholder.com/48' }
];

// Load messages for each server and channel
io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('chat message', (data) => {
        if (!messages[data.server]) {
            messages[data.server] = {};
        }
        if (!messages[data.server][data.channel]) {
            messages[data.server][data.channel] = [];
        }
        messages[data.server][data.channel].push(data.msg);
        io.emit('chat message', data);
    });

    socket.on('load messages', (data) => {
        if (messages[data.server] && messages[data.server][data.channel]) {
            messages[data.server][data.channel].forEach((msg) => {
                socket.emit('chat message', { msg, channel: data.channel, server: data.server });
            });
        }
    });

    socket.on('create server', (serverData) => {
        const newServer = {
            name: serverData.name,
            icon: serverData.icon || 'https://via.placeholder.com/48'
        };
        servers.push(newServer);
        io.emit('server created', newServer);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
