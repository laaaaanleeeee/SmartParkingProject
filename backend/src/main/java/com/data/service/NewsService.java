package com.data.service;

import com.data.dto.response.NewsResponseDTO;
import com.data.dto.response.UserResponseDTO;
import com.data.entity.News;
import com.data.repository.NewsRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NewsService {
    NewsRepository newsRepository;

    public List<NewsResponseDTO> getAllNews() {
        List<News> newsList = newsRepository.findAll();
        List<NewsResponseDTO> result = new ArrayList<>();
        for (News news : newsList) {
            result.add(convertToDTO(news));
        }
        return result;
    }

    public NewsResponseDTO getNewsById(Long id) {
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isPresent()) {
            return convertToDTO(optionalNews.get());
        }
        return null;
    }

    private NewsResponseDTO convertToDTO(News news) {
        NewsResponseDTO dto = new NewsResponseDTO();
        dto.setId(news.getId());
        dto.setTitle(news.getTitle());
        dto.setContent(news.getContent());
        dto.setPostedAt(news.getPostedAt().toString());
        dto.setPostedBy(new UserResponseDTO(news.getPostedBy()));
        return dto;
    }
}