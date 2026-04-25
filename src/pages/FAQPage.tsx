import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquare, Send, CheckCircle, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "How does TruthLens verify information?",
      a: "TruthLens uses Gemini 3 Flash AI with real-time Google Search grounding to cross-reference claims against reputable news sources and official databases."
    },
    {
      q: "Is the service free to use?",
      a: "Yes, we offer a free tier with 10 fact-checks per day. For unlimited access and advanced features, you can upgrade to our Premium plan."
    },
    {
      q: "How can I provide feedback or report a bug?",
      a: "We value your input! You can use the feedback form below to share your thoughts, report issues, or suggest new features for TruthLens."
    },
    {
      q: "Does TruthLens support multiple languages?",
      a: "Currently, we support English and Hindi. We are working on adding more regional Indian languages soon."
    },
    {
      q: "What is the Community Flagging system?",
      a: "It's a way for users to highlight suspicious content. Flagged items are reviewed by our AI and a team of human moderators to ensure accuracy."
    }
  ];

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback, email: 'user@example.com' })
      });
      setSubmitted(true);
      setFeedback('');
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Feedback submission failed", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold mb-6"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Support Center
        </motion.div>
        <h1 className="text-5xl lg:text-6xl font-display font-extrabold text-slate-900 mb-6 tracking-tight">{t('faq_title')}</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Everything you need to know about TruthLens and how we help you find the truth.</p>
      </div>

      <div className="space-y-6 mb-24">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-10 py-6 flex items-center justify-between text-left transition-colors"
            >
              <span className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{faq.q}</span>
              <div className={`p-2 rounded-xl transition-all ${openIndex === index ? 'bg-primary text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                <ChevronDown className="h-5 w-5" />
              </div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-10 pb-8 text-slate-500 text-lg font-medium leading-relaxed"
                >
                  <div className="pt-2 border-t border-slate-50">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-12 lg:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-highlight/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-4 bg-primary rounded-2xl shadow-lg shadow-primary/20">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold">{t('feedback_title')}</h2>
          </div>
          
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/20 p-10 rounded-[2.5rem] flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 bg-emerald-500 rounded-full">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <p className="text-2xl font-bold text-emerald-400">Thank you! Your feedback has been received.</p>
              <p className="text-slate-400 font-medium">We appreciate your help in making TruthLens better.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-8 max-w-3xl">
              <p className="text-xl text-slate-400 font-medium leading-relaxed">Have a suggestion or found a bug? Let us know. We read every single piece of feedback.</p>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={t('feedback_placeholder')}
                className="w-full h-48 bg-white/5 border border-white/10 rounded-3xl p-8 text-white text-lg placeholder-white/20 focus:ring-4 focus:ring-primary/10 focus:border-primary/40 resize-none transition-all font-medium"
              />
              <button
                type="submit"
                className="btn-primary bg-white text-slate-900 hover:bg-slate-50 px-12 py-5 text-xl"
              >
                <Send className="h-6 w-6" />
                <span>{t('feedback_submit')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
