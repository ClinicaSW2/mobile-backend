# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias de producción y de desarrollo necesarias para compilar TypeScript
RUN npm install

# Copia el resto del código fuente a /app
COPY . .

# Compila el código TypeScript a JavaScript en la carpeta 'dist'
RUN npm run build

# Expon el puerto en el que correrá la aplicación (debe coincidir con el puerto en .env)
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["npm", "start"]
