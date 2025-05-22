// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma' // 👈 Ton client
import { Prisma } from '@prisma/client'

type UserCreateInput = Prisma.UserCreateInput
type U = Prisma.UserCreateInput

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      programs: true,
      records: true,
      goals: true,
      feedbacks: true,
    }
  })

  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password, age } = body

  if (!email || !password || !age) {
    return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const newUser = await prisma.user.create({
      data: {
          email,
          password : hashedPassword,
          age,
      },
  })
    return NextResponse.json(newUser)
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}