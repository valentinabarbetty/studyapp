"use client"

import { Suspense } from "react"
import CompleteContent from "./content"

export default function CompletePage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Cargando...</div>}>
      <CompleteContent />
    </Suspense>
  )
}
