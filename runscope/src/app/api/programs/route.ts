// app/api/programs/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const programs = await prisma.program.findMany({
    include: { sessions: true }
  })
  return NextResponse.json(programs)
}

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const newProgram = await prisma.program.create({
      data: {
        title: body.title,
        userId: body.userId,
      }
    })
    return NextResponse.json(newProgram)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}