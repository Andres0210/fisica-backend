# FisicaLab Campus Backend

Backend `NestJS` para recursos, asignaturas, temas, autores y almacenamiento en Supabase.

## Stack

- `NestJS 11`
- `Prisma 6`
- `Supabase Postgres`
- `Supabase Storage`
- despliegue objetivo: `Google Cloud Run`

## Variables de entorno

Usa [`.env.example`](/C:/Users/ing_a/OneDrive/Documentos/Playground/fisica-campus-backend/.env.example).

## Desarrollo local

```bash
npm install
npm run prisma:generate
npm run dev
```

## Build

```bash
npm run build
```

## Produccion

El contenedor ya esta preparado para:

- generar cliente Prisma en build
- compilar Nest
- ejecutar `prisma migrate deploy` al arrancar
- exponer el puerto esperado por Cloud Run

## Docker

```bash
npm run docker:build
```
