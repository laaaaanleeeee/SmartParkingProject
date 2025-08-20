package com.data.service;

import com.data.dto.ImageResponseDTO;
import com.data.dto.ParkingLotResponseDTO;
import com.data.dto.PricingResponseDTO;
import com.data.dto.ReviewResponseDTO;
import com.data.dto.UserResponseDTO;
import com.data.entity.Image;
import com.data.entity.ParkingLot;
import com.data.entity.Pricing;
import com.data.entity.Review;
import com.data.repository.ParkingLotRepository;
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
public class ParkingLotService {
    ParkingLotRepository parkingLotRepository;

    public List<ParkingLotResponseDTO> getAllParkingLots() {
        List<ParkingLot> parkingLots = parkingLotRepository.findAll();
        List<ParkingLotResponseDTO> result = new ArrayList<>();
        for (ParkingLot parkingLot : parkingLots) {
            result.add(convertToDTO(parkingLot));
        }
        return result;
    }

    public ParkingLotResponseDTO getParkingLotById(Long id) {
        Optional<ParkingLot> optionalParkingLot = parkingLotRepository.findById(id);
        if (optionalParkingLot.isPresent()) {
            return convertToDTO(optionalParkingLot.get());
        }
        return null;
    }

    private ParkingLotResponseDTO convertToDTO(ParkingLot parkingLot) {
        ParkingLotResponseDTO dto = new ParkingLotResponseDTO();
        dto.setId(parkingLot.getId());
        dto.setName(parkingLot.getName());
        dto.setAddress(parkingLot.getAddress());
        dto.setLatitude(parkingLot.getLatitude());
        dto.setLongitude(parkingLot.getLongitude());
        dto.setTotalSlots(parkingLot.getTotalSlots());
        dto.setAvailableSlots(parkingLot.getAvailableSlots());
        dto.setDescription(parkingLot.getDescription());
        dto.setParkingLotStatus(parkingLot.getParkingLotStatus());
        dto.setOwner(new UserResponseDTO(parkingLot.getOwner()));
        dto.setPricings(convertToPricingDTOs(parkingLot.getPricings()));
        dto.setImages(convertToImageDTOs(parkingLot.getImages()));
        dto.setReviews(convertToReviewDTOs(parkingLot.getReviews()));
        dto.setCreatedAt(parkingLot.getCreatedAt().toString());
        dto.setUpdatedAt(parkingLot.getUpdatedAt() != null ? parkingLot.getUpdatedAt().toString() : null);
        return dto;
    }

    private List<PricingResponseDTO> convertToPricingDTOs(List<Pricing> pricings) {
        List<PricingResponseDTO> result = new ArrayList<>();
        for (Pricing pricing : pricings) {
            PricingResponseDTO dto = new PricingResponseDTO();
            dto.setId(pricing.getId());
            dto.setVehicleType(pricing.getVehicleType());
            dto.setPricePerHour(pricing.getPricePerHour());
            dto.setStartTime(pricing.getStartTime() != null ? pricing.getStartTime().toString() : null);
            dto.setEndTime(pricing.getEndTime() != null ? pricing.getEndTime().toString() : null);
            result.add(dto);
        }
        return result;
    }

    private List<ImageResponseDTO> convertToImageDTOs(List<Image> images) {
        List<ImageResponseDTO> result = new ArrayList<>();
        for (Image image : images) {
            ImageResponseDTO dto = new ImageResponseDTO();
            dto.setId(image.getId());
            dto.setUrl(image.getUrl());
            dto.setUploadedAt(image.getUploadedAt().toString());
            result.add(dto);
        }
        return result;
    }

    private List<ReviewResponseDTO> convertToReviewDTOs(List<Review> reviews) {
        List<ReviewResponseDTO> result = new ArrayList<>();
        for (Review review : reviews) {
            ReviewResponseDTO dto = new ReviewResponseDTO();
            dto.setId(review.getId());
            dto.setUser(new UserResponseDTO(review.getUser()));
            dto.setRating(review.getRating());
            dto.setComment(review.getComment());
            dto.setCreatedAt(review.getCreatedAt().toString());
            result.add(dto);
        }
        return result;
    }
}