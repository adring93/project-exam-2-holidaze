import type { ReactNode } from 'react'

type AuthFormProps = {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}

function AuthForm({ eyebrow, title, description, children }: AuthFormProps) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center px-6 py-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          {eyebrow}
        </p>

        <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>

        <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:mt-0">
        {children}
      </div>
    </section>
  )
}

export default AuthForm