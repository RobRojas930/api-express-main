# API Express Main

Este proyecto es una API RESTful construida con Node.js y Express para la gestión de recursos como usuarios, productos, categorías, órdenes, presupuestos, y más.

## Requisitos previos

- Node.js (v16 o superior recomendado)
- npm (v8 o superior)
- (Opcional) Docker

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/RobRojas930/api-express-main.git
   cd api-express-main
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto y agrega las variables necesarias (por ejemplo, para la base de datos, JWT, etc.). Ejemplo:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=usuario
   DB_PASS=contraseña
   JWT_SECRET=tu_clave_secreta
   ```

   Ajusta los valores según tu entorno.

4. **Inicializa la base de datos:**

   Si usas un archivo o servicio externo para la base de datos, asegúrate de que esté corriendo y configurado correctamente.

5. **Ejecuta el servidor en desarrollo:**

   ```bash
   npm run dev
   ```

   O para producción:

   ```bash
   npm start
   ```

## Despliegue

### Fly.io

Para desplegar en Fly.io:

1. Instala Fly CLI: https://fly.io/docs/hands-on/install-flyctl/
2. Inicia sesión: `flyctl auth login`
3. Despliega:
   ```bash
   flyctl deploy
   ```

### Vercel

1. Instala Vercel CLI: `npm i -g vercel`
2. Inicia sesión: `vercel login`
3. Despliega:
   ```bash
   vercel --prod
   ```

### Docker

1. Construye la imagen:
   ```bash
   docker build -t api-express-main .
   ```
2. Corre el contenedor:
   ```bash
   docker run -p 3000:3000 api-express-main
   ```

## Estructura del proyecto

- `index.js`: Punto de entrada de la aplicación
- `app/`: Lógica principal (rutas, servicios, modelos, utilidades)
- `db.js`: Configuración de la base de datos
- `Dockerfile`, `fly.toml`, `vercel.json`, `Procfile`: Archivos para despliegue

## Scripts útiles

- `npm run dev`: Ejecuta el servidor en modo desarrollo
- `npm start`: Ejecuta el servidor en modo producción

## Notas

- Asegúrate de tener configuradas correctamente las variables de entorno.
- Consulta los archivos de configuración de despliegue para detalles específicos de cada plataforma.

## Licencia

MIT
