package com.data.dto;

import com.data.enums.VehicleType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VehicleResponseDTO {
    Long id;
    String licensePlate;
    VehicleType vehicleType;
}