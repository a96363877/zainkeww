import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"


export const metadata: Metadata = {
  title: "Zain App",
  description: "Zain APP ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=AW-410329319`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-410329319');
          `}
        </Script>
      </body>
    </html>
  )
}
