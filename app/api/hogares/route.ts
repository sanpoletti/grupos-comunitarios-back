import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Manejar CORS
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// GET: traer todos los hogares
export async function GET(req: NextRequest) {
  try {
    const hogares = await prisma.hogar.findMany({
      select: {
        idHogar: true,
        NombreGrupo: true,
      },
      orderBy: {
        NombreGrupo: 'asc',
      },
    });

    return NextResponse.json(hogares, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error al obtener hogares:', error);
    return NextResponse.json(
      { error: 'Error al obtener hogares' },
      { status: 500, headers: corsHeaders }
    );
  }
}
