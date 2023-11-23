require('dotenv').config();

var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/dynamic-chat-app');

const app = require('express')();

require('http').Server(app)

const http = require('http').Server(app)

const userRoute = require('./routers/userRoute')
const User = require('./models/userModel')

app.use('/', userRoute);

const io = require('socket.io')(http)

var usp = io.of('/user-namespace')

usp.on('connection', async function (socket) {
    console.log('User Connected')

    var userId = socket.handshake.auth.token

    await User.findByIdAndUpdate({ _id: userId }, { $set: { is_online: '1' } })

    //user broadcast online status
    socket.broadcast.emit('getOnlineUser', { user_id: userId })

    socket.on('disconnect', async function () {
        console.log('user Disconnected')

        var userId = socket.handshake.auth.token
        await User.findByIdAndUpdate({ _id: userId }, { $set: { is_online: '0' } })

        //user broadcast online status
        socket.broadcast.emit('getOfflineUser', { user_id: userId })

    })

    //chatting implementation
    socket.on('newChat', function (data) {
        socket.broadcast.emit('loadNewChat', data)

    })

})

http.listen(3000, function () {
    console.log('Server is running')
})