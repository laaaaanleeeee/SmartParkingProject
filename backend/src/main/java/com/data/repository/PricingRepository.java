package com.data.repository;

import com.data.entity.Pricing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PricingRepository extends JpaRepository<Pricing, Long> {
    Optional<Pricing> findByParkingLot_Id(Long parkingLotId);
}
