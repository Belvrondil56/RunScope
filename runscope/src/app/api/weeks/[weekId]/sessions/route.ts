import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { weekId: string } }) {
  const weekId = Number(params.weekId)
  if (isNaN(weekId)) {
    return NextResponse.json({ error: 'Invalid weekId' }, { status: 400 })
  }

  try {
    const sessions = await prisma.session.findMany({
      where: { weekId },
      orderBy: { id: 'asc' },
    })
    return NextResponse.json(sessions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: { weekId: string } }) {
  const weekId = Number(params.weekId)
  if (isNaN(weekId)) {
    return NextResponse.json({ error: 'Invalid weekId' }, { status: 400 })
  }

  try {
    const body = await req.json()
    // Exemple de données attendues dans body: { title, duration, pace, distance }
    const { title, duration, pace, distance } = body

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title is required and must be a string' }, { status: 400 })
    }
    if (typeof duration !== 'number' || duration <= 0) {
      return NextResponse.json({ error: 'Duration must be a positive number' }, { status: 400 })
    }
    if (!pace || typeof pace !== 'string') {
      return NextResponse.json({ error: 'Pace is required and must be a string' }, { status: 400 })
    }
    if (typeof distance !== 'number' || distance < 0) {
      return NextResponse.json({ error: 'Distance must be a non-negative number' }, { status: 400 })
    }

    const newSession = await prisma.session.create({
      data: {
        weekId,
        title,
        duration,
        pace,
        distance,
      },
    })

    return NextResponse.json(newSession, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}