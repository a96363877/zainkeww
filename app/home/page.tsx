"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Smartphone, Wifi, Globe, Zap, Users, TrendingUp, Shield, Star, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function TelecommunicationsInfo() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  const telecomCompanies = [
    {
      name: "زين الكويت",
      description: "الرائدة في خدمات الاتصالات المتنقلة والإنترنت",
      features: ["شبكة 5G متطورة", "خدمات الدفع الرقمي", "تغطية شاملة"],
      color: "from-[#d13c8c] to-[#e04c9c]",
      icon: <Smartphone className="h-6 w-6" />,
    },
    {
      name: "أوريدو الكويت",
      description: "حلول اتصالات متكاملة للأفراد والشركات",
      features: ["إنترنت فائق السرعة", "خدمات الأعمال", "تقنيات متقدمة"],
      color: "from-red-500 to-red-600",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      name: "stc الكويت",
      description: "شبكة اتصالات حديثة وخدمات رقمية مبتكرة",
      features: ["تقنية 5G", "الحلول السحابية", "الأمن السيبراني"],
      color: "from-purple-500 to-purple-600",
      icon: <Zap className="h-6 w-6" />,
    },
  ]

  const services = [
    {
      id: "mobile",
      title: "خدمات الهاتف المتنقل",
      icon: <Smartphone className="h-8 w-8" />,
      description: "شبكات متطورة تدعم تقنيات الجيل الخامس مع تغطية شاملة في جميع أنحاء الكويت",
      details: [
        "تغطية 5G في المناطق الحضرية الرئيسية",
        "باقات مرنة تناسب جميع الاحتياجات",
        "خدمات التجوال الدولي",
        "تطبيقات ذكية لإدارة الحساب",
      ],
    },
    {
      id: "internet",
      title: "خدمات الإنترنت",
      icon: <Wifi className="h-8 w-8" />,
      description: "إنترنت عالي السرعة للمنازل والشركات مع ضمان الاستقرار والأمان",
      details: [
        "سرعات تصل إلى 1 جيجابت في الثانية",
        "شبكة ألياف بصرية متطورة",
        "خدمة عملاء على مدار الساعة",
        "حلول مخصصة للشركات",
      ],
    },
    {
      id: "digital",
      title: "الخدمات الرقمية",
      icon: <Globe className="h-8 w-8" />,
      description: "حلول رقمية متكاملة تشمل الدفع الإلكتروني والخدمات السحابية",
      details: ["محافظ رقمية آمنة", "خدمات الدفع الإلكتروني", "التخزين السحابي", "أمان المعلومات المتقدم"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#d13c8c] to-[#e04c9c] rounded-full flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2d1a45] to-[#d13c8c] bg-clip-text text-transparent">
              الاتصالات في الكويت
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            استكشف عالم الاتصالات المتطور في دولة الكويت مع أحدث التقنيات والخدمات الرقمية المبتكرة
          </p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="text-center p-4 border-0 shadow-md">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">4.8M+</div>
              <div className="text-sm text-gray-600">مشترك</div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 border-0 shadow-md">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">95%</div>
              <div className="text-sm text-gray-600">تغطية 5G</div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 border-0 shadow-md">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">1GB/s</div>
              <div className="text-sm text-gray-600">أقصى سرعة</div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 border-0 shadow-md">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-800">99.9%</div>
              <div className="text-sm text-gray-600">موثوقية الشبكة</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Telecom Companies Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-[#2d1a45]">شركات الاتصالات الرائدة</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {telecomCompanies.map((company, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <CardHeader className={`bg-gradient-to-r ${company.color} text-white p-6`}>
                  <div className="flex items-center gap-3">
                    {company.icon}
                    <CardTitle className="text-xl">{company.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{company.description}</p>
                  <div className="space-y-2">
                    {company.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-[#2d1a45]">الخدمات والحلول</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <Card key={service.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="cursor-pointer" onClick={() => toggleCard(service.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#d13c8c] to-[#e04c9c] rounded-full flex items-center justify-center text-white">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-[#2d1a45]">{service.title}</CardTitle>
                        <p className="text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                    {expandedCard === service.id ? (
                      <ChevronUp className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </CardHeader>
                {expandedCard === service.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="pt-0">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 text-[#2d1a45]">المميزات الرئيسية:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {service.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#d13c8c] rounded-full"></div>
                              <span className="text-sm text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Future Vision Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#2d1a45] to-[#d13c8c] text-white p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">رؤية الكويت 2035</h2>
                  <p className="text-white/90">مستقبل الاتصالات والتحول الرقمي</p>
                </div>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#2d1a45]">الأهداف الاستراتيجية</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        1
                      </Badge>
                      <div>
                        <h4 className="font-medium">التحول الرقمي الشامل</h4>
                        <p className="text-sm text-gray-600">رقمنة جميع الخدمات الحكومية والخاصة</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        2
                      </Badge>
                      <div>
                        <h4 className="font-medium">المدن الذكية</h4>
                        <p className="text-sm text-gray-600">تطوير بنية تحتية ذكية ومستدامة</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        3
                      </Badge>
                      <div>
                        <h4 className="font-medium">الاقتصاد الرقمي</h4>
                        <p className="text-sm text-gray-600">تعزيز الابتكار والريادة التقنية</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[#2d1a45]">الاستثمارات المستقبلية</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-800">شبكات الجيل السادس (6G)</h4>
                      <p className="text-sm text-blue-600 mt-1">تطوير تقنيات الاتصال المستقبلية</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-800">الذكاء الاصطناعي</h4>
                      <p className="text-sm text-green-600 mt-1">دمج الذكاء الاصطناعي في الخدمات</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-800">إنترنت الأشياء</h4>
                      <p className="text-sm text-purple-600 mt-1">ربط الأجهزة والخدمات الذكية</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-r from-[#d13c8c]/10 to-[#e04c9c]/10">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-[#2d1a45]">انضم إلى مستقبل الاتصالات</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                اكتشف أحدث الخدمات والعروض من شركات الاتصالات الرائدة في الكويت واستمتع بتجربة رقمية متميزة
              </p>
             
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
