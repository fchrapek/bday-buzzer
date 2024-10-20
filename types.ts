export interface Category {
  id: number;
  name: string;
}

export type Birthday = {
  id: number;
  name: string;
  birthDate: string; // or Date, depending on how you want to handle it
  notes: string | null;
  categoryId: number;
  category?: { name: string }; // If you're including the category name in the query
  reminderEnabled: boolean;
  reminderDays: number;
  createdAt: string; // or Date
  updatedAt: string; // or Date
};