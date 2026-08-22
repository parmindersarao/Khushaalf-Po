# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --frozen-lockfile || npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pm2
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --production --frozen-lockfile || npm install --production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["pm2-runtime", "start", "npm", "--name", "khushaalf", "--", "start"]