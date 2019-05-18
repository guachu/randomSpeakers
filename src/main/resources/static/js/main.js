
'use strict';




var app = (function () {

    //var host = "http://localhost:8080"
    var host = "https://randomspeakers.herokuapp.com/"
    var usernamePage = document.querySelector('#username-page');
    var chatPage = document.querySelector('#chat-page');
    var room = null;
    var roomid = null;
    var usernameForm = document.querySelector('#usernameForm');
    var messageForm = document.querySelector('#messageForm');
    var messageInput = document.querySelector('#message');
    var messageArea = document.querySelector('#messageArea');
    var connectingElement = document.querySelector('.connecting');
    var temaActivo = null;
    var stompClient = null;
    var username = null;
    var contador = 1;
    var imagenConteiner = document.getElementById("imagenes");

    var colors = [
        '#2196F3', '#32c787', '#00BCD4', '#ff5652',
        '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
    ];




    var connectAndSubscribe = function () {
        var contentHeader = document.getElementById("tituloPrincipal");
        var botonOculto = document.getElementById("botonImagen");
        if (roomid == 1){
            contentHeader.innerHTML = 'Carros';
            temaActivo = "/images/carro";
            ChangeImage(temaActivo,imagenConteiner,1);
            botonOculto.classList.remove('hidden');
        }
        else if (roomid == 2){
            contentHeader.innerHTML = 'Motos';
            temaActivo = "/images/moto";
            ChangeImage(temaActivo,imagenConteiner,1);
            botonOculto.classList.remove('hidden');
        }
        else if (roomid == 3){
            contentHeader.innerHTML = 'Aves';
            temaActivo = "/images/ave";
            ChangeImage(temaActivo,imagenConteiner,1);
            botonOculto.classList.remove('hidden');
        }
        else{

        }
        document.getElementById('messageArea').innerHTML = '';
        username = document.querySelector('#name').value.trim();
        if(username) {
            usernamePage.classList.add('hidden');
            chatPage.classList.remove('hidden');
            var socket = new SockJS('/gs-guide-websocket');
            stompClient = Stomp.over(socket);
            // https://github.com/stomp-js/samples/
            //stompClient = Stomp.client('ws:localhost:8080/ws');

            stompClient.connect({}, function (frame) {
                stompClient.subscribe(room, onMessageReceived);
                stompClient.send("/app/chat."+roomid+".addUser",
                    {},
                    JSON.stringify({sender: username, type: 'JOIN'})
                )
            });
            

        }
            event.preventDefault();
            //subscribe to /topic/newpoint when connections succeed
            
        };

    function onConnected() {

        // Subscribe to the Public Topic
        stompClient.subscribe('/topic/public', onMessageReceived);

        // Tell your username to the server
        stompClient.send("/app/chat.addUser",
            {},
            JSON.stringify({sender: username, type: 'JOIN'})
        )

        //connectingElement.classList.add('hidden');
    }


    function ChangeImage(valor,imagenes,numero){
        if(numero == 1){
                var numero = Math.floor(Math.random() * 10);
            while(numero > 4 || numero ==0){
                numero = Math.floor(Math.random() * 10);
            }
            imagenes.src= valor+numero+".jpg";
            contador = numero + 1;
        }
        else{
            if(contador > 4){
                contador = 1;
            }
            imagenes.src= valor+contador+".jpg";
            contador++;
            
        }
        
    }

    function onError(error) {
        connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
        connectingElement.style.color = 'red';
    }


    function sendMessage(event) {
        var messageContent = messageInput.value.trim();

        if(messageContent && stompClient) {
            var chatMessage = {
                sender: username,
                content: messageInput.value,
                type: 'CHAT'
            };

            stompClient.send("/app/chat."+roomid+".sendMessage", {}, JSON.stringify(chatMessage));
            messageInput.value = '';
        }
        event.preventDefault();
    }


    function onMessageReceived(payload) {
        var message = JSON.parse(payload.body);

        var messageElement = document.createElement('li');

        if(message.type === 'JOIN') {
            messageElement.classList.add('event-message');
            message.content = message.sender + ' joined!';
        } else if (message.type === 'LEAVE') {
            messageElement.classList.add('event-message');
            message.content = message.sender + ' left!';
        } else {
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

        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    }




    function getAvatarColor(messageSender) {
        var hash = 0;
        for (var i = 0; i < messageSender.length; i++) {
            hash = 31 * hash + messageSender.charCodeAt(i);
        }

        var index = Math.abs(hash % colors.length);
        return colors[index];
    }




    return {

        init: function (val) {
            if (roomid == null){
                if(val == 0){
                    val ++;
                }
                room = "/topic/tema." + val;  
                roomid = val;
            }
            else{
                if(val != roomid && val != 0){
                    roomid = val;
                    
                }
                room = "/topic/tema." + roomid;  
                
            }
            connectAndSubscribe()
        },
        send: function(){
            sendMessage(event)
        },

        changeImage: function(){
            ChangeImage(temaActivo,imagenConteiner,0);
        }
    };

    

})();



