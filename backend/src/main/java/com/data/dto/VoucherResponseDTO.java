package com.data.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VoucherResponseDTO {
    Long id;
    String code;
    Double discount;
    String expiryDate;
}