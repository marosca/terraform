# FROM node:20-alpine AS deps

# COPY package*.json ./

# RUN npm ci

# FROM node:20-alpine AS builder

# COPY . .
# COPY --from=deps /node_modules ./node_modules
# RUN npm run build

# FROM node:20-alpine AS runner

# COPY --from=builder /.next/standalone ./
# # COPY --from=builder /public ./public
# # COPY --from=builder /.next/static ./.next/static

# EXPOSE 3000

# ENV PORT 3000

# CMD HOSTNAME="0.0.0.0" node server.js




# Etapa 1: Instalar dependencias
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Etapa 2: Construir la aplicación
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Etapa 3: Preparar entorno de ejecución
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]