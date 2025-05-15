export default function RestrictedPage() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        {/* Divider */}          <h1 className="text-4xl font-bold text-green-600">الاتصالات في الكويت</h1>

        <div className="w-full max-w-md border-t border-gray-300 my-6"></div>
  
        {/* Arabic content about telecommunications in Kuwait */}
        <div className="w-full max-w-md text-right" dir="rtl" lang="ar">
  
          <div className="mt-6 bg-green-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-green-700">نظرة عامة</h3>
            <p className="mt-2">
              تعتبر دولة الكويت من الدول الرائدة في مجال الاتصالات في منطقة الخليج، حيث تتمتع ببنية تحتية متطورة للاتصالات
              وخدمات الإنترنت.
            </p>
          </div>
  
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-700">شركات الاتصالات</h3>
            <ul className="mt-2 space-y-2 text-right">
              <li>• شركة زين - من أكبر مزودي خدمات الاتصالات في الكويت</li>
              <li>• شركة أوريدو - توفر خدمات الجوال والإنترنت</li>
              <li>• شركة stc - تقدم خدمات متكاملة للاتصالات</li>
            </ul>
          </div>
  
          <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-700">خدمات الإنترنت</h3>
            <p className="mt-2">
              تتمتع الكويت بتغطية واسعة لشبكات الجيل الخامس (5G) وتوفر سرعات إنترنت عالية للمستخدمين. كما تعمل هيئة
              الاتصالات وتقنية المعلومات على تنظيم قطاع الاتصالات وضمان جودة الخدمات.
            </p>
          </div>
  
          <div className="mt-4 bg-purple-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-700">مستقبل الاتصالات</h3>
            <p className="mt-2">
              تستثمر الكويت بشكل كبير في تطوير البنية التحتية للاتصالات ضمن رؤية كويت جديدة 2035، مع التركيز على التحول
              الرقمي وتطوير المدن الذكية وتعزيز الاقتصاد الرقمي.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
