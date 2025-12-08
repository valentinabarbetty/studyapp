import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'StudyQuest - Gamifica tu Estudio',
  description: 'App de estudio gamificada con XP, niveles, insignias y grupos cooperativos',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">

        {children}

        {/* 📌 CONTENEDOR GLOBAL DE TOASTS (notificaciones a la derecha) */}
        <div 
          id="toast-root" 
          className="fixed top-6 right-6 z-[9999] space-y-3"
        />

        <Analytics />
      </body>
    </html>
  )
}
