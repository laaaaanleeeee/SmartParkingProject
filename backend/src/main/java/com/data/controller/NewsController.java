package com.data.controller;

import com.data.dto.NewsResponseDTO;
import com.data.service.NewsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:5173")
public class NewsController {
    NewsService newsService;

    @GetMapping
    public ResponseEntity<List<NewsResponseDTO>> getAllNews() {
        List<NewsResponseDTO> news = newsService.getAllNews();
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsResponseDTO> getNewsById(@PathVariable Long id) {
        NewsResponseDTO news = newsService.getNewsById(id);
        if (news != null) {
            return new ResponseEntity<>(news, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}