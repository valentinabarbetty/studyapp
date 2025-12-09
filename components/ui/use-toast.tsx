export function showToast(message: string) {
  const container = document.getElementById("toast-root")
  if (!container) return

  const toast = document.createElement("div")
  toast.className = "bg-primary text-white px-4 py-2 rounded-xl shadow-lg animate-slide-in"
  toast.textContent = message

  container.appendChild(toast)

  setTimeout(() => {
    toast.style.opacity = "0"
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}
