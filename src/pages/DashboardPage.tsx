import { motion } from 'motion/react';
import { TrendingUp, CheckCircle, XCircle, Clock, Search, Key } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: "Verifications Today", value: "1,284", icon: Search, color: "text-teal" },
    { label: "Accuracy Rate", value: "99.2%", icon: CheckCircle, color: "text-green-500" },
    { label: "Daily Active Users", value: "45.2K", icon: TrendingUp, color: "text-gold" },
    { label: "API Calls/Month", value: "1.2M", icon: Key, color: "text-navy" },
  ];

  const history = [
    { claim: "New tax law passed in midnight session", verdict: "False", date: "2 mins ago" },
    { claim: "ISRO launches 100 satellites in one go", verdict: "Verified", date: "1 hour ago" },
    { claim: "Viral video of flood in Mumbai", verdict: "Unclear", date: "3 hours ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div>
          <h1 className="text-5xl lg:text-6xl font-display font-extrabold text-slate-900 mb-4 tracking-tight">Dashboard</h1>
          <p className="text-xl text-slate-500 font-medium">Welcome back, Nitish. Here's your truth-seeking overview.</p>
        </div>
        <div className="flex items-center space-x-3 bg-primary/5 text-primary px-6 py-3 rounded-2xl font-extrabold border border-primary/10 shadow-sm">
          <ShieldCircle className="h-6 w-6" />
          <span>Premium Member</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-slate-50 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-4xl font-display font-extrabold text-slate-900">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-2xl font-display font-extrabold text-slate-900">Recent Verifications</h2>
              <button className="text-primary font-extrabold text-sm hover:underline uppercase tracking-wider">View All</button>
            </div>
            <div className="divide-y divide-slate-100">
              {history.map((item, i) => (
                <div key={i} className="p-10 flex items-center justify-between hover:bg-slate-50 transition-all group">
                  <div className="flex items-center space-x-6">
                    <div className={`p-3 rounded-xl ${item.verdict === 'Verified' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                      {item.verdict === 'Verified' ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{item.claim}</p>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-widest ${
                    item.verdict === 'Verified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                  }`}>
                    {item.verdict}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary rounded-2xl">
                <Key className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-display font-extrabold">B2B API Access</h2>
            </div>
            <div className="space-y-6 relative z-10">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-xs text-slate-400 mb-3 uppercase font-extrabold tracking-widest">Your API Key</p>
                <div className="flex items-center justify-between gap-4">
                  <code className="text-primary font-mono font-bold truncate">vt_live_928...382</code>
                  <button className="p-2 bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button className="w-full py-4 bg-primary text-white font-extrabold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                Manage API Limits
              </button>
            </div>
          </motion.div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-display font-extrabold text-slate-900 mb-6">Usage Limits</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-slate-500 uppercase tracking-wider">Checks Remaining</span>
                  <span className="text-primary">Unlimited</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-full"></div>
                </div>
              </div>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">You are currently on the <span className="text-primary font-bold">Premium Plan</span>. Your limits reset in 12 days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function Copy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
