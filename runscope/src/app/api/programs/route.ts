import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, userId, weeksCount = 4 } = body;

    const newProgram = await prisma.program.create({
      data: {
        title,
        userId,
        weeks: {
          create: Array.from({ length: weeksCount }, (_, i) => ({
            weekNumber: i + 1
          }))
        }
      },
      include: {
        weeks: true
      }
    });

    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      include: {
        weeks: {
          include: {
            sessions: true
          }
        }
      }
    });

    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
  }
}
