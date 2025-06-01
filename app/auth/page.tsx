"use client"

import { Menu, QrCode } from "lucide-react"
import Link from "next/link"

export default function KuwaitMobileID() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-white rounded-full transform translate-x-32"></div>
        <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-white rounded-full transform -translate-x-24"></div>
      </div>

    


      {/* Language selector */}
      <div className="px-6 mb-8">
        <div className="inline-block bg-black/20 rounded-full px-4 py-2">
          <span className="text-white text-sm font-medium">English</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center px-6 flex-1 relative z-10">
        {/* Phone illustration */}
        <div className="mb-8 relative">
          <div className="w-48 h-80 bg-white rounded-3xl shadow-2xl p-4 transform rotate-12">
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl relative overflow-hidden">
              {/* Kuwait emblem on card */}
              <div className="absolute top-4 left-4">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-blue-800 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* ID Card content */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-2 bg-gray-300 rounded mb-1"></div>
                      <div className="h-2 bg-gray-300 rounded w-3/4 mb-1"></div>
                      <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-white text-2xl font-bold mb-2">
            <span className="text-yellow-400">Kuwait</span> Mobile ID
          </h1>
          <h2 className="text-white text-3xl font-bold" style={{ fontFamily: "Arial, sans-serif" }}>
            هـــويــتــي
          </h2>
        </div>

        {/* buttons */}
        <div className="w-full max-w-sm space-y-4">
          <Link href="https://apps.apple.com/kw/app/kuwait-mobile-id-%D9%87%D9%88%D9%8A%D8%AA%D9%8A/id1449712307">
          <button
            className="w-full bg-white text-blue-800 hover:bg-gray-100 font-semibold py-4 text-lg rounded-xl"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            فتح التطبيق
          </button>
          </Link>


        </div>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-6 pt-8">
        <div className="w-32 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  )
}
