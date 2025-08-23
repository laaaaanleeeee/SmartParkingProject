package com.data.repository;

import com.data.entity.Booking;
import com.data.enums.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Page<Booking> findByUserId(Long userId, Pageable pageable);

    Page<Booking> findByBookingStatus(BookingStatus bookingStatus, Pageable pageable);

    @Query("select b from Booking b where b.startTime >= :start and b.endTime <= :end")
    Page<Booking> findByDateRange(@Param("start") LocalDateTime start,
                                  @Param("end") LocalDateTime end,
                                  Pageable pageable);

    Page<Booking> findByParkingLotId(Long parkingLotId, Pageable pageable);

    List<Booking> findByParkingSlotId(Long slotId);
}