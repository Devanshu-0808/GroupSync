package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.example.demo.Model.CreateRoom;

@Component
public interface  createRoomConnect extends JpaRepository<CreateRoom, String> {
         
    CreateRoom findByRoomName(String roomName);
    CreateRoom findByJoinRoomPassword(String roomPassword);
    CreateRoom findByRoomAdmin(String roomAdmin);


}
