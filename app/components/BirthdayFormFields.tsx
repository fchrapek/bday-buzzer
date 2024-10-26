import React from 'react';
import { Input, Select, Textarea, Checkbox } from "./ui";
import { Category, Birthday } from "@/types";
import { CATEGORIES } from "@/constants";

interface BirthdayFormFieldsProps {
  formData: Partial<Birthday>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function BirthdayFormFields({ formData, onChange }: BirthdayFormFieldsProps) {
  return (
    <>
      <Input
        label="Name"
        id="name"
        name="name"
        type="text"
        value={formData.name || ''}
        onChange={onChange}
        required
      />
      <Input
        label="Date"
        id="birthDate"
        name="birthDate"
        type="date"
        value={formData.birthDate || ''}
        onChange={onChange}
        required
      />
      <Select
        label="Category"
        id="categoryId"
        name="categoryId"
        value={formData.categoryId?.toString() || ''}
        onChange={onChange}
        required
        options={CATEGORIES.map((category: Category) => ({
          value: category.id.toString(),
          label: category.name,
        }))}
      />
      <Textarea
        label="Notes"
        id="notes"
        name="notes"
        value={formData.notes || ''}
        onChange={onChange}
      />
      <Checkbox
        label="Enable reminder"
        name="reminderEnabled"
        checked={formData.reminderEnabled || false}
        onChange={onChange}
      />
      {formData.reminderEnabled && (
        <Input
          label="Remind me (days before)"
          id="reminderDays"
          name="reminderDays"
          type="number"
          value={formData.reminderDays?.toString() || ''}
          onChange={onChange}
          min="1"
          max="30"
        />
      )}
    </>
  );
}

