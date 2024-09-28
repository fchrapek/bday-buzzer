'use client'

import { useState } from 'react'
import BirthdayForm from '@/components/birthdayForm'
import BirthdayList from '@/components/birthdayList'

// Assume this ID comes from your authentication system
const LOGGED_IN_USER_ID = 1;

export default function Home() {
  const [birthdays, setBirthdays] = useState([])

  const addBirthday = (newBirthday) => {
    setBirthdays([...birthdays, newBirthday])
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Birthday Reminders</h1>
      <BirthdayForm onAddBirthday={addBirthday} userId={LOGGED_IN_USER_ID} />
      <BirthdayList birthdays={birthdays} />
    </main>
  )
}