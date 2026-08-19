package com.bezkoder.spring.jpa.h2.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.spring.jpa.h2.model.Order;
import com.bezkoder.spring.jpa.h2.repository.OrderRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

  private final OrderRepository orderRepository;

  public OrderController(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  @GetMapping
  public ResponseEntity<List<Order>> getAllOrders(
      @RequestParam(required = false, defaultValue = "") String customerName) {
    List<Order> orders = customerName.isBlank()
        ? orderRepository.findAll()
        : orderRepository.findByCustomerNameContainingIgnoreCase(customerName);

    return ResponseEntity.ok(orders);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
    Optional<Order> order = orderRepository.findById(id);
    return order.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Order> createOrder(@RequestBody Order order) {
    Order savedOrder = orderRepository.save(order);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order request) {
    return orderRepository.findById(id)
        .map(order -> {
          order.setCustomerName(request.getCustomerName());
          order.setProduct(request.getProduct());
          order.setQuantity(request.getQuantity());
          order.setTotalAmount(request.getTotalAmount());
          order.setStatus(request.getStatus());
          return ResponseEntity.ok(orderRepository.save(order));
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
    if (!orderRepository.existsById(id)) {
      return ResponseEntity.notFound().build();
    }

    orderRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
