import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function Textarea({ label, ...props }: TextareaProps) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        {...props}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
      />
    </div>
  );
}
