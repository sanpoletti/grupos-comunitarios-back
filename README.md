# 🛠️ Backend - Registro de Grupos Comunitarios

Este proyecto es la API backend desarrollada con **Next.js** (API Routes) y **Prisma ORM** conectada a **SQL Server**. Permite registrar personas que retiran raciones alimentarias, validando por número de documento y asociándolas a un grupo comunitario.

---

## 📦 Requisitos

- Node.js 18+
- Base de datos SQL Server
- Prisma ORM
- Entorno de desarrollo local o remoto

---

## ⚙️ Configuración inicial

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/sanpoletti/grupos-comunitarios-back.git
   cd grupos-comunitarios-back
Instalá dependencias:

npm install
Configurá el archivo .env (crealo si no existe):
DATABASE_URL="sqlserver://10.22.0.253:1433;database=gruposcomunitarios;user=xxxxx;password=xxxxx;encrypt=true;trustServerCertificate=true"
Verificá la conexión a la base con Prisma:


npx prisma db pull

▶️ Comandos útiles
Comando	Descripción
npm run dev	Inicia el servidor en desarrollo
npx prisma db pull	Trae el esquema desde la base existente
npx prisma studio	Interfaz visual para explorar los datos

🔌 Endpoints disponibles
POST /api/personas
Registra una nueva persona.

Body JSON:

json
Copiar
Editar
{
  "IDTIPODOCUMENTO": 1,
  "nroDocumento": "12345678",
  "nombre": "JUANA",
  "apellido": "PEREZ",
  "sexo": "F",
  "fechaNacimiento": "1990-05-01",
  "lugarResidencia": "CABA",
  "cantidadRaciones": 2,
  "IDHogar": 5
}
GET /api/personas?nroDocumento=12345678
Busca si un documento ya fue registrado.

GET /api/hogares
Devuelve todos los hogares (grupos comunitarios), con su idHogar y NombreGrupo.

🧩 Estructura del proyecto
bash
Copiar
Editar
├── prisma/
│   └── schema.prisma        # Esquema del modelo
├── pages/
│   └── api/
│       ├── personas/route.ts
│       └── hogares/route.ts
├── lib/
│   └── prisma.ts            # Configuración de conexión
├── .env
├── package.json
└── README.md


📌 Notas
Se usa CORS habilitado para frontend en http://localhost:3001

Prisma se conecta a SQL Server vía DATABASE_URL

La tabla PersonasRaciones incluye una relación opcional con Hogar


---
