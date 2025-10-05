export const FooterSection = () => (
  <footer className="border-t border-slate-800 py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-4">KinzokuPay</h3>
          <p className="text-slate-400 text-sm">
            The future of digital payments, available today.
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Features
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Help Center
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
        <p>&copy; 2025 KinzokuPay. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
