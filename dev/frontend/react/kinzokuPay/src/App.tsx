import { Layout } from "./components/Layout";
import { Card } from "./components/Card";
import "./App.css";

function App() {
  return (
    <Layout>
      <main className="flex items-center justify-center min-h-screen px-4">
        <Card glowing variant="accent" className="p-8 max-w-md text-center">
          <h1 className="text-3xl font-bold text-cyan-400 mb-4">
            Welcome to kinzokuPay
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Your trusted futuristic payment App.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors duration-200">
              Get Started
            </button>
            <button className="px-6 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 font-semibold rounded-lg transition-colors duration-200">
              Learn More
            </button>
          </div>
        </Card>
      </main>
    </Layout>
  );
}

export default App;
