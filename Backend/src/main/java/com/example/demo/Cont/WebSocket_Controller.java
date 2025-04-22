package com.example.demo.Cont;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.example.demo.Model.GrpId;
import com.example.demo.Repo.WebSocketDB;
import org.springframework.transaction.annotation.Transactional;

@Controller
public class WebSocket_Controller {

@Autowired
WebSocketDB connectionDb;

    
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
       
       
    }

    @EventListener
    @Transactional
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
       
}
}