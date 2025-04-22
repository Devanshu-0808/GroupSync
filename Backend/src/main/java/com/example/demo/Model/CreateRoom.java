package com.example.demo.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Room")
public class CreateRoom {
    
    @Id
    String roomName;
    String joinRoomPassword;
    String roomAdmin;
    public String getRoomName() {
        return roomName;
    }
    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
    public String getJoinRoomPassword() {
        return joinRoomPassword;
    }
    public void setJoinRoomPassword(String joinRoomPassword) {
        this.joinRoomPassword = joinRoomPassword;
    }
    public String getRoomAdmin() {
        return roomAdmin;
    }
    public void setRoomAdmin(String roomAdmin) {
        this.roomAdmin = roomAdmin;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("CreateRoom{");
        sb.append("roomName=").append(roomName);
        sb.append(", joinRoomPassword=").append(joinRoomPassword);
        sb.append(", roomAdmin=").append(roomAdmin);
        sb.append('}');
        return sb.toString();
    }



}
