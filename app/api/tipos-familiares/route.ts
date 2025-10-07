import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // Si no se pasa ?grupo=..., usar -1
    const grupo = Number(searchParams.get('grupo') ?? -1);

    // @ts-ignore porque prisma.$queryRaw no infiere bien el tipo
    const tipos = await prisma.$queryRaw<any[]>`
      EXEC dbo._TIPOS_DE_FAMILIARES @Grupo = ${grupo}
    `;

    const result = tipos.map(t => ({
      idtipodefamiliar: t.idtipodefamiliar,
      nombre: t.nombre?.trim() || '',
      grupo: t.grupo ?? -1,
    }));

    return NextResponse.json(result, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error al obtener tipos de familiares:', error);
    return NextResponse.json(
      { error: 'No se pudieron cargar los tipos de familiares' },
      { status: 500, headers: corsHeaders }
    );
  }
}
