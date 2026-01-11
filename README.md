# Mensajería API API backend para un sistema de mensajería, desarrollada con 
**Node.js**, 
**Express**,
**TypeScript**, 
**TypeORM**, 
**PostgreSQL**. 

El entorno de desarrollo está completamente dockerizado e incluye **pgAdmin** para la gestión visual de la base de datos. 

Este proyecto forma parte de las prácticas internas de Kubide. 

--- 

##  Tecnologías utilizadas 
- Node.js + Express 
- TypeScript 
- TypeORM 
- PostgreSQL (Docker) 
- pgAdmin (Docker) 
- Docker Compose 
- JWT (autenticación) 
- Bcrypt (hashing de contraseñas) 

--- 

## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

