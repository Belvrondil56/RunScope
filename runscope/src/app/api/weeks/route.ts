// app/api/weeks/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { programId, weekNumber } = body

    if (!programId || !weekNumber) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const newWeek = await prisma.week.create({
      data: {
        programId,
        weekNumber
      }
    })

    return NextResponse.json(newWeek)
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const programId = searchParams.get('programId')

  if (!programId) {
    return NextResponse.json({ error: 'Missing programId' }, { status: 400 })
  }

  const weeks = await prisma.week.findMany({
    where: {
      programId: Number(programId)
    },
    include: {
      sessions: true
    }
  })

  return NextResponse.json(weeks)
}