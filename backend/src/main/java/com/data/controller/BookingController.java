package com.data.controller;

import com.data.dto.BookingRequestDTO;
import com.data.dto.BookingResponseDTO;
import com.data.dto.PageDTO;
import com.data.enums.BookingStatus;
import com.data.service.BookingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingController {
    BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(
            @RequestBody BookingRequestDTO dto,
            Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(bookingService.createBooking(dto, username));
    }

    @GetMapping("/me")
    public ResponseEntity<PageDTO<BookingResponseDTO>> getMyBookings(
            Pageable pageable,
            Authentication authentication) {
        String username = authentication.getName();
        Long userId = bookingService.getUserIdByUsername(username);
        return ResponseEntity.ok(bookingService.getBookingsByUser(userId, pageable));
    }

    @GetMapping("/lot/{lotId}")
    public ResponseEntity<PageDTO<BookingResponseDTO>> getBookingsByLot(
            @PathVariable Long lotId, Pageable pageable) {
        return ResponseEntity.ok(bookingService.getBookingsByParkingLot(lotId, pageable));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<PageDTO<BookingResponseDTO>> getBookingsByStatus(
            @PathVariable BookingStatus status, Pageable pageable) {
        return ResponseEntity.ok(bookingService.getBookingsByStatus(status, pageable));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingResponseDTO> cancelBooking(
            @PathVariable Long id,
            @RequestParam String reason) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, reason));
    }
}