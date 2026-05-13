type LoadingStateProps = {
  message?: string
}

function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <p className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
      {message}
    </p>
  )
}

export default LoadingState