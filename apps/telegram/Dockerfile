FROM node:22-alpine
WORKDIR /app
COPY . .
WORKDIR /app/apps/telegram
RUN npm install
RUN npm run build
CMD ["node", "dist/index.js"]
