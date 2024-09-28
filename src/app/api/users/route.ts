import { NextResponse } from 'next/server'
import prisma from 'lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email } = body
  try {
    const user = await prisma.user.create({
      data: { name, email },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
  }
}