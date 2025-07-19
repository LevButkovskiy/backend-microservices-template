# backend-microservices-template
Backend Microservices Template Nest.Js Typescript

## Architecture

This template uses a monorepo structure with two NestJS applications:

- **gateway** – HTTP gateway application running on the port specified by `GATEWAY_PORT` in `.env`.
- **users** – internal TCP microservice listening on `USERS_PORT`.
- **shared** – common library with shared types. Each service declares `@backend/shared` in its dependencies, so the library can be used like any external package.

## Adding a service

Run the helper command to create a new service based on the `users` example:

```bash
npm run add:service -- <service-name>
```

The command generates a NestJS project under `packages/<service-name>`,
adds the `@backend/shared` package as a dependency and includes the
service in the workspace automatically.

## Docker

Each service contains a `Dockerfile`. The `docker-compose.yml` file pulls
images from the registry. Copy `.env.example` to `.env` and run:

```bash
docker compose up
```

## CI/CD

The `Release` workflow publishes new package versions. After a successful release
or when triggered manually, the `Deploy` workflow builds Docker images, pushes
them to the external registry and deploys them on the server via SSH. The server
logs in to the registry before running `docker compose`.

