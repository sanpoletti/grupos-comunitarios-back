import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // * mientras probás localmente
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Manejar CORS
export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET: traer todos los hogares mediante SP
export async function GET(req: NextRequest) {
  try {
    // Ejecutamos el SP _GruposAsistidos
    // @ts-ignore
    const hogares = await prisma.$queryRaw<any[]>`
      EXEC dbo._Grupos @IDHOGAR = 0, @tGrupo = 2
    `;

    // Normalizamos los datos
    const result = hogares.map(h => ({
      idHogar: h.IDHOGAR,
      NombreGrupo: h.NombreGrupo?.trim() || '',
      nroRegistro: Number(h.nroregistro) || 0, // 👈 aseguramos que siempre sea number
    }));

    return NextResponse.json(result, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error al obtener hogares:', error);
    return NextResponse.json(
      { error: 'Error al obtener hogares' },
      { status: 500, headers: corsHeaders }
    );
  }
}
