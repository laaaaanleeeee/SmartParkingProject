package com.data.dto;

import com.data.entity.Booking;
import com.data.enums.BookingStatus;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingResponseDTO {
    Long id;
    String startTime;
    String endTime;
    Double totalPrice;
    BookingStatus bookingStatus;

    public BookingResponseDTO(Booking booking) {
        this.id = booking.getId();
        this.startTime = booking.getStartTime().toString();
        this.endTime = booking.getEndTime().toString();
        this.totalPrice = booking.getTotalPrice();
        this.bookingStatus = booking.getBookingStatus();
    }
}
