import { PrismaClient } from '@prisma/client';

import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const entries = await prisma.entry.findMany();
    return NextResponse.json(entries);
   
  } catch (error) {
 return NextResponse.error();
  }
}
