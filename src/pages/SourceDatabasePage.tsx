import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Shield, TrendingUp, AlertCircle } from 'lucide-react';

interface Source {
  id: number;
  name: string;
  trustScore: number;
  bias: string;
  accuracy: number;
}

export default function SourceDatabasePage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/sources')
      .then(res => res.json())
      .then(data => setSources(data));
  }, []);

  const filteredSources = sources.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-bold mb-6"
        >
          <Shield className="h-4 w-4 mr-2" />
          Trusted Sources Database
        </motion.div>
        <h1 className="text-5xl lg:text-6xl font-display font-extrabold text-slate-900 mb-6 tracking-tight">Source Credibility</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl">A searchable database of 500+ news sources with trust scores and reliability ratings.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="p-8 border-b border-slate-100 flex items-center space-x-6 bg-slate-50/50">
          <div className="p-3 bg-white rounded-2xl shadow-sm">
            <Search className="h-6 w-6 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search news sources by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent border-none focus:ring-0 text-xl font-bold placeholder:text-slate-300"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 uppercase text-xs font-bold tracking-widest">
              <tr>
                <th className="px-10 py-6">Source Name</th>
                <th className="px-10 py-6">Trust Score</th>
                <th className="px-10 py-6">Bias Indicator</th>
                <th className="px-10 py-6">Accuracy %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSources.map((source) => (
                <tr key={source.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                        {source.name.charAt(0)}
                      </div>
                      <span className="text-xl font-extrabold text-slate-900">{source.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-32 h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${source.trustScore}%` }}
                          className="h-full bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20"
                        />
                      </div>
                      <span className="text-lg font-extrabold text-emerald-600">{source.trustScore}%</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-2 rounded-xl text-xs font-extrabold tracking-wider uppercase ${
                      source.bias === 'Center' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                      source.bias.includes('Left') ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                      'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {source.bias}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-slate-300" />
                      <span className="text-lg font-extrabold text-slate-700">{source.accuracy}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
