'use client'

import { useState } from 'react'

interface BirthdayFormProps {
  onAddBirthday: (birthday: any) => void
  userId: number
}

export default function BirthdayForm({ onAddBirthday, userId }: BirthdayFormProps) {
  const [birthdayName, setBirthdayName] = useState('')
  const [birthdayDate, setBirthdayDate] = useState('')

  const createBirthday = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/birthdays', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: birthdayName, 
        date: birthdayDate, 
        userId: userId 
      }),
    })
    if (res.ok) {
      const newBirthday = await res.json()
      onAddBirthday(newBirthday)
      alert('Birthday entry created')
      setBirthdayName('')
      setBirthdayDate('')
    } else {
      alert('Failed to create birthday entry')
    }
  }

  return (
    <form onSubmit={createBirthday} className="space-y-4 mb-8">
      <h2 className="text-xl font-semibold mb-2">Add Birthday Reminder</h2>
      <div>
        <label htmlFor="birthdayName" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="birthdayName"
          type="text"
          value={birthdayName}
          onChange={(e) => setBirthdayName(e.target.value)}
          placeholder="Birthday Person's Name"
          required
          className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="birthdayDate" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          id="birthdayDate"
          type="date"
          value={birthdayDate}
          onChange={(e) => setBirthdayDate(e.target.value)}
          required
          className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Birthday
      </button>
    </form>
  )
}