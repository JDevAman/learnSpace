import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Heart, Zap, Globe, Coffee, Gamepad2, GraduationCap } from "lucide-react"

interface CareersPageProps {
  onNavigate: (page: string) => void
}

const roles = [
  { title: "Senior Frontend Engineer", location: "Remote", type: "Full-time" },
  { title: "Backend Engineer (Payments)", location: "Remote", type: "Full-time" },
  { title: "Product Designer", location: "Remote", type: "Contract" },
]

export function CareersPage({ onNavigate }: CareersPageProps) {
  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance plus wellness stipend",
    },
    {
      icon: Zap,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO",
    },
    {
      icon: GraduationCap,
      title: "Learning & Growth",
      description: "$2,000 annual learning budget and conference attendance",
    },
    {
      icon: Coffee,
      title: "Great Perks",
      description: "Free meals, snacks, and premium coffee in all offices",
    },
    {
      icon: Gamepad2,
      title: "Fun Culture",
      description: "Game rooms, team events, and quarterly company retreats",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Work on products used by millions of people worldwide",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar onNavigate={onNavigate} />
      <section className="px-4 pt-28 pb-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-thin text-white">Careers</h1>
          <p className="mb-8 text-slate-400">
            Help us build the future of money movement. We offer competitive compensation, flexible work, and impact.
          </p>
          <div className="space-y-4">
            {roles.map((r) => (
              <div
                key={r.title}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 p-4"
              >
                <div>
                  <p className="text-white">{r.title}</p>
                  <p className="text-sm text-slate-400">
                    {r.location} • {r.type}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("support")}
                  className="rounded-md border border-cyan-500/30 px-3 py-1.5 text-sm text-cyan-300 hover:border-cyan-400"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-thin text-white mb-6">Why Work at KinzokuPay?</h2>
            <p className="text-xl text-slate-400">We believe in taking care of our team</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-slate-900/30 border-slate-800 hover:border-cyan-500/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">KinzokuPay</h3>
              <p className="text-slate-400 text-sm">The future of digital payments, available today.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button onClick={() => onNavigate("home")} className="hover:text-white transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("pricing")} className="hover:text-white transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("documentation")} className="hover:text-white transition-colors">
                    API
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button onClick={() => onNavigate("about")} className="hover:text-white transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("careers")} className="hover:text-white transition-colors">
                    Careers
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("support")} className="hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button onClick={() => onNavigate("support")} className="hover:text-white transition-colors">
                    Help Center
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("documentation")} className="hover:text-white transition-colors">
                    Documentation
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("support")} className="hover:text-white transition-colors">
                    Status
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 KinzokuPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
