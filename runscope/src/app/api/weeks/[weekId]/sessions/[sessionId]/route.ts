import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { weekId: string, sessionId: string } }) {
  const sessionId = Number(params.sessionId)
  if (isNaN(sessionId)) {
    return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 })
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    })
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }
    return NextResponse.json(session)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { weekId: string, sessionId: string } }) {
  const sessionId = Number(params.sessionId)
  if (isNaN(sessionId)) {
    return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { title, duration, pace, distance } = body

    const updatedSession = await prisma.session.update({
      where: { id: sessionId },
      data: {
        ...(title && { title }),
        ...(duration && { duration }),
        ...(pace && { pace }),
        ...(distance && { distance }),
      },
    })

    return NextResponse.json(updatedSession)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { weekId: string, sessionId: string } }) {
  const sessionId = Number(params.sessionId)
  if (isNaN(sessionId)) {
    return NextResponse.json({ error: 'Invalid sessionId' }, { status: 400 })
  }

  try {
    await prisma.session.delete({
      where: { id: sessionId },
    })
    return NextResponse.json({ message: 'Session deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 })
  }
}