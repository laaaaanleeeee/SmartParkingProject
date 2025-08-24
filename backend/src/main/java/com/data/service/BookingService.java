package com.data.service;

import com.data.dto.BookingRequestDTO;
import com.data.dto.BookingResponseDTO;
import com.data.dto.PageDTO;
import com.data.entity.Booking;
import com.data.entity.Pricing;
import com.data.entity.User;
import com.data.entity.Voucher;
import com.data.enums.BookingStatus;
import com.data.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingService {
    BookingRepository bookingRepository;
    UserRepository userRepository;
    ParkingLotRepository parkingLotRepository;
    SlotRepository slotRepository;
    VehicleRepository vehicleRepository;
    PricingRepository pricingRepository;
    VoucherRepository voucherRepository;

    public BookingResponseDTO createBooking(BookingRequestDTO dto, String usernameFromJwt) {
        Booking booking = new Booking();

        booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());
        booking.setBookingStatus(BookingStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());

        User user = userRepository.findByUsername(usernameFromJwt)
                .orElseThrow(() -> new RuntimeException("User not found"));
        booking.setUser(user);

        booking.setParkingLot(parkingLotRepository.findById(dto.getParkingLotId())
                .orElseThrow(() -> new RuntimeException("Parking lot not found")));
        booking.setParkingSlot(slotRepository.findById(dto.getParkingSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found")));
        booking.setVehicle(vehicleRepository.findById(dto.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found")));

        Pricing pricing = pricingRepository.findByParkingLot_Id(dto.getParkingLotId())
                .orElseThrow(() -> new RuntimeException("Pricing not found"));
        booking.setPricing(pricing);

        long hours = ChronoUnit.HOURS.between(dto.getStartTime(), dto.getEndTime());
        if (hours <= 0) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        double totalPrice = hours * pricing.getPricePerHour();

        if (dto.getVoucherId() != null) {
            Voucher voucher = voucherRepository.findById(dto.getVoucherId())
                    .orElseThrow(() -> new RuntimeException("Voucher not found"));
            booking.setVoucher(voucher);
            totalPrice -= totalPrice * voucher.getDiscount() / 100.0;
        }

        booking.setTotalPrice(totalPrice);

        return new BookingResponseDTO(bookingRepository.save(booking));
    }

    public PageDTO<BookingResponseDTO> getBookingsByUser(Long userId, Pageable pageable) {
        Page<Booking> bookings = bookingRepository.findByUser_Id(userId, pageable);
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

    public PageDTO<BookingResponseDTO> getBookingsByParkingLot(Long lotId, Pageable pageable) {
        Page<Booking> bookings = bookingRepository.findByParkingLot_Id(lotId, pageable);
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

    public PageDTO<BookingResponseDTO> getBookingsByStatus(BookingStatus status, Pageable pageable) {
        Page<Booking> bookings = bookingRepository.findByBookingStatus(status, pageable);
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

    public BookingResponseDTO cancelBooking(Long id, String reason) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setBookingStatus(BookingStatus.CANCELLED);
        booking.setCancelledAt(LocalDateTime.now());
        booking.setCancellationReason(reason);
        booking.setUpdatedAt(LocalDateTime.now());
        return new BookingResponseDTO(bookingRepository.save(booking));
    }

    public Long getUserIdByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }
}
