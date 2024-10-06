export interface Category {
  id: number;
  name: string;
}

export interface BirthdayFormData {
  name: string;
  birthDate: string;
  notes: string;
  categoryId: number;
  reminderEnabled: boolean;
  reminderDays: number;
}

export interface Birthday extends BirthdayFormData {
  id: number;
  category: Category;
}

export interface BirthdayFormProps {
  onAddBirthday: (birthday: Birthday) => void;
}

export interface BirthdayListProps {
  birthdays: Birthday[];
}