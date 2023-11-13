import { PrismaClient } from '@prisma/client';

import { NextResponse } from 'next/server';



export async function GET() {
  const prisma = new PrismaClient();
  try {
    const entries = await prisma.entry.findMany();

    const response = NextResponse.json(entries);
response.headers.append('Cache-Control', 'no-store, max-age=0');
return response;

   
  } catch (error) {
 return NextResponse.error();
  }
}
