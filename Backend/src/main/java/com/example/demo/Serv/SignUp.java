package com.example.demo.Serv;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.Model.pojo;
import com.example.demo.Repo.ConnectivityDB;

public class SignUp {
    @Autowired 
    ConnectivityDB d ;




     public void register(String username, String password) {
        pojo c = new pojo();
        c.setUsername(username);
        c.setPassword(password);
        c.setRole("USER");
        d.save(c);
    }



}
