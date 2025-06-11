import ZainFooter from "@/components/footer";
import ZainPaymentForm from "@/components/zin-pay";


export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
            <h1 className="text-2xl font-bold text-slate-800 m-4 ">الدفع السريع</h1>

      <main className="flex-grow" dir="rtl">
        <ZainPaymentForm />
      </main>
      <ZainFooter />
    </div>
  )
}
