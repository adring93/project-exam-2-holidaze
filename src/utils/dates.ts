export function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

export function isUpcoming(date: string) {
  return new Date(date) >= new Date()
}