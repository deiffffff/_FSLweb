
import React, { useState, useRef, useEffect } from 'react';
import { getStructuralAdvice } from '../geminiService';
import ScrollReveal from './ScrollReveal';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: ".est-AI ONLINE. Desafío estructural detectado. ¿En qué puedo asistirle?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    const botResponse = await getStructuralAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 w-full h-[80vh] flex flex-col justify-center">
      <ScrollReveal animation="reveal-scale" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-4">
          <h2 className="text-6xl md:text-7xl font-condensed font-extrabold mb-8 text-white leading-[0.9] tracking-tighter uppercase">.est <br/><span className="text-stone-500">Intelligence.</span></h2>
          <p className="text-stone-500 font-light leading-relaxed mb-12 uppercase tracking-tight text-lg">
            Nuestra red neuronal entrenada en eurocódigos y sistemas de alta gama para pre-dimensionamiento y viabilidad.
          </p>
          <div className="space-y-4">
             <div className="font-condensed text-[12px] tracking-widest text-stone-600 flex items-center space-x-3 font-bold">
               <span className="w-1.5 h-1.5 bg-stone-700 rounded-full"></span>
               <span>NEURAL ENGINE .est-01</span>
             </div>
             <div className="font-condensed text-[12px] tracking-widest text-stone-600 flex items-center space-x-3 font-bold">
               <span className="w-1.5 h-1.5 bg-stone-700 rounded-full"></span>
               <span>STRUCTURAL DATABASE 2024</span>
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-sm flex flex-col h-[500px] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto custom-scroll space-y-8 font-condensed text-[15px] tracking-wide">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-5 leading-tight ${
                  m.role === 'user' 
                    ? 'bg-stone-100 text-stone-950 ml-8 font-bold' 
                    : 'bg-stone-800 text-stone-300 mr-8 border-l-2 border-stone-500'
                }`}>
                  <span className="block mb-2 opacity-40 text-[10px] uppercase tracking-widest font-extrabold">[{m.role === 'user' ? 'GUEST' : '.est-AI'}]</span>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-stone-600 animate-pulse text-[11px] tracking-[0.3em] uppercase font-bold">Calculando vectores...</div>}
          </div>
          <div className="p-6 bg-stone-950 border-t border-stone-800 flex items-center space-x-6">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Query: Hormigón Postensado en Luces de 15m..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-stone-300 placeholder-stone-800 text-sm font-condensed font-bold uppercase tracking-wider"
            />
            <button onClick={handleSend} className="font-condensed text-stone-500 hover:text-white transition-colors uppercase text-[12px] tracking-[0.4em] font-extrabold">Ejecutar</button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default AIConsultant;
