import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flag, AlertTriangle, CheckCircle, Clock, Send, Users, XCircle, TrendingUp } from 'lucide-react';

interface FlaggedItem {
  id: number;
  content: string;
  status: 'Pending' | 'Reviewed';
  verdict: string | null;
  flags: number;
}

export default function CommunityPage() {
  const [flags, setFlags] = useState<FlaggedItem[]>([]);
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    fetch('/api/community/flags')
      .then(res => res.json())
      .then(data => setFlags(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const res = await fetch('/api/community/flag', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newContent })
    });
    const data = await res.json();
    setFlags([data, ...flags]);
    setNewContent('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-sm font-bold mb-6">
              <Users className="h-4 w-4 mr-2" />
              Community Intelligence
            </div>
            <h1 className="text-5xl lg:text-6xl font-display font-extrabold text-slate-900 mb-8 tracking-tight">Flagged Content</h1>
          </motion.div>
          
          <div className="space-y-8">
            {flags.map((item) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                {item.status === 'Reviewed' && (
                  <div className="absolute top-0 right-0 px-6 py-2 bg-emerald-500 text-white text-xs font-bold rounded-bl-2xl flex items-center space-x-2">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span className="uppercase tracking-widest">Reviewed</span>
                  </div>
                )}
                
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-rose-50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    <Flag className="h-8 w-8 text-rose-500" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-xl font-bold text-slate-900 mb-4 leading-tight">{item.content}</p>
                    <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400">
                      <span className="flex items-center space-x-2 px-3 py-1 bg-slate-50 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span>{item.flags} reports</span>
                      </span>
                      <span className="flex items-center space-x-2 px-3 py-1 bg-slate-50 rounded-lg">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="uppercase tracking-wider">{item.status}</span>
                      </span>
                    </div>
                    {item.verdict && (
                      <div className={`mt-6 p-4 rounded-xl text-sm font-extrabold inline-flex items-center gap-2 ${
                        item.verdict === 'False' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {item.verdict === 'False' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        <span>Official Verdict: {item.verdict}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary text-white p-10 rounded-[3rem] shadow-2xl shadow-primary/20 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <h2 className="text-3xl font-display font-extrabold mb-4 relative z-10">Flag Content</h2>
            <p className="text-primary-100 mb-8 font-medium leading-relaxed relative z-10">Help us identify misinformation. Our AI + Human hybrid team will review it within 24 hours.</p>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Describe the suspicious content or paste a link..."
                className="w-full h-40 bg-white/10 border border-white/20 rounded-2xl p-6 text-white placeholder-white/30 focus:ring-4 focus:ring-white/5 focus:border-white/40 resize-none transition-all font-medium"
              />
              <button
                type="submit"
                className="w-full py-4 bg-white text-primary font-extrabold rounded-2xl flex items-center justify-center space-x-3 hover:bg-slate-50 transition-all transform active:scale-95 shadow-xl shadow-black/10"
              >
                <Send className="h-5 w-5" />
                <span>Submit Report</span>
              </button>
            </form>
          </motion.div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-display font-extrabold text-slate-900 mb-8">Review Status</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">Pending Review</span>
                <span className="px-4 py-1 bg-amber-50 text-amber-600 rounded-full font-extrabold text-sm">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">Reviewed Today</span>
                <span className="px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full font-extrabold text-sm">89</span>
              </div>
              <div className="pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-400">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">98.4% Accuracy Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
