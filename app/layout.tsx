import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "الاتصالات في الكويت ",
  description: "استكشف عالم الاتصالات المتطور في دولة الكويت مع أحدث التقنيات والخدمات الرقمية المبتكرة الدفع السريع والشحن",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
    <body>
    <header className="bg-gradient-to-l from-[#2b224d] to-[#1e1236] p-2 flex justify-between items-center shadow-md relative my-4 ">
     
     <div className="absolute right-0 left-0 flex justify-center pointer-events-none">
       <img src="/top.png" alt="Zain Logo" className="object-contain" />
     </div>
   </header>

      {children}</body>
  </html>
  )
}
