import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // ajustá en prod
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET: ejecutar el SP dbo._TIPOS_DE_FAMILIARES
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // si querés filtrar por grupo se lee ?grupo=...
    const grupo = Number(searchParams.get('grupo')) || 0;

    // Llamada al SP
    // @ts-ignore porque prisma.$queryRaw no infiere bien el tipo
    const tipos = await prisma.$queryRaw<any[]>`
      EXEC dbo._TIPOS_DE_FAMILIARES @Grupo = ${grupo}
    `;

    // Normalizamos campos
    const result = tipos.map(t => ({
      idtipodefamiliar: t.idtipodefamiliar,
      nombre: t.nombre?.trim() || '',
      grupo: t.grupo ?? 0,
    }));

    return NextResponse.json(result, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error al obtener tipos de familiares:', error);
    return NextResponse.json(
      { error: 'No se pudieron cargar los tipos de familiares' },
      { status: 500, headers: corsHeaders }
    );
  }
}
