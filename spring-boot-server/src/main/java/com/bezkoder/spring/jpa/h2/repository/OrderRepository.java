package com.bezkoder.spring.jpa.h2.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bezkoder.spring.jpa.h2.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByCustomerNameContainingIgnoreCase(String customerName);
}
