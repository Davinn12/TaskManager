# ─────────────────────────────────────────────────────────────
#  STAGE 1 — deps: instala solo las dependencias de producción
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

# Copiar archivos de dependencias primero (aprovecha la caché de Docker)
COPY package.json package-lock.json ./

RUN npm ci --omit=dev

# ─────────────────────────────────────────────────────────────
#  STAGE 2 — builder: compila la aplicación Next.js
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias del stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar todo el código fuente
COPY . .

# Instalar también devDependencies necesarias para el build
RUN npm ci

# Construir la aplicación (genera .next/standalone gracias a output: "standalone")
RUN npm run build

# ─────────────────────────────────────────────────────────────
#  STAGE 3 — runner: imagen final ligera de producción
# ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Crear usuario sin privilegios (buena práctica de seguridad)
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copiar únicamente lo necesario del build standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Dar permisos al usuario de la aplicación
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# Servidor standalone de Next.js (no requiere node_modules completo)
CMD ["node", "server.js"]
