"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Globe,
  Smartphone,
  Wifi,
  Users,
  TrendingUp,
  Zap,
  Satellite,
  Radio,
  Network,
  MapPin,
  Activity,
  Building2,
  Cloud,
  Brain,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function GlobalTelecommunications() {
  const [selectedRegion, setSelectedRegion] = useState("global")
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  const globalStats = [
    {
      title: "Global Subscribers",
      value: "8.58B",
      change: "+3.2%",
      icon: <Users className="h-6 w-6" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "5G Coverage",
      value: "35%",
      change: "+12%",
      icon: <Radio className="h-6 w-6" />,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Internet Users",
      value: "5.16B",
      change: "+1.9%",
      icon: <Globe className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Mobile Penetration",
      value: "109%",
      change: "+0.8%",
      icon: <Smartphone className="h-6 w-6" />,
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Avg Speed",
      value: "85 Mbps",
      change: "+15%",
      icon: <Zap className="h-6 w-6" />,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Market Value",
      value: "$1.8T",
      change: "+4.1%",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-pink-500 to-pink-600",
    },
  ]

  const regions = [
    {
      id: "global",
      name: "Global Overview",
      subscribers: "8.58B",
      coverage: "35%",
      avgSpeed: "85 Mbps",
      companies: 2847,
    },
    {
      id: "asia",
      name: "Asia Pacific",
      subscribers: "4.2B",
      coverage: "42%",
      avgSpeed: "95 Mbps",
      companies: 1245,
    },
    {
      id: "europe",
      name: "Europe",
      subscribers: "1.1B",
      coverage: "78%",
      avgSpeed: "120 Mbps",
      companies: 456,
    },
    {
      id: "americas",
      name: "Americas",
      subscribers: "1.8B",
      coverage: "65%",
      avgSpeed: "110 Mbps",
      companies: 678,
    },
    {
      id: "africa",
      name: "Africa",
      subscribers: "1.2B",
      coverage: "18%",
      avgSpeed: "45 Mbps",
      companies: 234,
    },
    {
      id: "middle-east",
      name: "Middle East",
      subscribers: "280M",
      coverage: "55%",
      avgSpeed: "75 Mbps",
      companies: 134,
    },
  ]

  const majorCompanies = [
    {
      name: "China Mobile",
      country: "China",
      subscribers: "975M",
      revenue: "$109B",
      technology: "5G Leader",
      color: "from-red-500 to-red-600",
      icon: <Building2 className="h-6 w-6" />,
    },
    {
      name: "Vodafone Group",
      country: "UK",
      subscribers: "300M",
      revenue: "$52B",
      technology: "IoT Pioneer",
      color: "from-red-400 to-pink-500",
      icon: <Network className="h-6 w-6" />,
    },
    {
      name: "Verizon",
      country: "USA",
      subscribers: "143M",
      revenue: "$136B",
      technology: "5G Ultra",
      color: "from-blue-500 to-indigo-600",
      icon: <Satellite className="h-6 w-6" />,
    },
    {
      name: "AT&T",
      country: "USA",
      subscribers: "230M",
      revenue: "$171B",
      technology: "Fiber Leader",
      color: "from-blue-400 to-cyan-500",
      icon: <Wifi className="h-6 w-6" />,
    },
    {
      name: "Deutsche Telekom",
      country: "Germany",
      subscribers: "242M",
      revenue: "$122B",
      technology: "Edge Computing",
      color: "from-pink-500 to-purple-600",
      icon: <Cloud className="h-6 w-6" />,
    },
    {
      name: "SoftBank",
      country: "Japan",
      subscribers: "88M",
      revenue: "$47B",
      technology: "AI Integration",
      color: "from-yellow-500 to-orange-600",
      icon: <Brain className="h-6 w-6" />,
    },
  ]

  const technologies = [
    {
      id: "5g",
      name: "5G Networks",
      adoption: "35%",
      description: "Next-generation wireless technology with ultra-low latency",
      features: [
        "Speeds up to 20 Gbps theoretical",
        "1ms latency for real-time applications",
        "Massive IoT device connectivity",
        "Network slicing capabilities",
        "Enhanced mobile broadband",
        "Mission-critical communications",
      ],
      regions: {
        "Asia Pacific": "42%",
        Europe: "78%",
        Americas: "65%",
        Africa: "18%",
        "Middle East": "55%",
      },
    },
    {
      id: "fiber",
      name: "Fiber Optic",
      adoption: "68%",
      description: "High-speed internet infrastructure using light signals",
      features: [
        "Gigabit speeds for consumers",
        "Symmetrical upload/download",
        "Low latency and high reliability",
        "Future-proof infrastructure",
        "Support for 8K streaming",
        "Enterprise-grade connectivity",
      ],
      regions: {
        "Asia Pacific": "72%",
        Europe: "85%",
        Americas: "78%",
        Africa: "25%",
        "Middle East": "60%",
      },
    },
    {
      id: "satellite",
      name: "Satellite Internet",
      adoption: "12%",
      description: "Global connectivity through low Earth orbit satellites",
      features: [
        "Global coverage including remote areas",
        "Low Earth orbit constellations",
        "Disaster recovery communications",
        "Maritime and aviation connectivity",
        "Bridging digital divide",
        "Emergency response networks",
      ],
      regions: {
        "Asia Pacific": "8%",
        Europe: "15%",
        Americas: "18%",
        Africa: "22%",
        "Middle East": "12%",
      },
    },
  ]

  const innovations = [
    {
      title: "6G Research",
      description: "Next-generation wireless technology development",
      timeline: "2030+",
      impact: "Revolutionary",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      title: "Quantum Networks",
      description: "Ultra-secure quantum communication systems",
      timeline: "2028+",
      impact: "Transformative",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      title: "AI-Driven Networks",
      description: "Self-optimizing intelligent network infrastructure",
      timeline: "2025+",
      impact: "Significant",
      color: "bg-gradient-to-r from-green-500 to-teal-500",
    },
    {
      title: "Holographic Communications",
      description: "3D holographic video calling and conferencing",
      timeline: "2027+",
      impact: "Revolutionary",
      color: "bg-gradient-to-r from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
              Global Telecommunications
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive overview of the worldwide telecommunications landscape, technologies, and market trends
          </p>
        </motion.div>

        {/* Global Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {globalStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white`}
                >
                  {stat.icon}
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{stat.title}</div>
                  <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Regional Overview */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Regional Overview</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <Card
                key={region.id}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  selectedRegion === region.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedRegion(region.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-lg">{region.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Subscribers</div>
                      <div className="font-semibold text-lg">{region.subscribers}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">5G Coverage</div>
                      <div className="font-semibold text-lg">{region.coverage}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Avg Speed</div>
                      <div className="font-semibold text-lg">{region.avgSpeed}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Companies</div>
                      <div className="font-semibold text-lg">{region.companies}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Major Companies */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Leading Global Operators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {majorCompanies.map((company, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <CardHeader
                  className={`bg-gradient-to-r ${company.color} text-white p-6 group-hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center gap-3">
                    {company.icon}
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <p className="text-white/90 text-sm">{company.country}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subscribers</span>
                      <span className="font-semibold">{company.subscribers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue</span>
                      <span className="font-semibold">{company.revenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Technology</span>
                      <Badge variant="outline">{company.technology}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Global Technologies</h2>
          <div className="space-y-6">
            {technologies.map((tech) => (
              <Card key={tech.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="cursor-pointer" onClick={() => toggleCard(tech.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                        <Activity className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{tech.name}</CardTitle>
                        <p className="text-gray-600 mt-1">{tech.description}</p>
                        <Badge className="mt-2">Global Adoption: {tech.adoption}</Badge>
                      </div>
                    </div>
                    {expandedCard === tech.id ? (
                      <ChevronUp className="h-6 w-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </CardHeader>
                {expandedCard === tech.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-3">Key Features</h4>
                          <div className="space-y-2">
                            {tech.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Regional Adoption</h4>
                          <div className="space-y-3">
                            {Object.entries(tech.regions).map(([region, percentage]) => (
                              <div key={region} className="flex justify-between items-center">
                                <span className="text-sm">{region}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                                    <div
                                      className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                                      style={{ width: percentage }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium">{percentage}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Future Innovations */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">Future Innovations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovations.map((innovation, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`${innovation.color} p-6 text-white`}>
                  <h3 className="text-lg font-bold mb-2">{innovation.title}</h3>
                  <p className="text-white/90 text-sm mb-4">{innovation.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {innovation.timeline}
                    </Badge>
                    <span className="text-xs font-medium">{innovation.impact}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4 text-slate-800">Connect to the Global Network</h3>
              <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg">
                Explore opportunities in the global telecommunications market and stay ahead of technological
                innovations shaping our connected world.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Market Analysis
                </Button>
                <Button size="lg" variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                  Technology Trends
                </Button>
                <Button size="lg" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                  Investment Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
