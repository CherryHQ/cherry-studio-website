# Use --build-arg MIRROR=docker.1ms.run to specify a mirror registry
ARG MIRROR

# Stage 1: Build
FROM ${MIRROR:+${MIRROR}/}node:24-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

ARG MIRROR

# Stage 2: Production
FROM ${MIRROR:+${MIRROR}/}nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
