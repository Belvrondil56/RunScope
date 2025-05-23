// app/api/sessions/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const sessions = await prisma.session.findMany({
    include: {
      program: true,
      feedbacks: true
    }
  })
  return NextResponse.json(sessions)
}

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const newSession = await prisma.session.create({
      data: {
        title: body.title,
        duration: body.duration,
        pace: body.pace,
        distance: body.distance,
        programId: body.programId,
      }
    })
    return NextResponse.json(newSession)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}