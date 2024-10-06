'use client'

import { useState, useEffect } from 'react';
import { Birthday, BirthdayListProps } from 'types';

function BirthdayList({ birthdays }: BirthdayListProps) {
  const [sortedBirthdays, setSortedBirthdays] = useState<Birthday[]>([]);

  useEffect(() => {
    const sorted = [...birthdays].sort((a, b) => {
      const dateA = new Date(a.birthDate);
      const dateB = new Date(b.birthDate);
      return dateA.getTime() - dateB.getTime();
    });
    setSortedBirthdays(sorted);
  }, [birthdays]);

  const getUpcomingBirthday = (date: string) => {
    const today = new Date();
    const birthDate = new Date(date);
    birthDate.setFullYear(today.getFullYear());
    if (birthDate < today) {
      birthDate.setFullYear(today.getFullYear() + 1);
    }
    return birthDate;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Birthday List</h2>
      <ul className="space-y-4">
        {sortedBirthdays.map((person) => {
          const upcomingBirthday = getUpcomingBirthday(person.birthDate);
          const daysUntilBirthday = Math.ceil((upcomingBirthday.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <li key={person.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold">{person.name}</h3>
              <p>Birthday: {new Date(person.birthDate).toLocaleDateString()}</p>
              <p>Days until next birthday: {daysUntilBirthday}</p>
              <p>Category: {person.category.name}</p>
              {person.notes && <p>Notes: {person.notes}</p>}
              <p>Reminder: {person.reminderEnabled ? `${person.reminderDays} days before` : 'Disabled'}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BirthdayList;