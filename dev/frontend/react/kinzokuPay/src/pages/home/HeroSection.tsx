import { Button } from "../../components/Button/Button";
import { AuthCard } from "../../components/Card/AuthCard";
import { InputField } from "../../components/Form/InputField";
import { Github } from "lucide-react";
import { useAppNavigation } from "../../utils/useAppNavigation";

export function HeroSection() {
  const {goToSignUp} = useAppNavigation();
  return (
    <section className="relative pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-thin text-white mb-6">
            Join the{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Future
            </span>{" "}
            of Payments
          </h1>
          <p className="text-xl text-slate-400 mb-8 leading-relaxed">
            Experience seamless, secure, and instant money transfers with
            KinzokuPay. Built for the digital age with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="glow" size="lg" onClick={goToSignUp}>
              Create Free Account
            </Button>
            <Button variant="outline" size="lg">
              See Testimonials
            </Button>
          </div>
        </div>
        <div className="lg:pl-12">
          <AuthCard title="Quick Sign Up" subtitle="Get started in seconds">
            <div className="space-y-4">
              <InputField type="email" placeholder="Enter your email" />
              <Button variant="glow" className="w-full">
                Get Started
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full bg-transparent">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    {/* Google SVG paths */}
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Github className="w-5 h-5 mr-2" /> GitHub
                </Button>
              </div>
            </div>
          </AuthCard>
        </div>
      </div>
    </section>
  );
}
