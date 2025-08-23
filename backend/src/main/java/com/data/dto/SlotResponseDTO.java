package com.data.dto;

import com.data.enums.SlotStatus;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SlotResponseDTO {
    Long id;
    String slotNumber;
    SlotStatus slotStatus;
}