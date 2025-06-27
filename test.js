require('dotenv').config();  // Carga las variables del archivo .env
console.log('URL leída:', process.env.DATABASE_URL); // Verifica que la conexión se leyó correctamente

const { PrismaClient } = require('@prisma/client'); // Carga el cliente de Prisma
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SELECT 1`; // Prueba simple
  console.log(result); // Imprime resultado
}

main()
  .catch((e) => console.error(e)) // Captura errores
  .finally(() => prisma.$disconnect()); // Cierra conexión
