// app/api/weeks/[id]/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const week = await prisma.week.findUnique({
    where: { id: Number(params.id) },
    include: { sessions: true }
  })

  if (!week) {
    return NextResponse.json({ error: 'Semaine introuvable' }, { status: 404 })
  }

  return NextResponse.json(week)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { weekNumber } = body

    const updatedWeek = await prisma.week.update({
      where: { id: Number(params.id) },
      data: { weekNumber }
    })

    return NextResponse.json(updatedWeek)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.week.delete({
      where: { id: Number(params.id) }
    })

    return NextResponse.json({ message: 'Semaine supprimée' })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
  }
}