const { json } = require('body-parser')
//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server

//指定開啟的 port
const PORT = 3000

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })

let CLIENTS = [];

//當 WebSocket 從外部連結時執行
wss.on('connection', (ws, req) => {

    const ip = req.connection.remoteAddress;
    const port = req.connection.remotePort;
    const clientId = ip + port;

    //連結時執行此 console 提示
    console.log('Client connected')
    console.log('%s is connected', clientId);

    let client_data = {
        client_id: clientId,
        clientNickname: '',
    };
    CLIENTS.push(client_data);
    // 发送欢迎信息给客户端
    ws.send(JSON.stringify(client_data));

    //固定送最新時間給 Client
    // const sendNowTime = setInterval(()=>{
    //     ws.send(String(new Date()))
    // },1000)

    //tempdata
    let received_tempdata = null;
    const now = new Date();
    let clients = wss.clients;

    let sendding_message_data = {
        message_content: '',
        message_from: '',
        sendout_time: '',
        member_list: CLIENTS,
    };

    ws.on('message', data => {
        //取得所有連接中的 client
        received_tempdata = JSON.parse(data);
        if (received_tempdata.my_clientNickname) {
            CLIENTS.forEach(item => {
                if (item.client_id == received_tempdata.my_client_id) {
                    item.clientNickname = received_tempdata.my_clientNickname;
                    sendding_message_data.message_content = `歡迎 ${received_tempdata.my_clientNickname} 進入聊天室！`;
                    sendding_message_data.message_from = '系統通知：';
                    sendding_message_data.sendout_time = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
                    clients.forEach(client => {
                        client.send(JSON.stringify(sendding_message_data));
                    });
                };
            });
            console.log(CLIENTS);
        };

        //做迴圈，發送訊息至每個 client
        clients.forEach(client => {
            client.send(data)
        })

    })

    //當 WebSocket 的連線關閉時執行
    ws.on('close', () => {
        console.log('Close connected');
        console.log(ws._socket._peername);
        const disconnect_ip = ws._socket._peername.address;
        const disconnect_port = ws._socket._peername.port;
        const disconnect_clientId = disconnect_ip + disconnect_port;
        let remain_CLIENTS = [];
        CLIENTS.forEach((item) => {
            if (item.client_id == disconnect_clientId) {
                sendding_message_data.message_content = ` ${item.clientNickname} 離開了聊天室！`;
                sendding_message_data.message_from = '系統通知：';
                sendding_message_data.sendout_time = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
            }else{
                remain_CLIENTS.push(item);
            };
        });
        CLIENTS = remain_CLIENTS;
        sendding_message_data.member_list = remain_CLIENTS;
        clients.forEach(client => {
            client.send(JSON.stringify(sendding_message_data));
        });
    })
})

