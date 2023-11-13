import { PrismaClient } from '@prisma/client';

import { NextResponse } from 'next/server';



export async function GET() {
  const prisma = new PrismaClient();
  try {
    const entries = await prisma.entry.findMany();
    return NextResponse.json(entries);
   
  } catch (error) {
 return NextResponse.error();
  }
}
