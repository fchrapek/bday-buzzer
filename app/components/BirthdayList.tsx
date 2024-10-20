"use client";

import { useState, useEffect } from "react";
import { Birthday } from "types";

interface BirthdayListProps {
  birthdays: Birthday[];
}

type BirthdayWithUpcoming = Birthday & { upcomingBirthday: Date };

function BirthdayList({ birthdays }: BirthdayListProps) {
  const [currentYearBirthdays, setCurrentYearBirthdays] = useState<BirthdayWithUpcoming[]>([]);
  const [nextYearBirthdays, setNextYearBirthdays] = useState<BirthdayWithUpcoming[]>([]);

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const birthdaysWithUpcoming = birthdays.map(birthday => ({
      ...birthday,
      upcomingBirthday: getUpcomingBirthday(birthday.birthDate),
    }));

    const sortedBirthdays = birthdaysWithUpcoming.sort((a, b) => 
      a.upcomingBirthday.getTime() - b.upcomingBirthday.getTime()
    );

    setCurrentYearBirthdays(sortedBirthdays.filter(b => b.upcomingBirthday.getFullYear() === currentYear));
    setNextYearBirthdays(sortedBirthdays.filter(b => b.upcomingBirthday.getFullYear() > currentYear));
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

  const renderBirthdayList = (birthdayList: BirthdayWithUpcoming[]) => (
    <ul className="space-y-4">
      {birthdayList.map((person) => {
        const daysUntilBirthday = Math.ceil(
          (person.upcomingBirthday.getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        );

        return (
          <li key={person.id} className="border p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold">{person.name}</h3>
            <p>Birthday: {new Date(person.birthDate).toLocaleDateString()}</p>
            <p>Days until next birthday: {daysUntilBirthday}</p>
            <p>Category: {person.category?.name}</p>
            {person.notes && <p>Notes: {person.notes}</p>}
            <p>
              Reminder:{" "}
              {person.reminderEnabled
                ? `${person.reminderDays} days before`
                : "Disabled"}
            </p>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Birthday List</h2>
      <h3 className="text-lg font-semibold mb-2">Current Year</h3>
      {renderBirthdayList(currentYearBirthdays)}
      
      {nextYearBirthdays.length > 0 && (
        <>
          <hr className="my-6 border-t border-gray-300" />
          <h3 className="text-lg font-semibold mb-2">Next Year</h3>
          {renderBirthdayList(nextYearBirthdays)}
        </>
      )}
    </div>
  );
}

export default BirthdayList;
