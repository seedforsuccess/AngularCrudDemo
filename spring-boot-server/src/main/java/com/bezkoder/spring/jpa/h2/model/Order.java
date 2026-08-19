package com.bezkoder.spring.jpa.h2.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String customerName;

  @Column(nullable = false)
  private String product;

  @Column(nullable = false)
  private Integer quantity;

  @Column(nullable = false)
  private Double totalAmount;

  @Column(nullable = false)
  private String status;

  public Order() {
  }

  public Order(String customerName, String product, Integer quantity, Double totalAmount, String status) {
    this.customerName = customerName;
    this.product = product;
    this.quantity = quantity;
    this.totalAmount = totalAmount;
    this.status = status;
  }

  public Long getId() {
    return id;
  }

  public String getCustomerName() {
    return customerName;
  }

  public void setCustomerName(String customerName) {
    this.customerName = customerName;
  }

  public String getProduct() {
    return product;
  }

  public void setProduct(String product) {
    this.product = product;
  }

  public Integer getQuantity() {
    return quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public Double getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(Double totalAmount) {
    this.totalAmount = totalAmount;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
