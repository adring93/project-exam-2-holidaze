import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
}

type ButtonLinkProps = {
  children: ReactNode
  to: string
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-slate-950 text-white hover:bg-slate-800',
  secondary:
    'border border-slate-200 bg-white text-slate-700 hover:border-slate-950 hover:text-slate-950',
  danger: 'bg-red-50 text-red-700 hover:bg-red-100',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60'

export function Button({
  children,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonLink({
  children,
  to,
  variant = 'primary',
}: ButtonLinkProps) {
  return (
    <Link to={to} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </Link>
  )
}