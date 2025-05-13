FROM node:22-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build
RUN npm ci --only-production --ignore-scripts

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "build/index.js"]