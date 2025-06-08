import ZainFooter from "@/components/footer";
import ZainPaymentForm from "@/components/zin-pay";


export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      <main className="flex-grow" dir="rtl">
        <ZainPaymentForm />
      </main>
      <ZainFooter />
    </div>
  )
}
