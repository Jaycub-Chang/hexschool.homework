//dom
const nickWrap = document.querySelector('#nickWrap');
const nickname_Submit_btn = document.querySelector('#nickname_Submit_btn');
const txtNickname = document.querySelector('#txtNickname');
const message_send_btn = document.querySelector('#message_send_btn');
const message = document.querySelector('#message');
const chat = document.querySelector('#chat');
const chat_area = document.querySelector('#chat_area');
const chat_time = document.querySelector('#chat_time');
const typing_area = document.querySelector('#typing_area');
const typing_client_display = document.querySelector('#typing_client_display');
const contentWrap = document.querySelector('#contentWrap');
const loader = document.querySelector('#loader');
const send_message = document.querySelector('#send-message');
const room_member_list =document.querySelector('#room_member_list');

//typing const
let typing = false;
let timeout = null;

//send to server data
const now = new Date();
let set_server_nickName = {};
let sendding_message_data = {
    message_content: '',
    message_from: '',
    sendout_time: '',
};
let typing_data = {
    typing_client: '',
    typing_status: false,
};


//user_data
const user_data = {
    my_client_id: null,
    my_clientNickname: null,
}
//tempdata
let received_tempdata = null;


//WebSocket
//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket('ws://localhost:3000');

//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
    console.log('open connection');
};

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
    console.log('close connection');
}

//接收 Server 發送的訊息
ws.onmessage = event => {
    // console.log(event);
    received_tempdata = JSON.parse(event.data);
    if (received_tempdata.client_id) {
        user_data.my_client_id = received_tempdata.client_id;
    };
    if (received_tempdata.message_content) {
        render_chat_room(received_tempdata);
        console.log(received_tempdata);
    }
    if (received_tempdata.typing_status) {
        typing = received_tempdata.typing_status;
        typing_render(received_tempdata);
    } else {
        typing = false;
        typing_render(received_tempdata);
    };
}


//set nickname
nickname_Submit_btn.addEventListener('click', (event) => {
    event.preventDefault();
    user_data.my_clientNickname = txtNickname.value.trim();
    set_server_nickName = user_data;
    ws.send(JSON.stringify(set_server_nickName));
    if (user_data.my_clientNickname) {
        contentWrap.setAttribute('style', 'display:block');
    };
});

//send message
message_send_btn.addEventListener('click', () => {
    sendding_message_data.message_content = message.value;
    sendding_message_data.message_from = user_data.my_clientNickname;
    sendding_message_data.sendout_time = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    ws.send(JSON.stringify(sendding_message_data));
    message.value = null;
});
send_message.addEventListener('keydown', (event) => {
    console.log(event);
    if (event.keyCode == 13) {
        event.preventDefault();
        sendding_message_data.message_content = message.value;
        sendding_message_data.message_from = user_data.my_clientNickname;
        sendding_message_data.sendout_time = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}  ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        ws.send(JSON.stringify(sendding_message_data));
        message.value = null;
    };
});


//typing detect
message.addEventListener('keyup', () => {
    if (typing == false) {
        typing = true;
        typing_data.typing_status = true;
        typing_data.typing_client = user_data.my_clientNickname;
        ws.send(JSON.stringify(typing_data));
        timeout = setTimeout(timeoutFunction, 5000);
    } else {
        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunction, 5000);
    };
});

const timeoutFunction = () => {
    typing = false;
    typing_data.typing_status = false;
    ws.send(JSON.stringify(typing_data));
};



//render
const render_chat_room = (data) => {
    let new_line = chat.cloneNode();
    let new_chat_time = chat_time.cloneNode();
    new_line.textContent = `${data.message_from}：${data.message_content}`;

    new_chat_time.textContent = `發送時間：${data.sendout_time}`
    chat_area.append(new_line);
    chat_area.append(new_chat_time);
    chat_area.scrollTop = chat_area.scrollHeight;

    let member_display = '';

    if (Array.isArray(data.member_list)) {
        data.member_list.forEach(item => {
            member_display += `<h6>ID：${item.client_id} - ${item.clientNickname}</h6>`;
        });
        room_member_list.innerHTML = member_display;
    };

};

const typing_render = (data) => {
    if (typing == true) {
        loader.setAttribute('style', 'visibility: visible;');
        typing_client_display.textContent = `${data.typing_client} is typing `;
    } else {
        loader.setAttribute('style', 'visibility: hidden;');
    };
};

loader.setAttribute('style', 'visibility: hidden;');
contentWrap.setAttribute('style', 'display:none');

