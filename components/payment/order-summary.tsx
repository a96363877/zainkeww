"use client"

interface OrderSummaryProps {
  selectedAmount: number
  discountAmount?: number
  discountPercentage?: number
  fees: number
  total: number
}

export function OrderSummary({
  selectedAmount,
  discountAmount = 0,
  discountPercentage = 0,
  fees,
  total,
}: OrderSummaryProps) {
  const hasDiscount = discountAmount > 0

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-[#2d1a45] mb-4 text-right">ملخص الطلب</h3>

      <div className="space-y-3">
        {/* Original Amount */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">المبلغ الأصلي</span>
          <span className={`font-medium ${hasDiscount ? "line-through text-gray-400" : "text-[#2d1a45]"}`}>
            {selectedAmount.toFixed(3)} د.ك
          </span>
        </div>

        {/* Discount */}
        {hasDiscount && (
          <div className="flex justify-between items-center animate-fade-in">
            <span className="text-green-600 font-medium">خصم {discountPercentage}%</span>
            <span className="text-green-600 font-medium">-{discountAmount.toFixed(3)} د.ك</span>
          </div>
        )}

        {/* Amount after discount */}
        {hasDiscount && (
          <div className="flex justify-between items-center">
            <span className="text-[#2d1a45] font-medium">المبلغ بعد الخصم</span>
            <span className="text-[#2d1a45] font-medium">{(selectedAmount - discountAmount).toFixed(3)} د.ك</span>
          </div>
        )}

        {/* Fees */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">رسوم الخدمة</span>
          <span className="text-gray-600">{fees.toFixed(3)} د.ك</span>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#2d1a45]">المجموع</span>
          <div className="text-left">
            <span className="text-lg font-bold text-[#2d1a45]">{total.toFixed(3)} د.ك</span>
            {hasDiscount && (
              <div className="text-sm text-green-600 animate-pulse">وفرت {discountAmount.toFixed(3)} د.ك</div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
