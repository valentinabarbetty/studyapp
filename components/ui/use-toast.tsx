"use client"

export function showToast(message: string) {
  const root = document.getElementById("toast-root")
  if (!root) return

  const toast = document.createElement("div")
  toast.className =
    "bg-card border border-primary/30 shadow-xl p-4 rounded-xl text-foreground w-72 animate-slide-in backdrop-blur-md"
  toast.innerHTML = `
    <p class="font-semibold mb-1">📢 Aviso</p>
    <p class="text-sm text-muted-foreground">${message}</p>
  `

  root.appendChild(toast)

  // Auto-remover con animación
  setTimeout(() => {
    toast.classList.add("animate-slide-out")
    setTimeout(() => toast.remove(), 300)
  }, 4000)
}
