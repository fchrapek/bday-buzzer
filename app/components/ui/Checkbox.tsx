import React from 'react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center">
    <input
      type="checkbox"
      {...props}
      className={`mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${props.className || ''}`}
    />
    <label htmlFor={props.id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
  </div>
  );
}
