"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, Menu, Heart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function ZainPayment() {
  const [activeTab, setActiveTab] = useState("bill")

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-right" dir="rtl">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-[#1a0933] to-[#2d1155] w-full z-20 md:z-auto relative">
        <button className="text-white">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-4">
          <Heart className="text-white" size={24} />
          <div className="h-10 w-px bg-white/20"></div>
          <div className="bg-white rounded-full p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L21.16 4.96L19.42 4H19.41L18.31 6L15.55 11H8.53L8.4 10.73L6.16 6L5.21 4L4.27 2H1V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.29 15 7.17 14.89 7.17 14.75Z"
                fill="#6b21a8"
              />
            </svg>
          </div>
        </div>
        <div className="w-24">
          <Image
            src="/next.svg"
            alt="Zain Logo"
            width={100}
            height={40}
            className="object-contain"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <h1 className="text-2xl font-bold mb-6">الدفع السريع</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <Tabs defaultValue="bill" className="w-full">
            <TabsList className="w-full grid grid-cols-2 rounded-none">
              <TabsTrigger
                value="bill"
                className="py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#e91e63] data-[state=active]:text-[#e91e63] rounded-none"
              >
                دفع الفاتورة
              </TabsTrigger>
              <TabsTrigger
                value="recharge"
                className="py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#e91e63] data-[state=active]:text-[#e91e63] rounded-none"
              >
                إعادة تعبئة eeZee
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bill" className="p-5">
              <div className="mb-6">
                <p className="mb-4">أود الدفع لـ</p>
                <div className="flex items-center justify-between border-b pb-2">
                  <span>رقم آخر</span>
                  <ChevronDown className="text-[#e91e63]" />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-red-500">*</span>
                  <label htmlFor="phone" className="font-medium">
                    رقم الهاتف
                  </label>
                </div>
                <Input
                  id="phone"
                  placeholder="أدخل الرقم: 99XXXXXX"
                  className="text-right border-b border-t-0 border-x-0 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-400"
                />
              </div>

              <div className="mb-6">
                <p className="text-center mb-4">يرجى القبول لعرض الفاتورة</p>
                <div className="border p-4 rounded flex items-center justify-between">
                  <Checkbox id="captcha" />
                  <div className="flex items-center gap-2">
                    <span>أنا لست برنامج روبوت</span>
                    <Image
                      src="/capsh.png"
                      alt="reCAPTCHA"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex justify-end text-xs text-gray-500 mt-1">
                  <span>خصوصية - شروط</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recharge">
              <div className="p-5">
                <p>محتوى إعادة التعبئة</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Button
          variant="outline"
          className="w-full py-6 flex items-center justify-center gap-2 bg-gray-200 text-gray-500 rounded-md mb-6"
        >
          <Plus size={20} />
          <span>أضف رقم آخر</span>
        </Button>

        <div className="border-t pt-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-green-500">د.ك 0.000</div>
            <div className="text-xl font-bold">إجمالي</div>
          </div>
        </div>

        <Button className="w-full py-6 bg-[#d12b8a] text-white hover:text-[#d12b8a] hover:bg-gray-50 hover:border border-[#d12b8a] font-bold rounded-md">ادفع الآن</Button>
      </main>
    </div>
  )
}

