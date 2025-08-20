package com.data.dto;

import com.data.enums.ParkingLotStatus;
import lombok.Data;

import java.util.List;

@Data
public class ParkingLotResponseDTO {
    private Long id;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Integer totalSlots;
    private Integer availableSlots;
    private String description;
    private ParkingLotStatus parkingLotStatus;
    private UserResponseDTO owner;
    private List<PricingResponseDTO> pricings;
    private List<ImageResponseDTO> images;
    private List<ReviewResponseDTO> reviews;
    private String createdAt;
    private String updatedAt;
}