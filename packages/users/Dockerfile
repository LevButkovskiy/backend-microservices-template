# syntax=docker/dockerfile:1
ARG SERVICE=users
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
COPY packages ./packages
RUN npm ci
RUN npm run build -w packages/shared && npm run build -w packages/$SERVICE

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages ./packages
RUN npm ci --omit=dev
CMD ["node", "packages/$SERVICE/dist/main.js"]
