import { PrismaClient } from '@prisma/client';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST( request: Request) {
  try {

  
    const req=await request.json();

    const { id, boardNo, nsPairNo, ewPairNo, contract, by, result, nsScore, ewScore } = req;

    // Detailed validation
    const fields = { boardNo, nsPairNo, ewPairNo, contract, by, result, nsScore, ewScore };
    for (const [key, value] of Object.entries(fields)) {
      if (value === undefined || value === null) {
        return NextResponse.json({ error: `Missing required field: ${key}` });
      }
      // Add more specific validations here if needed
    }

    const updatedEntry = await prisma.entry.update({
        where: { id },
        data: { boardNo:parseInt(boardNo), nsPairNo:parseInt(nsPairNo), ewPairNo:parseInt(ewPairNo), result,  contract, by, nsScore:parseInt(nsScore), ewScore:parseInt(ewScore) },
      });

    return NextResponse.json({msg:"Entry updated successfully"});
  } catch (error) {
    console.error('Failed to add entry:', error);
    return NextResponse.json({ error: `Server error` }); // Include the error message and a 500 status code
  }
}
