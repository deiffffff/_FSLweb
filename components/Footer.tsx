
import React from 'react';
import ScrollReveal from './ScrollReveal';
import CommonFooter from './CommonFooter';

const Footer: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col pt-40 px-10 md:px-20 overflow-y-auto custom-scroll">
      <div className="max-w-7xl mx-auto flex flex-col space-y-20 w-full flex-grow pb-0">
        <div className="w-full">
          <ScrollReveal animation="reveal-left">
            <h2 className="text-4xl md:text-5xl lg:text-[5rem] font-condensed font-extrabold text-stone-900 leading-none tracking-tighter uppercase whitespace-nowrap">
              Contacto
            </h2>
            <div className="w-full h-1 bg-stone-900 mt-10"></div>
          </ScrollReveal>
        </div>
        
        <div className="w-full">
          <ScrollReveal animation="reveal" delay="reveal-delay-2" className="flex flex-col h-full justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="text-3xl font-condensed font-bold uppercase tracking-tight text-stone-900 mb-12 leading-tight">
                  HABLEMOS DE SU PRÓXIMO DESAFÍO ESTRUCTURAL.
                </p>
                <div className="space-y-6 text-stone-400 text-[10px] tracking-[0.4em] font-bold uppercase">
                  <p>Asesoría Técnica</p>
                  <p>Colaboración Estratégica</p>
                  <p>Optimización Estructural</p>
                </div>
              </div>

              <form className="space-y-12">
                <div className="border-b border-stone-200 pb-2 focus-within:border-stone-900 transition-colors">
                  <input type="text" placeholder="NOMBRE" className="w-full bg-transparent border-none focus:ring-0 text-xl font-bold uppercase tracking-wider placeholder-stone-200" />
                </div>
                <div className="border-b border-stone-200 pb-2 focus-within:border-stone-900 transition-colors">
                  <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-none focus:ring-0 text-xl font-bold uppercase tracking-wider placeholder-stone-200" />
                </div>
                <div className="border-b border-stone-200 pb-2 focus-within:border-stone-900 transition-colors">
                  <textarea placeholder="PROYECTO" rows={1} className="w-full bg-transparent border-none focus:ring-0 text-xl font-bold uppercase tracking-wider placeholder-stone-200 resize-none" />
                </div>
                <button className="bg-stone-900 text-white px-12 py-5 font-condensed text-[12px] tracking-[0.5em] font-extrabold hover:bg-stone-700 transition-all uppercase">
                  Enviar Solicitud
                </button>
              </form>
            </div>

            <CommonFooter />
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Footer;
