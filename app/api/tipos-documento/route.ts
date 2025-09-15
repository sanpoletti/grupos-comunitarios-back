import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // ajustá a tu dominio en prod
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// GET: lista fija de tipos de documento
export async function GET() {
  // Orden exacto que pediste
  const tiposDocumento = [
    { id: 3,  nombre: 'D.N.I.' },
    { id: 10, nombre: 'PRC.' },
    { id: 0,  nombre: 'S.D.' },
    { id: 1,  nombre: 'L.C.' },
    { id: 2,  nombre: 'L.E.' },
    { id: 13, nombre: 'C.I.' },
  ];

  return NextResponse.json(tiposDocumento, {
    status: 200,
    headers: corsHeaders,
  });
}
