package com.example.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.example.demo.Model.pojo;

@Component
public interface ConnectivityDB extends JpaRepository<pojo , Integer> {      
    pojo findByUsername(String username);
    pojo findByPassword(String password);
}
