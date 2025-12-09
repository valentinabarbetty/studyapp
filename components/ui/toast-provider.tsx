"use client"

import { useEffect, useState } from "react"

export function ToastProvider() {
  const [mounted, setMounted] = useState(false)

  // Asegura que solo se renderice en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      id="toast-root"
      className="fixed top-6 right-6 z-[9999] space-y-3 pointer-events-none"
    />
  )
}
