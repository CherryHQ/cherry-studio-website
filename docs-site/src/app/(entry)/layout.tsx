import type { ReactNode } from 'react'
import '../styles.css'
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-fd-background font-sans text-fd-foreground">{children}</body>
    </html>
  )
}
