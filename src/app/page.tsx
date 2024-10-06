'use client'

import { useState, useEffect } from 'react'
import BirthdayForm from './components/BirthdayForm';
import BirthdayList from './components/BirthdayList';
import { Birthday } from 'types'

export default function Home() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([])

  useEffect(() => {
    fetchBirthdays()
  }, [])

  const fetchBirthdays = async () => {
    const res = await fetch('/api/birthdays')
    if (res.ok) {
      const data: Birthday[] = await res.json()
      setBirthdays(data)
    }
  }

  const addBirthday = (newBirthday: Birthday) => {
    setBirthdays(prevBirthdays => [...prevBirthdays, newBirthday])
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Birthday Reminders</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <BirthdayForm onAddBirthday={addBirthday} />
        </div>
        <div className="md:w-1/2">
          <BirthdayList birthdays={birthdays} />
        </div>
      </div>
    </main>
  )
}