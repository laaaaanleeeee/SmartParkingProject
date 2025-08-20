package com.data.dto;

import com.data.enums.VehicleType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PricingResponseDTO {
     Long id;
     VehicleType vehicleType;
     Double pricePerHour;
     String startTime;
     String endTime;
}
