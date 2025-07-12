# My Finance Web - API

API developed for the *Software Implementation and Evolution Practices* course. This service supports a web application that helps users manage finances by registering income and expenses through categorized accounts and transactions.

## Predefined Schema Specifications

### Account

* `description`: string – Brief description of the account (e.g., *Fuel expenses*)
* `type`: string – `"R"` for income or `"D"` for expense

### Transaction

* `history`: string – Description of the transaction (e.g., *Fuel for trip*)
* `date`: string (ISO 8601) – Date and time of the transaction
* `accountId`: number – ID of the associated account
* `value`: number – Value of the transaction

## Endpoints

### Accounts

| Endpoint                | Method | Description           |
| ----------------------- | ------ | --------------------- |
| `/api/v1/accounts`      | GET    | Retrieve all accounts |
| `/api/v1/accounts`      | POST   | Create a new account  |
| `/api/v1/accounts/{id}` | GET    | Get account by ID     |
| `/api/v1/accounts/{id}` | PUT    | Update account by ID  |
| `/api/v1/accounts/{id}` | DELETE | Delete account by ID  |

### Transactions

| Endpoint                    | Method | Description                              |
| --------------------------- | ------ | ---------------------------------------- |
| `/api/v1/transactions`      | GET    | Retrieve transactions filtered by period |
| `/api/v1/transactions`      | POST   | Create a new transaction                 |
| `/api/v1/transactions/{id}` | GET    | Get transaction by ID                    |
| `/api/v1/transactions/{id}` | PUT    | Update transaction by ID                 |
| `/api/v1/transactions/{id}` | DELETE | Delete transaction by ID                 |

### Documentation

| Endpoint          | Method | Description            |
| ----------------- | ------ | ---------------------- |
| `/api/v1/swagger` | GET    | Access Swagger UI Docs |

## Database

Database tables are defined using TypeORM migrations located in the [migrations directory](./src/infra/migrations).

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Running Locally with Docker Compose

1. **Clone this repository:**

   ```
   git clone https://github.com/sesaquecruz/puc-my-finance-web-api
   ```

2. **Navigate to the project directory:**

   ```
   cd puc-my-finance-web-api
   ```

3. **Create a `.env` file based on the [example](./.env.example):**

   ```
   cp .env.example .env
   ```

4. **Start the services using Docker Compose:**

   ```
   docker compose --profile app up -d
   ```

5. **Access the Swagger UI for API documentation:**

   ```
   http://localhost:8080/api/v1/swagger/
   ```

**To stop the services, run:** 
   ```
   docker compose --profile app down
   ```

## Contributing

Contributions are welcome! If you find a bug or would like to suggest an enhancement, please make a fork, create a new branch with the bugfix or feature, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
