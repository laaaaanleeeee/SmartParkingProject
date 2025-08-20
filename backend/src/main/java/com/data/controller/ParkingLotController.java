package com.data.controller;

import com.data.dto.ParkingLotResponseDTO;
import com.data.service.ParkingLotService;
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
@RequestMapping("/api/parking-lots")
@CrossOrigin(origins = "http://localhost:5173")
public class ParkingLotController {
    ParkingLotService parkingLotService;

    @GetMapping
    public ResponseEntity<List<ParkingLotResponseDTO>> getAllParkingLots() {
        List<ParkingLotResponseDTO> parkingLots = parkingLotService.getAllParkingLots();
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