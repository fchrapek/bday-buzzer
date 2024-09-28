import { NextResponse } from 'next/server'
import prisma from 'lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, date } = body

    console.log('Received request body:', body)

    if (!name || !date) {
      console.log('Missing required fields')
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create the Birthday first
    const birthday = await prisma.birthday.create({
      data: { 
        date: new Date(date)
      }
    })

    // Check if a person with this name already exists
    let person = await prisma.birthdayPerson.findFirst({
      where: { name }
    })

    if (person) {
      // If person exists, update their birthday
      person = await prisma.birthdayPerson.update({
        where: { id: person.id },
        data: { birthdayId: birthday.id },
        include: { birthday: true }
      })
    } else {
      // If person doesn't exist, create a new one
      person = await prisma.birthdayPerson.create({
        data: { 
          name,
          birthdayId: birthday.id
        },
        include: { birthday: true }
      })
    }

    console.log('Created/Updated person with birthday:', person)

    return NextResponse.json(person, { status: 201 })
  } catch (error) {
    console.error('Failed to create birthday entry:', error)
    return NextResponse.json({ error: 'Failed to create birthday entry' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const people = await prisma.birthdayPerson.findMany({
      include: { birthday: true }
    })
    return NextResponse.json(people)
  } catch (error) {
    console.error('Failed to fetch birthdays:', error)
    return NextResponse.json({ error: 'Failed to fetch birthdays' }, { status: 500 })
  }
}