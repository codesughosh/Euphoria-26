import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({ label, id, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs uppercase tracking-widest text-[var(--muted)]">
        {label}
      </label>
      <input
        id={id}
        className="rounded-lg px-4 py-3 text-sm w-full"
        {...props}
      />
    </div>
  );
}
