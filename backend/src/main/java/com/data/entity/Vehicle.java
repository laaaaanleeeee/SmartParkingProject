package com.data.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vehicles")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "license_plate", nullable = false, unique = true, length = 100)
    String licensePlate;

    @Column(name = "entry_time", nullable = false)
    LocalDateTime entryTime;

    @Column(name = "exit_time")
    LocalDateTime exitTime;

    @ManyToOne
    @JoinColumn(name = "parking_slot_id")
    Slot slot;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @OneToMany(mappedBy = "vehicle")
    List<Image> images;
}
