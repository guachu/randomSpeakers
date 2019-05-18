//var host = "http://localhost:8080/randoms/"
var host = "https://randomspeakers.herokuapp.com/"

let canvas = document.getElementById('drawArea')
let stompClient = null
let roomid = 10
let roomName = ""
const ctx = canvas.getContext('2d');
var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];



let currentUser = {}
let drawing = false
let avatarCollor = '#000'

let lines = []

let others = {}

function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}

const paintDraw = message => {
    let content = JSON.parse(message.content)
    others[message.sender] = {
        color: content.color,
        lines: content.lines
    }
    drawOthers()
}

const addChatMessage = message => {
    var messageElement = document.createElement('li');
    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    }
    else {

        console.log("message receved :)")
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    const messageArea = document.querySelector("#scroll")
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    if (message.type === 'DRAW') {
        paintDraw(message)
    }
    else {
        addChatMessage(message)
    }
}

var connectAndSubscribe = (roomid = 20) => {

    let room = `/topic/tema.${roomid}`
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe(room, onMessageReceived);
        stompClient.send("/app/chat." + roomid + ".addUser",
            {},
            JSON.stringify({ sender: currentUser.nickName, type: 'JOIN' })
        )
    });
}

const logout = () => {
    console.log("logout")

    firebase.auth().signOut()
}

var unSuscribe = () => {
    stompClient.disconnect(function () {
        console.log("disconected")
    })
}

firebase.auth().onAuthStateChanged(
    user => {
        console.log("from changed", user)
        statusEffects(user)
    }
)

const setLoggedElements = (user) => {
    const { email, uid } = user
    let nickName = email.split('@')[0]
    userName.innerHTML = nickName
    let color = getAvatarColor(nickName)

    currentUser = {
        nickName,
        uid,
        color
    }

}

const setLogoutElements = () => {
    console.log("logout redirect")
    window.location.replace("login.html")
}

const statusEffects = user => {
    console.log(user)
    if (user) {
        setLoggedElements(user)
    }
    else {
        setLogoutElements()
    }
}
const btnLogout = document.querySelector("#btnLogout")
btnLogout.addEventListener("click", logout)


function sendTextMessage(event) {
    event.preventDefault();
    const messageInput = document.querySelector("#messageInput")
    let messageContent = messageInput.value.trim();

    if (messageContent && stompClient) {
        var chatMessage = {
            sender: currentUser.nickName,
            content: messageInput.value,
            type: 'CHAT'
        };

        stompClient.send("/app/chat." + roomid + ".sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
}


function sendMessage() {

    console.log("enviando mensaje...")

    if (stompClient) {
        var chatMessage = {
            sender: currentUser.uid,
            content: JSON.stringify({ lines, color: currentUser.color }),
            type: 'DRAW'
        };

        stompClient.send("/app/chat." + roomid + ".sendMessage", {}, JSON.stringify(chatMessage));
    }
}

const drawLines = () => {
    for (let myLine of lines) {
        drawLine(myLine, currentUser.color)
    }
}

const drawOthers = () => {
    const result = Object.entries(others)
    result.map(([user, draw]) => {
        for (let line of draw.lines) {
            drawLine(line, draw.color)
        }
    })
}


const drawLine = (myLine, color) => {
    console.log("drawline")
    ctx.beginPath();
    if (myLine) {
        let before = myLine[0]
        for (let point of myLine) {
            ctx.strokeStyle = color;
            ctx.moveTo(before.x, before.y);
            ctx.lineTo(point.x, point.y);
            before = point
        }
    }
    ctx.stroke();
}

const getPoint = (e) => {

    const localX = currX = e.clientX - canvas.offsetLeft;
    const localY = currY = e.clientY - canvas.offsetTop;
    return {
        x: localX,
        y: localY
    }
}

const handleMouseDown = e => {
    drawing = true
    let point = getPoint(e)
    lines.push([point])
}

const handleMouseMove = e => {
    let line = lines[lines.length - 1]
    if (drawing) {
        let point = getPoint(e)
        line.push(point)
    }
    drawLines()
}

function drawErase() {
    let w = canvas.width;
    let h = canvas.height;
    ctx.clearRect(0, 0, w, h);
}

const saveDraw = async () => {
    if (roomName && currentUser.nickName) {

        let path = `Room/${roomName}/Draws/${currentUser.nickName}/`

        firebase
            .database()
            .ref(path)
            .set(
                {
                    color: currentUser.color,
                    lines
                }
            );
    }
}

const handleMouseUp = async e => {
    drawing = false
    saveDraw()
    sendMessage()
}

const chatForm = document.querySelector("#chat-form")
chatForm.addEventListener("submit", sendTextMessage)

canvas.addEventListener('mousedown', handleMouseDown)
canvas.addEventListener('mousemove', handleMouseMove)
canvas.addEventListener('mouseup', handleMouseUp)
drawLines()