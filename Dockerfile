# Multi-stage build for React app
FROM node:20-alpine AS builder
ARG VITE_API_TARGET
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:alpine AS prod

# Copy built app to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy public directory for static assets
COPY --from=builder /app/public /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]