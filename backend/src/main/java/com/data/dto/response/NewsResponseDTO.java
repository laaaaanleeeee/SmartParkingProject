package com.data.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NewsResponseDTO {
     Long id;
     String title;
     String content;
     String postedAt;
     UserResponseDTO postedBy;
}
