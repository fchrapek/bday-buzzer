"use client";

import { useState, useEffect } from "react";
import { Birthday, Category } from "@/types";
import BirthdayItem from "./BirthdayItem";

interface BirthdayListProps {
  birthdays: Birthday[];
  categories: Category[];
}

type BirthdayWithUpcoming = Birthday & { upcomingBirthday: Date };

interface BirthdayState {
  currentYear: BirthdayWithUpcoming[];
  nextYear: BirthdayWithUpcoming[];
}

function BirthdayList({ birthdays, categories }: BirthdayListProps) {
  const [birthdayState, setBirthdayState] = useState<BirthdayState>({
    currentYear: [],
    nextYear: []
  });

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

    setBirthdayState({
      currentYear: sortedBirthdays.filter(b => b.upcomingBirthday.getFullYear() === currentYear),
      nextYear: sortedBirthdays.filter(b => b.upcomingBirthday.getFullYear() > currentYear)
    });
  }, [birthdays]);

  const getUpcomingBirthday = (date: string): Date => {
    const today = new Date();
    const birthDate = new Date(date);
    birthDate.setFullYear(today.getFullYear());
    if (birthDate < today) {
      birthDate.setFullYear(today.getFullYear() + 1);
    }
    return birthDate;
  };

  const handleUpdate = (updatedBirthday: Birthday) => {
    setBirthdayState(prevState => ({
      currentYear: prevState.currentYear.map(b => b.id === updatedBirthday.id ? { ...updatedBirthday, upcomingBirthday: getUpcomingBirthday(updatedBirthday.birthDate) } : b),
      nextYear: prevState.nextYear.map(b => b.id === updatedBirthday.id ? { ...updatedBirthday, upcomingBirthday: getUpcomingBirthday(updatedBirthday.birthDate) } : b)
    }));
  };

  const handleDelete = (id: number) => {
    setBirthdayState(prevState => ({
      currentYear: prevState.currentYear.filter(birthday => birthday.id !== id),
      nextYear: prevState.nextYear.filter(birthday => birthday.id !== id)
    }));
  };

  const renderBirthdayList = (birthdayList: BirthdayWithUpcoming[]) => (
    <ul className="space-y-4">
      {birthdayList.map((birthday) => (
        <BirthdayItem 
          key={birthday.id} 
          birthday={birthday} 
          categories={categories}
          onDelete={handleDelete} 
          onUpdate={handleUpdate}
        />
      ))}
    </ul>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Birthday List</h2>
      <h3 className="text-lg font-semibold mb-2">Current Year</h3>
      {renderBirthdayList(birthdayState.currentYear)}

      {birthdayState.nextYear.length > 0 && (
        <>
          <hr className="my-6 border-t border-gray-300" />
          <h3 className="text-lg font-semibold mb-2">Next Year</h3>
          {renderBirthdayList(birthdayState.nextYear)}
        </>
      )}
    </div>
  );
}

export default BirthdayList;
