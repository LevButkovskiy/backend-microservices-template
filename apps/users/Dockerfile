FROM node:22-alpine
WORKDIR /app
COPY . .
WORKDIR /app/apps/users
RUN npm install
RUN npm run build
CMD ["node", "dist/main.js"]
