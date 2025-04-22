package com.example.demo.Repo;

import org.springframework.stereotype.Component;

@Component
public class YoutubeUrl {
    String youtubeUrl;

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public void setYoutubeUrl(String youtubeUrl) {
        this.youtubeUrl = youtubeUrl;
    }
}
