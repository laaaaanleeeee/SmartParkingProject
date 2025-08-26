package com.data.service;

import com.data.dto.request.BookingRequestDTO;
import com.data.dto.response.BookingResponseDTO;
import com.data.dto.response.PageDTO;
import com.data.entity.*;
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
import java.util.List;

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

    public BookingResponseDTO createBooking(BookingRequestDTO dto, String username) {
        Booking booking = new Booking();

        booking.setStartTime(dto.getStartTime());
        booking.setEndTime(dto.getEndTime());
        booking.setBookingStatus(BookingStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());
        booking.setExpireAt(LocalDateTime.now().plusMinutes(15));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        booking.setUser(user);

        booking.setParkingLot(parkingLotRepository.findById(dto.getParkingLotId())
                .orElseThrow(() -> new RuntimeException("Parking lot not found")));
        booking.setParkingSlot(slotRepository.findById(dto.getParkingSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found")));
        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        booking.setVehicle(vehicle);

        List<Pricing> pricings = pricingRepository.findByParkingLot_IdAndVehicleType(
                dto.getParkingLotId(),
                vehicle.getVehicleType()
        );

        if (pricings.isEmpty()) {
            throw new RuntimeException("No pricing found for this vehicle type in the selected lot");
        }

        Pricing pricing = pricings.stream()
                .filter(p -> (p.getStartTime() == null || !dto.getStartTime().isBefore(p.getStartTime())))
                .filter(p -> (p.getEndTime() == null || !dto.getEndTime().isAfter(p.getEndTime())))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No valid pricing for this time range"));

        booking.setPricing(pricing);

        long hours = ChronoUnit.HOURS.between(dto.getStartTime(), dto.getEndTime());
        if (hours <= 0) throw new IllegalArgumentException("End time must be after start time");

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


    public void expirePendingBookings() {
        List<Booking> pendingBookings = bookingRepository.findByBookingStatus(BookingStatus.PENDING);
        LocalDateTime now = LocalDateTime.now();

        for (Booking booking : pendingBookings) {
            if (booking.getExpireAt() != null && booking.getExpireAt().isBefore(now)) {
                booking.setBookingStatus(BookingStatus.CANCELLED);
                booking.setCancelledAt(now);
                booking.setCancellationReason("Expired pending booking");
                bookingRepository.save(booking);
            }
        }
    }

    public BookingResponseDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return new BookingResponseDTO(booking);
    }

    public PageDTO<BookingResponseDTO> getBookingsByUser(String username, Pageable pageable) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Page<Booking> bookings = bookingRepository.findByUser_Id(user.getId(), pageable);
        return PageDTO.of(bookings.map(BookingResponseDTO::new));
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

    public BookingResponseDTO confirmBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (booking.getBookingStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Booking is not in pending state");
        }
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        booking.setUpdatedAt(LocalDateTime.now());
        return new BookingResponseDTO(bookingRepository.save(booking));
    }

    public BookingResponseDTO completeBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (booking.getBookingStatus() != BookingStatus.CONFIRMED) {
            throw new RuntimeException("Booking is not confirmed");
        }
        booking.setBookingStatus(BookingStatus.COMPLETED);
        booking.setUpdatedAt(LocalDateTime.now());
        return new BookingResponseDTO(bookingRepository.save(booking));
    }

}
