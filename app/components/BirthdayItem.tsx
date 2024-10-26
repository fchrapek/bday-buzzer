import React, { useState, ChangeEvent } from 'react';
import { Birthday } from '@/types';
import { fetchApi, isErrorResponse } from '@/lib/api-helpers';
import BirthdayFormFields from './BirthdayFormFields';

interface BirthdayItemProps {
  birthday: Birthday & { upcomingBirthday: Date };
  onDelete: (id: number) => void;
  onUpdate: (updatedBirthday: Birthday) => void;
}

function BirthdayItem({ birthday, onDelete, onUpdate }: BirthdayItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBirthday, setEditedBirthday] = useState(birthday);

  const daysUntilBirthday = Math.ceil(
    (birthday.upcomingBirthday.getTime() - new Date().getTime()) /
    (1000 * 60 * 60 * 24)
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const { category, upcomingBirthday, ...birthdayData } = editedBirthday;
      const response = await fetchApi('/api/birthdays', 'PUT', birthdayData);
      if (!isErrorResponse(response)) {
        const updatedBirthday = response.data as Birthday;
        onUpdate(updatedBirthday);
        setIsEditing(false);
      } else {
        console.error('Failed to update birthday:', response.error);
        console.error('Full error response:', response);
      }
    } catch (error) {
      console.error('Error updating birthday:', error);
    }
  };

  const handleCancel = () => {
    setEditedBirthday(birthday);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetchApi('/api/birthdays', 'DELETE', { id: birthday.id });
      if (!isErrorResponse(response)) {
        onDelete(birthday.id);
      } else {
        console.error('Failed to delete birthday:', response.error);
      }
    } catch (error) {
      console.error('Error deleting birthday:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setEditedBirthday(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };


  if (isEditing) {
    return (
      <li className="border p-4 rounded-md shadow-sm relative">
        <BirthdayFormFields formData={editedBirthday} onChange={handleInputChange} />
        <button onClick={handleSave} className="mr-2 bg-green-500 text-white px-2 py-1 rounded">Save</button>
        <button onClick={handleCancel} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
      </li>
    );
  }

  return (
    <li className="border p-4 rounded-md shadow-sm relative">
      <h3 className="text-lg font-semibold">{birthday.name}</h3>
      <p>Birthday: {new Date(birthday.birthDate).toLocaleDateString()}</p>
      <p>Days until next birthday: {daysUntilBirthday}</p>
      <p>Category: {birthday.category?.name}</p>
      {birthday.notes && <p>Notes: {birthday.notes}</p>}
      <p>
        Reminder:{" "}
        {birthday.reminderEnabled
          ? `${birthday.reminderDays} days before`
          : "Disabled"}
      </p>
      <button
        onClick={handleEdit}
        className="absolute top-2 right-20 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
}

export default BirthdayItem;
