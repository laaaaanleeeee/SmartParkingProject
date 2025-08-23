package com.data.controller;

import com.data.dto.PageDTO;
import com.data.dto.ParkingLotResponseDTO;
import com.data.service.ParkingLotService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/parking-lots")
@CrossOrigin(origins = "http://localhost:5173")
public class ParkingLotController {
    ParkingLotService parkingLotService;

    @GetMapping
    public ResponseEntity<PageDTO<ParkingLotResponseDTO>> getAllParkingLots(@RequestParam(required = false) String name,
                                                                            @RequestParam(required = false) String city,
                                                                            @RequestParam(required = false) String ward,
                                                                            @RequestParam(required = false) Double minPrice,
                                                                            @RequestParam(required = false) Double maxPrice,
                                                                            @RequestParam(required = false) Double minRating,
                                                                            @RequestParam(required = false) Integer minSlots,
                                                                            @PageableDefault(size = 10, sort = "id") Pageable pageable) {
        PageDTO<ParkingLotResponseDTO> parkingLots = parkingLotService.getAllParkingLots(
                name, city, ward, minPrice, maxPrice, minRating, minSlots, pageable);
        return new ResponseEntity<>(parkingLots, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParkingLotResponseDTO> getParkingLotById(@PathVariable Long id) {
        ParkingLotResponseDTO parkingLot = parkingLotService.getParkingLotById(id);
        if (parkingLot != null) {
            return new ResponseEntity<>(parkingLot, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}