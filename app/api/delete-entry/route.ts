import { PrismaClient } from '@prisma/client';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST( request: Request) {
  try {

  
    const req=await request.json();

const {id}=req;
if (!id || typeof id !== 'string') {
  return NextResponse.json({ msg: 'Missing required field: id' });
}
const deletedEntry = await prisma.entry.delete({
    where: { id },
  });
   return NextResponse.json({msg:"Entry deleted successfully"});
  } catch (error) {
    console.error('Failed to add entry:', error);
    return NextResponse.json({ error: `Server error: ${error.message}` }); // Include the error message and a 500 status code
  }
}
