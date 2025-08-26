package com.data.service;

import com.data.dto.response.*;
import com.data.entity.Image;
import com.data.entity.ParkingLot;
import com.data.entity.Pricing;
import com.data.entity.Review;
import com.data.repository.ParkingLotRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ParkingLotService {
    ParkingLotRepository parkingLotRepository;


    public PageDTO<ParkingLotResponseDTO> getAllParkingLots(
            String name, String city, String ward, Double minPrice, Double maxPrice, Double minRating, Integer minSlots, Pageable pageable) {
        Page<ParkingLot> parkingLots;
        if (name == null && city == null && ward == null && minPrice == null && maxPrice == null && minRating == null && minSlots == null) {
            parkingLots = parkingLotRepository.findAll(pageable);
        }
        else if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
            throw new IllegalArgumentException("minPrice must be less than or equal to maxPrice");
        }
        else {
            parkingLots = parkingLotRepository.findByFilters(name, city, ward, minPrice, maxPrice, minRating, minSlots, pageable);
        }
        PageDTO<ParkingLotResponseDTO> pageDTO = new PageDTO<>();
        pageDTO.setListDTO(parkingLots.map(this::convertToDTO).getContent());
        pageDTO.setPage(parkingLots.getNumber());
        pageDTO.setTotalPage(parkingLots.getTotalPages());
        pageDTO.setSize(parkingLots.getSize());
        pageDTO.setNumElement(parkingLots.getNumberOfElements());
        pageDTO.setTotalElement(parkingLots.getTotalElements());
        pageDTO.setFirst(parkingLots.isFirst());
        pageDTO.setLast(parkingLots.isLast());

        return pageDTO;
    }

    public ParkingLotResponseDTO getParkingLotById(Long id) {
        return parkingLotRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public ParkingLotResponseDTO convertToDTO(ParkingLot parkingLot) {
        ParkingLotResponseDTO dto = new ParkingLotResponseDTO();
        dto.setId(parkingLot.getId());
        dto.setName(parkingLot.getName());
        dto.setAddress(parkingLot.getAddress());
        dto.setCity(parkingLot.getCity());
        dto.setWard(parkingLot.getWard());
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