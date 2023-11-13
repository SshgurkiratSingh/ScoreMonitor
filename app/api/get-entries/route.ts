import prisma from "@/app/libs/db";

import { NextResponse } from 'next/server';



export async function GET() {

  try {
    const entries = await prisma.entry.findMany();

    const response = NextResponse.json({entries,rand:Math.random()});
response.headers.append('Cache-Control', 'no-store, max-age=0');
return response;

   
  } catch (error) {
 return NextResponse.error();
  }
}
