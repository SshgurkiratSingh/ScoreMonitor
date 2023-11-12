import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const entries = await prisma.entry.findMany();
    return NextResponse.json(entries);
   
  } catch (error) {
 return NextResponse.error();
  }
}
