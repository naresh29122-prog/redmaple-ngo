import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

// --- NGO Program Data ---
const PROGRAMS = [
  {
    id: '1',
    title: 'Free Corrective Surgery',
    description: 'Transforming lives by restoring mobility to those suffering from polio and physical disabilities, completely free of cost.',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    category: 'Medical',
    goal: 500000,
    raised: 385000,
  },
  {
    id: '2',
    title: 'Digital Education Hub',
    description: 'Empowering underprivileged children with computer literacy and modern digital tools for a brighter future.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    category: 'Education',
    goal: 200000,
    raised: 142000,
  },
  {
    id: '3',
    title: 'Daily Nutrition Seva',
    description: 'Our community kitchen serves thousands of nutritious meals daily to patients and their waiting families.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    category: 'Food Relief',
    goal: 150000,
    raised: 110000,
  }
];

// --- Statistics ---
const STATS = [
  { label: 'Surgeries', value: '450K+', icon: 'fa-hospital-user' },
  { label: 'Daily Meals', value: '10K+', icon: 'fa-bowl-food' },
  { label: 'Lives Impacted', value: '1.2M+', icon: 'fa-hands-holding-heart' },
];

const App = () => {
  const [showDonate, setShowDonate] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Namaste! I am Seva Sahayak. How can I guide your contribution or answer your questions today?' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle AI Chat
  const handleChat = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Context: You are Seva Sahayak, the official AI assistant for SevaConnect NGO. We are inspired by Narayan Seva Sansthan and provide free surgeries, food, and education. Help the user: ${userMsg}`,
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || 'We are here to serve. How else can I assist you?' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Our servers are busy serving others. Please call our helpline at +91-800-SEVA for immediate assistance.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <nav className="glass fixed top-0 w-full z-50 border-b border-orange-100 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <i className="fas fa-hand-holding-heart"></i>
            </div>
            <span className="text-xl font-extrabold tracking-tighter text-slate-800">SEVACONNECT</span>
          </div>
          <button 
            onClick={() => setShowDonate(true)} 
            className="gradient-bg text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-lg shadow-orange-200 hover:scale-105 transition active:scale-95"
          >
            DONATE NOW
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 text-center lg:text-left lg:pt-52">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block border border-orange-100">
              Serving Humanity Since 1985
            </span>
            <h1 className="text-5xl lg:text-8xl font-black text-slate-900 mb-6 leading-[1.1]">
              Selfless Service <br/>to <span className="text-orange-600">The Divine.</span>
            </h1>
            <p className="text-slate-500 text-lg lg:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Inspired by the legacy of Narayan Seva Sansthan, we provide world-class medical care and hope to those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => setShowDonate(true)} className="gradient-bg text-white px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-orange-200">
                Support a Surgery
              </button>
              <button className="bg-slate-50 text-slate-700 px-10 py-4 rounded-2xl font-bold border border-slate-200 hover:bg-white transition">
                Become a Volunteer
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-10 gradient-bg opacity-10 blur-3xl rounded-full animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200" 
              className="relative rounded-[3rem] shadow-2xl border-8 border-white object-cover aspect-[4/3]" 
              alt="Community Impact"
            />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl text-orange-400">
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Our Core Missions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Every donation you make goes directly toward these life-changing initiatives.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {PROGRAMS.map(p => (
              <div key={p.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group">
                <div className="relative h-64 overflow-hidden">
                  <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={p.title} />
                  <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur font-bold text-[10px] uppercase text-orange-600 shadow-sm">
                    {p.category}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">{p.description}</p>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-black text-slate-400">
                      <span>RAISED: ₹{p.raised.toLocaleString()}</span>
                      <span className="text-orange-600">{Math.round((p.raised/p.goal)*100)}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full gradient-bg rounded-full" style={{ width: `${(p.raised/p.goal)*100}%` }}></div>
                    </div>
                    <button onClick={() => setShowDonate(true)} className="w-full py-4 rounded-2xl border-2 border-orange-600 text-orange-600 font-bold text-sm hover:bg-orange-600 hover:text-white transition-all duration-300">
                      Support This Cause
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      {showDonate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowDonate(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl p-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-full h-2 gradient-bg"></div>
            <button onClick={() => setShowDonate(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Gift a Future</h2>
            <p className="text-slate-500 mb-8 text-sm font-medium">Your kindness provides medicine, food, and hope.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[1100, 5100, 11000, 25000].map(val => (
                <button key={val} className="py-5 rounded-2xl border-2 border-slate-100 font-black text-slate-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all">
                  ₹{val.toLocaleString()}
                </button>
              ))}
            </div>
            
            <input 
              type="number" 
              placeholder="Enter Custom Amount" 
              className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-orange-500 outline-none mb-6 font-bold text-center text-xl" 
            />
            
            <button className="w-full py-5 gradient-bg text-white font-bold rounded-2xl text-lg shadow-xl shadow-orange-200 hover:scale-[1.02] transition active:scale-95">
              Proceed to Secure Payment
            </button>
            <p className="text-center mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <i className="fas fa-shield-halved mr-2"></i> 80G Tax Benefits Applicable
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-50">
            <div className="w-8 h-8 gradient-bg rounded-lg"></div>
            <span className="font-bold tracking-tighter">SEVACONNECT</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-orange-600 transition">About Us</a>
            <a href="#" className="hover:text-orange-600 transition">Annual Reports</a>
            <a href="#" className="hover:text-orange-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-orange-600 transition">Contact</a>
          </div>
          <p className="text-slate-300 text-[10px] font-medium tracking-wider">
            © 2025 SEVACONNECT NGO. INSPIRED BY THE SPIRIT OF SELFLESS SERVICE.
          </p>
        </div>
      </footer>

      {/* AI Chat Bot */}
      <div className="fixed bottom-8 right-8 z-[1000]">
        {chatOpen ? (
          <div className="bg-white w-[90vw] md:w-96 h-[550px] shadow-2xl rounded-[2.5rem] border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
            <div className="gradient-bg p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <i className="fas fa-robot text-sm"></i>
                </div>
                <div>
                  <div className="font-black text-sm">Seva Sahayak</div>
                  <div className="text-[10px] opacity-80 font-bold uppercase tracking-widest">Always Online</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="flex-grow p-6 overflow-y-auto bg-slate-50 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-5 rounded-[1.8rem] text-sm max-w-[85%] font-medium leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-orange-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest animate-pulse px-2">
                  Assistant is thinking...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleChat()}
                placeholder="How can I help you today?" 
                className="flex-grow bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none font-medium" 
              />
              <button 
                onClick={handleChat} 
                className="w-14 h-14 gradient-bg text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition active:scale-95"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setChatOpen(true)} 
            className="w-16 h-16 gradient-bg text-white rounded-2xl shadow-2xl flex items-center justify-center text-2xl hover:scale-110 transition active:scale-95 relative"
          >
            <i className="fas fa-comment-dots"></i>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-4 border-white"></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
