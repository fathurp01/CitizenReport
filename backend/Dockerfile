# Stage 1: Build dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Production run
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Environment variables
ENV PORT=5001
ENV NODE_ENV=production

EXPOSE 5001

CMD ["node", "server.js"]
