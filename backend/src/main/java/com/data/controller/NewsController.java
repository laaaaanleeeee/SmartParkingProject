package com.data.controller;

import com.data.dto.request.NewsRequestDTO;
import com.data.dto.response.NewsResponseDTO;
import com.data.dto.response.PageDTO;
import com.data.service.NewsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<PageDTO<NewsResponseDTO>> getAllNews(
            Pageable pageable,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String poster
    ) {
        return ResponseEntity.ok(newsService.searchNews(pageable, title, poster));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsResponseDTO> getNewsById(@PathVariable Long id) {
        NewsResponseDTO news = newsService.getNewsById(id);
        if (news != null) {
            return new ResponseEntity<>(news, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/admin/create-news")
    public ResponseEntity<NewsResponseDTO> createNews(@RequestBody NewsRequestDTO request) {
        return ResponseEntity.ok(newsService.createNews(request));
    }

    @PutMapping("/admin/update-news/{id}")
    public ResponseEntity<NewsResponseDTO> updateNews(
            @PathVariable Long id,
            @RequestBody NewsRequestDTO request
    ) {
        return ResponseEntity.ok(newsService.updateNews(id, request));
    }

    @DeleteMapping("/admin/delete-news/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }
}