import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "الاتصالات في الكويت ",
  description: "استكشف عالم الاتصالات المتطور في دولة الكويت مع أحدث التقنيات والخدمات الرقمية المبتكرة  لدفع السريع والشحن",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    </head>
    <body>{children}</body>
  </html>
  )
}
