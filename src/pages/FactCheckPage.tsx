import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, CheckCircle2, XCircle, HelpCircle, ExternalLink, AlertTriangle, Flag, Globe } from 'lucide-react';
import { factCheck, FactCheckResult } from '../services/geminiService';

export default function FactCheckPage() {
  const { t } = useTranslation();
  const [claim, setClaim] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);

  const handleCheck = async () => {
    if (!claim.trim()) return;
    setLoading(true);
    try {
      const res = await factCheck(claim);
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'Verified': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'False': return 'text-rose-600 bg-rose-50 border-rose-200';
      default: return 'text-amber-600 bg-amber-50 border-amber-200';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Verified': return <CheckCircle2 className="h-10 w-10" />;
      case 'False': return <XCircle className="h-10 w-10" />;
      default: return <HelpCircle className="h-10 w-10" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold mb-6"
        >
          <Search className="h-4 w-4 mr-2" />
          Real-Time Verification
        </motion.div>
        <h1 className="text-5xl lg:text-6xl font-display font-extrabold text-slate-900 mb-6 tracking-tight">Fact-Check Engine</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Paste any claim, news headline, or URL to verify its authenticity with AI precision.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 lg:p-12 mb-12 border border-slate-100">
        <div className="relative">
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder={t('input_placeholder')}
            className="w-full h-48 p-6 rounded-3xl border border-slate-200 focus:ring-4 focus:ring-primary/5 focus:border-primary resize-none transition-all text-lg font-medium placeholder:text-slate-400"
          />
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCheck}
              disabled={loading || !claim.trim()}
              className="btn-primary text-lg px-10 py-4"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Search className="h-6 w-6" />}
              <span>{t('check_button')}</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className={`p-10 rounded-[2.5rem] border-2 flex flex-col md:flex-row items-center gap-8 ${getVerdictColor(result.verdict)}`}>
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                {getVerdictIcon(result.verdict)}
              </div>
              <div className="text-center md:text-left flex-grow">
                <h2 className="text-4xl font-display font-extrabold mb-2">{result.verdict}</h2>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-current transition-all duration-1000" style={{ width: `${result.score}%` }}></div>
                  </div>
                  <p className="text-xl font-bold opacity-80">{t('credibility_score')}: {result.score}%</p>
                </div>
              </div>
              <button className="btn-primary bg-white text-slate-900 hover:bg-slate-50 shadow-none border border-slate-200">
                <Flag className="h-5 w-5" />
                Report Error
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-display font-extrabold mb-6 flex items-center gap-3 text-slate-900">
                  <AlertTriangle className="h-6 w-6 text-gold" />
                  <span>{t('reasoning')}</span>
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed font-medium whitespace-pre-wrap">{result.reasoning}</p>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-display font-extrabold mb-6 flex items-center gap-3 text-slate-900">
                  <ExternalLink className="h-6 w-6 text-highlight" />
                  <span>{t('sources_context')}</span>
                </h3>
                <ul className="space-y-6">
                  {result.sources.map((source, i) => (
                    <li key={i}>
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                      >
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors">
                          <Globe className="h-4 w-4 text-slate-400" />
                        </div>
                        <span className="text-slate-700 font-bold group-hover:text-primary transition-colors leading-tight">
                          {source.title}
                        </span>
                      </a>
                    </li>
                  ))}
                  {result.sources.length === 0 && (
                    <div className="text-center py-8">
                      <HelpCircle className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-400 font-medium italic">No direct sources found.</p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
