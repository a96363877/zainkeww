import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"
import Analytics from "./analytics"


export const metadata: Metadata = {
  title: "Zain App",
  description: "Zain APP ",
  keywords:"باقات زي,  شحن رصيد زين,  عروض زين,  عروض زين للانترنت,  عروض زين الكويت,  zain kw,  رصيد زين,  باقات زين للانترنت,  عروض زين نت, تعبئة رصيد زين,  باقات زين مسبقة الدفع,  شريحة زين,  شركة زين الكويت,  zain net package,  باقات الإنترنت زين,  عروض زين مسبقة الدفع,  شحن زين,  نت زين,  شركة زين,  عروض نت زين,  طلب شريحة زين,  عروض زين الشهرية,  باقات زين للانترنت اللامحدود, عروض انترنت,  انترنت زين"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  </head>
      <body>
        
          {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=AW-322857929`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-322857929');
          `}
        </Script>
        <Analytics/>
      </body>
    </html>
  )
}
