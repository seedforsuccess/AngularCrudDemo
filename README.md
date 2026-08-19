# Angular 17 + Spring Boot CRUD Workspace

This repository contains a full-stack Angular 17 and Spring Boot application for learning CRUD operations, reactive forms, RxJS, component communication, and end-to-end API flow.

## Features

### Tutorial CRUD

- Create, retrieve, update, and delete tutorials.
- Search tutorials by title.
- Manage title, description, and published status.
- Use Angular reactive forms with validation.

### Order CRUD

The Order workspace is available at `/orders` and displays multiple Angular components on one screen:

- Create, read, update, and delete orders.
- Search orders by customer name.
- Manage customer, product, quantity, total amount, and status.
- Use reactive `FormGroup`, `FormControl`, and validators.
- Use RxJS `BehaviorSubject`, `Subject`, `debounceTime`, `distinctUntilChanged`, `switchMap`, and `shareReplay`.

## Order Component Architecture

```text
AppComponent
└── router-outlet
	└── OrdersPageComponent (parent, /orders)
		├── OrderSearchComponent (sibling child)
		├── OrderListComponent (sibling child)
		│   └── @Input() orders
		│   └── @Output() orderSelected
		└── OrderFormComponent (sibling child)
			└── @Input() selectedOrder

OrderStoreService
└── Shared RxJS state and sibling coordination
	└── OrderService -> Spring Boot OrderController
		└── OrderRepository -> H2 database
```

### Communication Flow

- Parent-to-child: `OrdersPageComponent` passes `orders` and `selectedOrder` with `@Input()`.
- Child-to-parent: `OrderListComponent` emits `orderSelected` with `@Output()`.
- Sibling-to-sibling: Search, list, and form communicate through `OrderStoreService`.
- Backend communication: `OrderService` uses `HttpClient` to call the Spring Boot REST API.

## Order REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/orders` | Retrieve all orders |
| `GET` | `/api/orders?customerName=Priya` | Search by customer name |
| `GET` | `/api/orders/{id}` | Retrieve one order |
| `POST` | `/api/orders` | Create an order |
| `PUT` | `/api/orders/{id}` | Update an order |
| `DELETE` | `/api/orders/{id}` | Delete an order |

## Main Project Areas

### Angular client

- `src/app/components/orders-page`: parent order workspace.
- `src/app/components/order-search`: reactive search control.
- `src/app/components/order-list`: order table and `@Output()` selection event.
- `src/app/components/order-form`: reactive CRUD form.
- `src/app/services/order-store.service.ts`: RxJS state and sibling coordination.
- `src/app/services/order.service.ts`: HTTP API calls.
- `src/app/app-routing.module.ts`: route configuration.
- `src/app/app.module.ts`: component declarations and module imports.

### Spring Boot server

- `model/Order.java`: JPA entity.
- `repository/OrderRepository.java`: JPA repository and customer search method.
- `controller/OrderController.java`: REST CRUD endpoints.
- `src/main/resources/application.properties`: server and H2 configuration.

## Interview Guide

Open the guide here:

- [View the interview guide on GitHub](https://github.com/seedforsuccess/AngularCrudDemo/blob/main/interview_guide.md)
- [Open the local Markdown guide](interview_guide.md)

The guide contains visual explanations of:

- Layered and tree architecture diagrams.
- Parent, child, and sibling relationships.
- `@Input()` and `@Output()` examples.
- RxJS search and state flow.
- Reactive form configuration and validation.
- UI-to-Spring-Boot sequence flow.
- CRUD endpoint and persistence layers.

## Run Spring Boot Application

From `spring-boot-server`:

```bash
mvn spring-boot:run
```

The API runs at `http://localhost:8080` by default. Confirm the port in `src/main/resources/application.properties` if your local configuration differs.

## Run Angular Client

From `angular-17-client`:

```bash
npm install
npm start
```

The Angular client runs at `http://localhost:4200` by default. The Order screen is available at `http://localhost:4200/orders`.

## Validation

```bash
npm.cmd run build
npm.cmd test -- --watch=false --browsers=ChromeHeadless
```

The Spring Boot project can be compiled with:

```bash
mvnw.cmd clean package -DskipTests
```
