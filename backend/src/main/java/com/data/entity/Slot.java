package com.data.entity;

import com.data.enums.SlotStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "parking_slots", uniqueConstraints = @UniqueConstraint(columnNames = {"slot_number", "parking_lot_id"}))
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, name = "slot_number", length = 50)
    String slotNumber;

    @Enumerated(EnumType.STRING)
    SlotStatus slotStatus;

    @ManyToOne
    @JoinColumn(name = "parking_lot_id", nullable = false)
    ParkingLot parkingLot;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    Vehicle vehicle;
}
