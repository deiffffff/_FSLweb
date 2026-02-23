import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import CommonFooter from './CommonFooter';

const services = [
  { 
    title: "Obra nueva", 
    number: "01",
    description: "Cálculo y diseño optimizado de estructuras de edificación desde el anteproyecto hasta la ejecución."
  },
  { 
    title: "Rehabilitación", 
    number: "02",
    description: "Diagnóstico patológico, consolidación y refuerzo de estructuras existentes y patrimonio histórico."
  },
  { 
    title: "Estructuras singulares", 
    number: "03",
    description: "Ingeniería avanzada para geometrías complejas, grandes luces y materiales no convencionales."
  },
  { 
    title: "Dirección de obra", 
    number: "04",
    description: "Supervisión técnica rigurosa y asistencia in situ para garantizar la fidelidad del proyecto ejecutado."
  }
];

const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="h-full w-full flex items-start pt-40 px-10 md:px-20 overflow-y-auto custom-scroll relative">
      <div className="max-w-7xl mx-auto flex flex-col space-y-20 w-full pb-0">
        {/* Encabezado Maestro - Stacked */}
        <div className="w-full">
          <ScrollReveal animation="reveal-left">
            <h2 className="text-4xl md:text-5xl lg:text-[5rem] font-condensed font-extrabold text-stone-900 leading-none tracking-tighter uppercase whitespace-nowrap">
              Servicios
            </h2>
            <div className="w-full h-1 bg-stone-900 mt-10"></div>
          </ScrollReveal>
        </div>

        {/* Contenido - Lista bajo el título */}
        <div className="w-full">
          <ScrollReveal animation="reveal" delay="reveal-delay-2">
            <div className="flex flex-col">
              {services.map((s, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group flex flex-col py-6 border-b border-stone-100 hover:border-stone-900 transition-colors duration-500 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-baseline space-x-8 md:space-x-12">
                      <span className="text-stone-300 text-[10px] font-bold tracking-widest group-hover:text-stone-900 transition-colors">{s.number}</span>
                      <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">{s.title}</h3>
                    </div>
                    
                    {/* Icono flecha que rota al abrirse */}
                    <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-500 ${hoveredIndex === idx ? 'rotate-90 opacity-100' : 'opacity-0 -rotate-45'}`}>
                      <svg className="w-4 h-4 text-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Descripción desplegable Inline */}
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pl-[calc(2rem+10px)] md:pl-[calc(3rem+10px)] max-w-2xl">
                          <p className="text-stone-500 text-[15pt] font-medium tracking-tight leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </ScrollReveal>
          
          <CommonFooter />
        </div>
      </div>
    </div>
  );
};

export default Services;
