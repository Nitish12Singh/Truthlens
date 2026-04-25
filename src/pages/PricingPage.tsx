import { motion } from 'motion/react';
import { Check, Shield, Zap, Globe } from 'lucide-react';

export default function PricingPage() {
  const tiers = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      desc: "For individual users checking daily news.",
      features: ["10 fact-checks per day", "Basic source database", "Community flagging", "Hindi & English support"],
      button: "Current Plan",
      highlight: false
    },
    {
      name: "Premium",
      price: "₹49",
      period: "/month",
      desc: "For power users and truth seekers.",
      features: ["Unlimited fact-checks", "Advanced source analytics", "Priority review queue", "Premium badge", "Ad-free experience"],
      button: "Upgrade Now",
      highlight: true
    },
    {
      name: "API Plan",
      price: "₹15,000",
      period: "/month",
      desc: "For B2B clients and news agencies.",
      features: ["100k API calls/month", "Real-time verification API", "Custom integration support", "Dashboard analytics", "Dedicated account manager"],
      button: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 lg:py-32">
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold mb-6"
        >
          <Zap className="h-4 w-4 mr-2" />
          Flexible Plans
        </motion.div>
        <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-slate-900 mb-8 tracking-tight">Simple Pricing</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Choose the plan that fits your needs. Help us keep the internet safe from misinformation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {tiers.map((tier, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-10 rounded-[3rem] border transition-all duration-500 flex flex-col ${
              tier.highlight 
                ? 'bg-slate-900 text-white border-primary shadow-2xl shadow-primary/20 scale-105 z-10' 
                : 'bg-white text-slate-900 border-slate-100 shadow-xl shadow-slate-200/50'
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-primary/20">
                Most Popular
              </div>
            )}
            
            <div className="mb-10">
              <h3 className="text-2xl font-display font-extrabold mb-4 uppercase tracking-wider">{tier.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-6xl font-display font-extrabold tracking-tighter">{tier.price}</span>
                <span className={`text-lg font-bold ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{tier.period}</span>
              </div>
              <p className={`text-lg font-medium leading-relaxed ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{tier.desc}</p>
            </div>
            
            <ul className="space-y-5 mb-12 flex-grow">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start space-x-4 text-base font-bold">
                  <div className={`p-1 rounded-full mt-0.5 ${tier.highlight ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}>
                    <Check className="h-4 w-4" />
                  </div>
                  <span className={tier.highlight ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-5 rounded-2xl font-extrabold text-lg transition-all transform active:scale-95 ${
              tier.highlight 
                ? 'bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}>
              {tier.button}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
