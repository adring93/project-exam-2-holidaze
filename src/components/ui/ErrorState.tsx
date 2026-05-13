type ErrorStateProps = {
  message: string
}

function ErrorState({ message }: ErrorStateProps) {
  return (
    <p className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
      {message}
    </p>
  )
}

export default ErrorState