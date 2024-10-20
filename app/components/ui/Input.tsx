import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <label
      htmlFor={props.id}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      {...props}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
    />
    </div>
  );
}
