import { Button } from "../../components/Button/Button";

interface CTASectionProps {
  onNavigate: (route: string) => void;
}

export const CTASection = ({ onNavigate }: CTASectionProps) => (
  <section className="py-20 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-thin text-white mb-4">
        Ready to Get Started?
      </h2>
      <p className="text-xl text-slate-400 mb-8">
        Join millions of users who trust KinzokuPay for their financial needs
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="glow" size="lg" onClick={() => onNavigate("auth")}>
          Create Your Account
        </Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </div>
    </div>
  </section>
);
