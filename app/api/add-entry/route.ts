import { PrismaClient } from '@prisma/client';
import prisma from "@/app/libs/db";
import { NextResponse } from 'next/server';



export async function POST( request: Request) {
  try {

  
    const req=await request.json();

    const { boardNo, nsPairNo, ewPairNo, contract, by, result, nsScore, ewScore } = req;

    // Detailed validation
    const fields = { boardNo, nsPairNo, ewPairNo, contract, by, result, nsScore, ewScore };
    for (const [key, value] of Object.entries(fields)) {
      if (value === undefined || value === null) {
        return NextResponse.json({ error: `Missing required field: ${key}` });
      }
      // Add more specific validations here if needed
    }

    const newEntry = await prisma.entry.create({
      data: fields
    });

    return NextResponse.json(newEntry);
  } catch (error) {
    console.error('Failed to add entry:', error);
    return NextResponse.json({ error: `Server error` }); // Include the error message and a 500 status code
  }
}
