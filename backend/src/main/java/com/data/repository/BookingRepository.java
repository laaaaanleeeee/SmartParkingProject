package com.data.repository;

import com.data.entity.Booking;
import com.data.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Page<Booking> findByUser_Id(Long userId, Pageable pageable);

    List<Booking> findByParkingLot_Id(Long lotId);

    List<Booking> findByBookingStatus(BookingStatus status);

    List<Booking> findByExpireAtBeforeAndBookingStatus(LocalDateTime now, BookingStatus status);

    List<Booking> findByBookingStatusAndExpireAtBefore(BookingStatus status, LocalDateTime now);
}
