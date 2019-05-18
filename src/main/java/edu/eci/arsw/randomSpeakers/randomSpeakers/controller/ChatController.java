package edu.eci.arsw.randomSpeakers.randomSpeakers.controller;

import edu.eci.arsw.randomSpeakers.randomSpeakers.model.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.messaging.simp.SimpMessagingTemplate;

/**
 *
 * @author aleja
 */

@Service
@RestController
@CrossOrigin(origins = "*")
public class ChatController {
    
    @Autowired
    SimpMessagingTemplate simp;

    @MessageMapping("/chat.{id}.sendMessage")
    public void sendMessage(@Payload ChatMessage chatMessage,
            @DestinationVariable String id) {
        simp.convertAndSend("/topic/tema." + id,chatMessage);
    }

    @MessageMapping("/chat.{id}.addUser")
    
    public void addUser(@Payload ChatMessage chatMessage, 
                               SimpMessageHeaderAccessor headerAccessor,
                               @DestinationVariable String id) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        simp.convertAndSend("/topic/tema." + id,chatMessage);
//        return chatMessage;
    }

}