# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración de dependencias
COPY package.json yarn.lock ./

# Instalar las dependencias
RUN yarn install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando por defecto para iniciar React
CMD ["yarn", "run", "dev"]
