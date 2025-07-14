# 🛠️ Backend - Registro de Grupos Comunitarios

Este proyecto es la API backend del sistema de **Grupos Comunitarios**, desarrollado con **Next.js (API Routes)** y **Prisma ORM**, conectado a una base de datos **SQL Server**.

Permite registrar personas que retiran raciones alimentarias, validando por número de documento y asociándolas a un grupo comunitario (`hogar`).

---

## 🔧 Tecnologías utilizadas

- [Node.js 22.1.0](https://nodejs.org/)
- [Next.js 15.3.4 (API Routes)](https://nextjs.org/)
- [Prisma ORM 6.11.1](https://www.prisma.io/)
- Base de datos: **SQL Server**
- TypeScript

---

## 📦 Requisitos

- Node.js 18+
- Base de datos SQL Server accesible
- Prisma CLI (`npx prisma`)
- Conexión habilitada entre backend y base

---

## ⚙️ Configuración inicial

1. **Clonar el repositorio:**

```bash
git clone https://github.com/sanpoletti/grupos-comunitarios-back.git
cd grupos-comunitarios-back
Instalar dependencias:

npm install
Configurar la base de datos en .env:


DATABASE_URL="sqlserver://10.22.0.253:1433;database=gruposcomunitarios;user=USUARIO;password=CONTRASEÑA;encrypt=true;trustServerCertificate=true"
Verificar conexión y sincronizar modelos:

npx prisma db pull

▶️ Comandos útiles
Comando	Descripción
npm run dev	Inicia el servidor en modo desarrollo
npx prisma db pull	Trae el esquema desde la base existente
npx prisma studio	Abre una UI para explorar los datos

🔌 Endpoints disponibles
➕ POST /api/personas
Registra una nueva persona.

Body JSON ejemplo:

{
  "IDTIPODOCUMENTO": 1,
  "nroDocumento": "12345678",
  "nombre": "JUANA",
  "apellido": "PEREZ",
  "sexo": "F",
  "fechaNacimiento": "1990-05-01",
  "lugarResidencia": "CABA",
  "cantidadRaciones": 2,
  "IDHogar": 281742,
  "observaciones": "Celiaca",
  "fechaRetiro": "2025-07-14"
}
🔍 GET /api/personas?nroDocumento=12345678
Verifica si una persona ya fue registrada por documento.

🏠 GET /api/hogares
Devuelve todos los hogares (grupos comunitarios) con idHogar y NombreGrupo.

🧩 Estructura del proyecto

├── prisma/
│   └── schema.prisma        # Esquema de base Prisma
├── app/
│   └── api/
│       ├── personas/route.ts  # API de personas
│       └── hogares/route.ts   # API de hogares
├── lib/
│   └── prisma.ts            # Configuración del cliente Prisma
├── .env                     # Variables de entorno
├── package.json
└── README.md

🌐 CORS y conexión
Se encuentra habilitado CORS para el frontend en:
http://localhost:3001

Prisma se conecta a SQL Server mediante la variable DATABASE_URL.

La tabla PersonasRaciones tiene una relación opcional con Hogar.

👩‍💻 Autoría
Proyecto desarrollado por Sandra Poletti junto al equipo de Grupos Comunitarios del Gobierno de la Ciudad de Buenos Aires.

---
