# Angular 17 Client

This client provides Tutorial CRUD and the Order management workspace for the Angular and Spring Boot application.

## Features

- Tutorial create, retrieve, update, delete, and title search.
- Order create, retrieve, update, delete, and customer search.
- Reactive forms with typed controls and validation.
- RxJS state coordination with `BehaviorSubject`, `Subject`, `debounceTime`, `distinctUntilChanged`, `switchMap`, and `shareReplay`.
- Parent-child communication with `@Input()` and `@Output()`.
- Sibling communication through `OrderStoreService`.

## Order Screen Architecture

The `/orders` route renders these components together:

```text
OrdersPageComponent
├── OrderSearchComponent
├── OrderListComponent
│   ├── @Input() orders
│   └── @Output() orderSelected
└── OrderFormComponent
	└── @Input() selectedOrder

OrderStoreService -> OrderService -> Spring Boot /api/orders
```

`OrderListComponent` emits the selected order to the parent. The parent updates `OrderStoreService`, and the selected order reaches `OrderFormComponent` through `@Input()`.

## Run

```bash
npm install
npm start
```

Open `http://localhost:4200/orders` for the Order workspace. The API server must be running at the configured backend URL.

## Validation

```bash
npm.cmd run build
npm.cmd test -- --watch=false --browsers=ChromeHeadless
```
