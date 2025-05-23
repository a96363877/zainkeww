import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"


export const metadata: Metadata = {
  title: "تطبيق االدفع ",
  description: "االدفع السريع والشحن ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
  </head>
      <body>
          {children}
      </body>
    </html>
  )
}
