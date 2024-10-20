"use client";

import { useState } from "react";
import { Input, Select, Textarea, Button, Checkbox } from "./ui";
import { Category, Birthday } from "@/types";
import { CATEGORIES } from "@/constants";
import { fetchApi, isErrorResponse } from "@/lib/api-helpers";

export interface BirthdayFormProps {
  onAddBirthday: (birthday: Birthday) => void;
}

interface BirthdayFormData {
  name: string;
  birthDate: string;
  notes: string;
  categoryId: number;
  reminderEnabled: boolean;
  reminderDays: number;
}

export default function BirthdayForm({ onAddBirthday }: BirthdayFormProps) {
  const [formData, setFormData] = useState<BirthdayFormData>({
    name: "",
    birthDate: "",
    notes: "",
    categoryId: 0,
    reminderEnabled: true,
    reminderDays: 7,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const createBirthday = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetchApi<Birthday>("/api/birthdays", "POST", {
      name: formData.name,
      birthDate: formData.birthDate,
      notes: formData.notes,
      categoryId: parseInt(formData.categoryId.toString()),
      reminderEnabled: formData.reminderEnabled,
      reminderDays: formData.reminderDays,
    });

    if (isErrorResponse(response)) {
      console.error("Error adding birthday:", response.error);
      alert("Failed to add birthday. Please try again.");
    } else {
      onAddBirthday(response.data);
      resetForm();
      alert("Birthday added successfully!");
    }

    setIsSubmitting(false);
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
      <Input
        label="Name"
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <Input
        label="Date"
        id="birthDate"
        name="birthDate"
        type="date"
        value={formData.birthDate}
        onChange={handleInputChange}
        required
      />
      <Select
        label="Category"
        id="categoryId"
        name="categoryId"
        value={formData.categoryId}
        onChange={handleInputChange}
        required
        options={CATEGORIES.map((category: Category) => ({
          value: category.id,
          label: category.name,
        }))}
      />
      <Textarea
        label="Notes"
        id="notes"
        name="notes"
        value={formData.notes}
        onChange={handleInputChange}
      />
      <Checkbox
        label="Enable reminder"
        name="reminderEnabled"
        checked={formData.reminderEnabled}
        onChange={handleInputChange}
      />

      {formData.reminderEnabled && (
        <Input
          label="Remind me (days before)"
          id="reminderDays"
          name="reminderDays"
          type="number"
          value={formData.reminderDays.toString()}
          onChange={handleInputChange}
          min="1"
          max="30"
        />
      )}
      <Button type="submit" isLoading={isSubmitting}>
        Add Birthday
      </Button>
    </form>
  );
}
