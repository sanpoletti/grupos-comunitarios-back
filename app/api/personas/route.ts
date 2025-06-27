import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Manejar CORS para preflight (OPTIONS)
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Headers CORS compartidos
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// POST: registrar una nueva persona
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const nuevaPersona = await prisma.personasRaciones.create({
      data: {
        IDTIPODOCUMENTO: body.IDTIPODOCUMENTO,
        nroDocumento: body.nroDocumento,
        nombre: body.nombre,
        apellido: body.apellido,
        sexo: body.sexo,
        fechaNacimiento: new Date(body.fechaNacimiento),
        lugarResidencia: body.lugarResidencia,
        cantidadRaciones: body.cantidadRaciones,
      },
    });

    return NextResponse.json(nuevaPersona, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error al crear persona:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al guardar los datos' },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// GET: listar todas las personas o buscar por nroDocumento
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nroDocumento = searchParams.get('nroDocumento');

    let personas;

    if (nroDocumento) {
      personas = await prisma.personasRaciones.findMany({
        where: { nroDocumento: nroDocumento },
      });
    } else {
      personas = await prisma.personasRaciones.findMany();
    }

    return NextResponse.json(personas, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error al obtener personas:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al obtener los datos' },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
