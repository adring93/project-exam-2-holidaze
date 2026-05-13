import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
}

function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        className={`mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950 ${className}`}
        {...props}
      />
    </div>
  )
}

export default Input