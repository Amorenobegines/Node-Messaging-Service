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

## Características principales

Autenticación con JWT (registro, login y rutas protegidas)

Envío y recepción de mensajes en tiempo real

Notificaciones automáticas por eventos

API REST documentada y testeada con Postman

Base de datos PostgreSQL + pgAdmin

Contenedores Docker para backend y base de datos

Arquitectura modular y escalable

--- 

## Instalación

1. Clonar el repositorio
    `git clone https://github.com/Amorenobegines/Node-Messaging-Service`

2. Clonar .env.template a .env y configurar las variables de entorno
3. Ejecutar `npm install` para instalar las dependencias
4. Levantar el proyecto con Docker `docker-compose up -d` para levantar los servicios deseados.
5. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

---

## Colección de Postman
La colección completa para probar la API está disponible en:

👉 `/postman/User Api.postman_collection.json`
👉 `/postman/message.postman_collection.json`
👉 `/postman/notification.postman_collection.json`

---

## Contacto
Proyecto desarrollado por Alicia Moreno  
Backend Developer (Node.js)