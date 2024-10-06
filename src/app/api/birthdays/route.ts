import { NextResponse } from 'next/server'
import prisma from 'lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, birthDate, notes, categoryId, reminderEnabled, reminderDays } = body

    if (!name || !birthDate || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) }
    })

    if (!category) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const newBirthday = await prisma.birthdayPerson.create({
      data: { 
        name,
        birthDate: new Date(birthDate),
        notes,
        categoryId: parseInt(categoryId),
        reminderEnabled,
        reminderDays
      },
      include: { category: true }
    })

    return NextResponse.json(newBirthday, { status: 201 })
  } catch (error) {
    console.error('Failed to create birthday entry:', error)
    return NextResponse.json({ error: 'Failed to create birthday entry' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const birthdays = await prisma.birthdayPerson.findMany({
      include: { category: true }
    })
    return NextResponse.json(birthdays)
  } catch (error) {
    console.error('Failed to fetch birthdays:', error)
    return NextResponse.json({ error: 'Failed to fetch birthdays' }, { status: 500 })
  }
}