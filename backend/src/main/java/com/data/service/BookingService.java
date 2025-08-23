package com.data.service;

import com.data.dto.BookingRequestDTO;
import com.data.dto.BookingResponseDTO;
import com.data.dto.PageDTO;
import com.data.entity.Booking;
import com.data.enums.BookingStatus;
import com.data.repository.BookingRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingService {
    BookingRepository bookingRepository;

    public BookingResponseDTO createBooking(BookingRequestDTO bookingRequestDTO) {
        Booking booking = new Booking();
        booking.setStartTime(bookingRequestDTO.getStartTime());
        booking.setEndTime(bookingRequestDTO.getEndTime());
        booking.setTotalPrice(bookingRequestDTO.getTotalPrice());
        booking.setBookingStatus(BookingStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());

        return new BookingResponseDTO(bookingRepository.save(booking));
    }

    public BookingResponseDTO getBookingById(Long id) {
        return bookingRepository.findById(id)
                .map(BookingResponseDTO::new)
                .orElse(null);
    }

    public PageDTO<BookingResponseDTO> getAllBookings(Pageable pageable) {
        Page<Booking> bookings = bookingRepository.findAll(pageable);

        PageDTO<BookingResponseDTO> pageDTO = new PageDTO<>();
        pageDTO.setListDTO(bookings.map(BookingResponseDTO::new).getContent());
        pageDTO.setPage(bookings.getNumber());
        pageDTO.setTotalPage(bookings.getTotalPages());
        pageDTO.setSize(bookings.getSize());
        pageDTO.setNumElement(bookings.getNumberOfElements());
        pageDTO.setTotalElement(bookings.getTotalElements());
        pageDTO.setFirst(bookings.isFirst());
        pageDTO.setLast(bookings.isLast());

        return pageDTO;
    }


    public Page<BookingResponseDTO> getBookingsByUser(Long userId, Pageable pageable) {
        return bookingRepository.findByUserId(userId, pageable).map(BookingResponseDTO::new);
    }

    public Page<BookingResponseDTO> getBookingsByStatus(BookingStatus status, Pageable pageable) {
        return bookingRepository.findByBookingStatus(status, pageable).map(BookingResponseDTO::new);
    }

    public void cancelBooking(Long id, String reason) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setBookingStatus(BookingStatus.CANCELLED);
        booking.setCancelledAt(LocalDateTime.now());
        booking.setCancellationReason(reason);
        bookingRepository.save(booking);
    }
}
