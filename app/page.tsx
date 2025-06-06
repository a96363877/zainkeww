import ZainFooter from "@/components/footer";
import ZainPaymentForm from "@/components/zin-pay";


export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      <main className="flex-grow" dir="rtl">
        <div className="mt-12 md:mt-12 mx-3 md:max-w-xl md:mx-auto font-extrabold text-2xl mb-4 relative flex justify-between items-center ps-2">
          <span>الدفع السريع</span>
        </div>
        <ZainPaymentForm />
      </main>
      <ZainFooter />
    </div>
  )
}
