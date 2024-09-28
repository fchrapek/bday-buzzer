import { useState, useEffect } from 'react';

interface Birthday {
  id: number;
  date: string;
}

interface BirthdayPerson {
  id: number;
  name: string;
  birthday: Birthday;
}

function BirthdayList() {
  const [birthdays, setBirthdays] = useState<BirthdayPerson[]>([]);

  useEffect(() => {
    async function fetchBirthdays() {
      try {
        const response = await fetch('/api/birthdays');
        if (!response.ok) {
          throw new Error('Failed to fetch birthdays');
        }
        const data = await response.json();
        setBirthdays(data);
      } catch (error) {
        console.error('Error fetching birthdays:', error);
      }
    }

    fetchBirthdays();
  }, []);

  return (
    <div>
      <h1>Birthday List</h1>
      <ul>
        {birthdays.map((person) => (
          <li key={person.id}>
            {person.name}: {new Date(person.birthday.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BirthdayList;