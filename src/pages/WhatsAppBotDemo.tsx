import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Check, CheckCheck, Paperclip, Image as ImageIcon, Search, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { factCheck } from '../services/geminiService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  verdict?: any;
}

export default function WhatsAppBotDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to TruthLens Fact-Check Bot! Send me any news or claim to verify.", sender: 'bot', timestamp: '10:00 AM' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const result = await factCheck(input);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: `Verdict: ${result.verdict}\n\nReasoning: ${result.reasoning.substring(0, 200)}...`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verdict: result
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto h-[750px] my-16 bg-slate-50 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border-[12px] border-slate-900 relative">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Bot className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-slate-900">TruthLens Bot</h3>
            <div className="flex items-center space-x-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Online</p>
            </div>
          </div>
        </div>
        <button className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-primary transition-colors">
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-grow p-6 overflow-y-auto flex flex-col space-y-6 bg-[#F8FAFC]"
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`whatsapp-bubble ${msg.sender === 'user' ? 'whatsapp-bubble-right' : 'whatsapp-bubble-left'}`}
            >
              <p className="font-medium leading-relaxed">{msg.text}</p>
              {msg.verdict && (
                <div className={`mt-4 p-4 rounded-xl border-2 font-bold flex items-center gap-3 ${
                  msg.verdict.verdict === 'Verified' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                }`}>
                  {msg.verdict.verdict === 'Verified' ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  <span>{msg.verdict.verdict} • {msg.verdict.score}%</span>
                </div>
              )}
              <div className={`flex items-center space-x-1.5 mt-2 ${msg.sender === 'user' ? 'justify-end text-white/70' : 'justify-start text-slate-400'}`}>
                <span className="text-[10px] font-bold uppercase tracking-wider">{msg.timestamp}</span>
                {msg.sender === 'user' && <CheckCheck className="h-3 w-3" />}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 text-slate-400 font-bold text-xs uppercase tracking-widest ml-2"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>TruthLens is typing...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-white p-6 border-t border-slate-100">
        <div className="flex items-center space-x-4">
          <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary transition-colors">
            <Paperclip className="h-6 w-6" />
          </button>
          <div className="flex-grow relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a claim to verify..."
              className="w-full bg-slate-50 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/10 text-slate-900 font-medium placeholder:text-slate-300"
            />
          </div>
          <button 
            onClick={handleSend}
            className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
