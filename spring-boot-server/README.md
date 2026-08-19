# Spring Boot Order and Tutorial API

This server provides REST APIs for the Angular 17 client using Spring Boot, Spring Data JPA, Hibernate, and an H2 database.

## Features

- Tutorial CRUD and title search.
- Order CRUD and customer-name search.
- JPA entities and repositories.
- REST controllers with appropriate HTTP status codes.
- Cross-origin access for the Angular development server.

## Order API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/orders` | Retrieve all orders |
| `GET` | `/api/orders?customerName=Priya` | Search orders |
| `GET` | `/api/orders/{id}` | Retrieve one order |
| `POST` | `/api/orders` | Create an order |
| `PUT` | `/api/orders/{id}` | Update an order |
| `DELETE` | `/api/orders/{id}` | Delete an order |

## Backend Architecture

```text
OrderController
└── OrderRepository
	└── Order entity -> H2 database
```

- `model/Order.java`: customer, product, quantity, total amount, and status.
- `repository/OrderRepository.java`: JPA persistence and customer search.
- `controller/OrderController.java`: request mapping and CRUD operations.

## Run

```bash
mvn spring-boot:run
```

The API runs at `http://localhost:8080` by default. Check `src/main/resources/application.properties` if the port or database settings differ.

## Build and Test

```bash
mvnw.cmd clean package -DskipTests
mvnw.cmd test
```

The test suite requires exclusive access to the configured H2 database file. Stop other server instances before running integration tests.

