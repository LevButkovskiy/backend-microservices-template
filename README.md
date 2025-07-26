# Backend Microservices Template

This repository contains a simple monorepo setup using **NestJS** and RabbitMQ for communication between services.

The project relies on **Node.js 22** both locally and in the provided Docker images.
Run `npm install` in the repository root to install all workspace dependencies.

## Structure
- **apps/** – application entry points
  - **gateway** – HTTP server that forwards requests to microservices via RabbitMQ
  - **users** – microservice handling user-related actions
  - **telegram** – plain TypeScript application
- **libs/** – shared code
  - **types** – shared DTOs and types
  - **constants** – common constants such as queue names
  - **utils** – utility functions

## Running with Docker
```bash
docker-compose up --build
```
