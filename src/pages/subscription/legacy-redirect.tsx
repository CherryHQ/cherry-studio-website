import { Navigate, useLocation } from 'react-router-dom'

export default function LegacySubscriptionRedirect({ to }: { to: string }) {
  const { search, hash } = useLocation()

  return <Navigate to={{ pathname: to, search, hash }} replace />
}
