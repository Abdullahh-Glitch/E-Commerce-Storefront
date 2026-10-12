const styles = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-indigo-100 text-indigo-800',
  on_the_way: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const labels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  on_the_way: 'On the Way',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        styles[status] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {labels[status] || status}
    </span>
  )
}