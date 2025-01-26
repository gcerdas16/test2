# Usa una imagen base de Node.js con Alpine Linux
FROM node:18-alpine

# Instala las herramientas necesarias
RUN apk update && apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios al contenedor
COPY . .

# Instala dependencias y construye la aplicación
RUN pnpm install
RUN pnpm run build

# Comando de inicio para producción
CMD ["pnpm", "start"]
