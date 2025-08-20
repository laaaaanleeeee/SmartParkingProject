package com.data.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponseDTO {
     Long id;
     UserResponseDTO user;
     Integer rating;
     String comment;
     String createdAt;
}