import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, ShieldAlert, Globe2, IndianRupee, Database, Users, MessageCircle, HelpCircle, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { t } = useTranslation();

  const stats = [
    { label: t('hero_stats_1'), icon: Globe2, color: "text-teal" },
    { label: t('hero_stats_2'), icon: ShieldAlert, color: "text-gold" },
    { label: t('hero_stats_3'), icon: IndianRupee, color: "text-red-500" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold mb-8"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              AI-Powered Truth Verification
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl lg:text-8xl font-display font-extrabold mb-8 tracking-tight leading-[1.1]"
            >
              <span className="block">See Through the</span>
              <span className="gradient-text">Noise.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Empowering 800M+ users with real-time AI-powered verification to combat misinformation, fake news, and economic damage.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link 
                to="/fact-check"
                className="btn-primary text-lg px-10 py-5"
              >
                {t('cta_get_started')}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/whatsapp"
                className="btn-outline text-lg px-10 py-5"
              >
                <MessageCircle className="h-5 w-5" />
                {t('nav_whatsapp')}
              </Link>
            </motion.div>
          </div>

          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card p-10 rounded-[2.5rem] text-center group hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <stat.icon className={`h-8 w-8 ${stat.color} group-hover:text-white transition-colors duration-500`} />
                </div>
                <p className="text-xl font-bold text-slate-800 leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-display font-extrabold text-slate-900 mb-6">Why TruthLens?</h2>
              <p className="text-xl text-slate-500 font-medium">We combine cutting-edge AI with community intelligence to build a safer internet.</p>
            </div>
            <Link to="/pricing" className="btn-outline">View Pricing</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Real-Time AI Analysis", desc: "Powered by Gemini 3 Flash for lightning-fast verification with Google Search grounding.", icon: TrendingUp, link: "/fact-check", color: "bg-blue-500" },
              { title: "Source Database", desc: "Search through 500+ news sources with reliability ratings and bias indicators.", icon: Database, link: "/sources", color: "bg-emerald-500" },
              { title: "Community Driven", desc: "Flag suspicious content and participate in a hybrid AI-human review queue.", icon: Users, link: "/community", color: "bg-violet-500" },
              { title: "WhatsApp Bot", desc: "Interact with our fact-checker in a familiar conversational interface.", icon: MessageCircle, link: "/whatsapp", color: "bg-green-500" },
              { title: "FAQ & Support", desc: "Have questions? Check our FAQ or provide feedback on the software.", icon: HelpCircle, link: "/faq", color: "bg-amber-500" },
              { title: "Accuracy Dashboard", desc: "Track your verification history and monitor global misinformation trends.", icon: LayoutDashboard, link: "/dashboard", color: "bg-rose-500" },
            ].map((feature, i) => (
              <Link 
                key={i} 
                to={feature.link} 
                className="group bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 block"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-${feature.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
