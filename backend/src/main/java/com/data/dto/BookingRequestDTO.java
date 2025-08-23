package com.data.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingRequestDTO {
    LocalDateTime startTime;
    LocalDateTime endTime;
    Double totalPrice;
    Long userId;
    Long parkingLotId;
    Long parkingSlotId;
    Long vehicleId;
    Long pricingId;
    Long voucherId;
}
