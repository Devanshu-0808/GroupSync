package com.example.demo.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.GrpId;

public interface WebSocketDB extends JpaRepository<GrpId, String> {

    List<GrpId> findByGroupId(String groupId);
    GrpId findByUsername(String username);
  int deleteBySocketId(String socketId);
  GrpId findByUsernameAndGroupId(String username, String groupId); // Update method to find by username and groupId
  List<GrpId> findAllByGroupId(String groupId);
} 
