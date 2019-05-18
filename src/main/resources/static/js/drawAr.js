var host = "http://localhost:8080/randoms/canvas"


let canvas = document.getElementById('drawArea')
let stompClient = null
let room = "/topic/tema." + 10
let roomid = 10
const ctx = canvas.getContext('2d');
var colors = [
  '#2196F3', '#32c787', '#00BCD4', '#ff5652',
  '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

let drawing = false
let avatarCollor = '#000';

let lines = []

function getAvatarColor(messageSender) {
  var hash = 0;
  for (var i = 0; i < messageSender.length; i++) {
    hash = 31 * hash + messageSender.charCodeAt(i);
  }

  var index = Math.abs(hash % colors.length);
  return colors[index];
}

function onMessageReceived(payload) {
  var message = JSON.parse(payload.body);

  var messageElement = document.createElement('li');

  if (message.type === 'JOIN') {
    messageElement.classList.add('event-message');
    message.content = message.sender + ' joined!';
  } else if (message.type === 'LEAVE') {
    messageElement.classList.add('event-message');
    message.content = message.sender + ' left!';
  }
  else if (message.type === 'DRAW') {

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

  const messageArea = document.querySelector(".message-area")
  messageArea.appendChild(messageElement);
  messageArea.scrollTop = messageArea.scrollHeight;
}

var connectAndSubscribe = () => {


  var socket = new SockJS('/gs-guide-websocket');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe(room, onMessageReceived);
    stompClient.send("/app/chat." + roomid + ".addUser",
      {},
      JSON.stringify({ sender: "usuario test", type: 'JOIN' })
    )
  });
}

function sendTextMessage(event) {
  event.preventDefault();
  const messageInput = document.querySelector("#messageInput")
  let messageContent = messageInput.value.trim();

  if (messageContent && stompClient) {
    var chatMessage = {
      sender: "usuario test",
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
      sender: "usuario test",
      content: JSON.stringify(lines),
      type: 'DRAW'
    };

    stompClient.send("/app/chat." + roomid + ".sendMessage", {}, JSON.stringify(chatMessage));
    messageInput.value = '';
  }
}

const drawLines = () => {
  for (let myLine of lines) {
    drawLine(myLine)
  }
}
const drawLine = myLine => {
  console.log("drawline")
  ctx.beginPath();
  if (myLine) {
    let before = myLine[0]
    for (let point of myLine) {
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

const handleMouseUp = e => {
  drawing = false
  sendMessage()
  console.log("mi linea=>", JSON.stringify(lines))
}

const chatForm = document.querySelector("#chat-form")
chatForm.addEventListener("submit", sendTextMessage)

canvas.addEventListener('mousedown', handleMouseDown)
canvas.addEventListener('mousemove', handleMouseMove)
canvas.addEventListener('mouseup', handleMouseUp)

connectAndSubscribe()
drawLines() 