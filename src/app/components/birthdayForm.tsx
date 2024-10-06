"use client";

import { useState } from "react";
import { BirthdayFormProps, BirthdayFormData } from "@/types";
import { CATEGORIES } from "@/constants";

export default function BirthdayForm({ onAddBirthday }: BirthdayFormProps) {
  const [formData, setFormData] = useState<BirthdayFormData>({
    name: "",
    birthDate: "",
    notes: "",
    categoryId: 0,
    reminderEnabled: true,
    reminderDays: 7,
  });
  const [buttonText, setButtonText] = useState("Add Birthday");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev: BirthdayFormData) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const createBirthday = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setButtonText("Adding birthday...");

    const newBirthday = {
      ...formData,
      categoryId: parseInt(formData.categoryId.toString()),
    };

    const res = await fetch("/api/birthdays", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBirthday),
    });

    if (res.ok) {
      const createdBirthday = await res.json();
      onAddBirthday(createdBirthday);
      setButtonText("Birthday added!");
      resetForm();
      setTimeout(() => {
        setButtonText("Add Birthday");
        setIsSubmitting(false);
      }, 2000);
    } else {
      setButtonText("Failed to add birthday");
      setTimeout(() => {
        setButtonText("Add Birthday");
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      birthDate: "",
      notes: "",
      categoryId: 0,
      reminderEnabled: true,
      reminderDays: 7,
    });
  };

  return (
    <form onSubmit={createBirthday} className="space-y-4 mb-8">
      <h2 className="text-xl font-semibold mb-2">Add Birthday Reminder</h2>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
        />
      </div>
      <div>
        <label
          htmlFor="birthDate"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
        />
      </div>
      <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
        />
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="reminderEnabled"
            checked={formData.reminderEnabled}
            onChange={handleInputChange}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">
            Enable reminder
          </span>
        </label>
      </div>
      {formData.reminderEnabled && (
        <div>
          <label
            htmlFor="reminderDays"
            className="block text-sm font-medium text-gray-700"
          >
            Remind me
          </label>
          <input
            id="reminderDays"
            name="reminderDays"
            type="number"
            value={formData.reminderDays}
            onChange={handleInputChange}
            min="1"
            max="30"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
          />
          <span className="text-sm text-gray-500">
            days before the birthday
          </span>
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isSubmitting}
      >
        {buttonText}
      </button>
    </form>
  );
}
