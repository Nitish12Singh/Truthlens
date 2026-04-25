import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Database, 
  Users, 
  MessageCircle, 
  LayoutDashboard, 
  CreditCard, 
  Globe, 
  Search, 
  Menu,
  X,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import './i18n';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Pages
import LandingPage from './pages/LandingPage';
import FactCheckPage from './pages/FactCheckPage';
import SourceDatabasePage from './pages/SourceDatabasePage';
import CommunityPage from './pages/CommunityPage';
import WhatsAppBotDemo from './pages/WhatsAppBotDemo';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  const navItems = [
    { name: t('nav_home'), path: '/', icon: ShieldCheck },
    { name: t('nav_fact_check'), path: '/fact-check', icon: Search },
    { name: t('nav_sources'), path: '/sources', icon: Database },
    { name: t('nav_community'), path: '/community', icon: Users },
    { name: t('nav_whatsapp'), path: '/whatsapp', icon: MessageCircle },
    { name: t('nav_dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav_pricing'), path: '/pricing', icon: CreditCard },
    { name: t('nav_faq'), path: '/faq', icon: HelpCircle },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-extrabold tracking-tight text-primary">TRUTHLENS</span>
            </Link>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2",
                    location.pathname === item.path 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="ml-4 p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-primary hover:text-white transition-all flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs font-bold uppercase">{i18n.language}</span>
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={toggleLanguage} className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
              <Globe className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-2xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-semibold flex items-center space-x-4 transition-all",
                    location.pathname === item.path 
                      ? "bg-primary text-white shadow-lg" 
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-primary/10 selection:text-primary">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/fact-check" element={<FactCheckPage />} />
            <Route path="/sources" element={<SourceDatabasePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/whatsapp" element={<WhatsAppBotDemo />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary rounded-xl">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-display font-extrabold text-primary tracking-tight">TRUTHLENS</span>
              </div>
              <div className="flex space-x-8 text-sm font-medium text-slate-500">
                <Link to="/faq" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/faq" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/faq" className="hover:text-primary transition-colors">Contact Us</Link>
              </div>
              <p className="text-sm text-slate-400 font-medium">© 2026 TruthLens. See Through the Noise.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
