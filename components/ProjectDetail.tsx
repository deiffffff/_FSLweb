import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './Projects';

interface ProjectDetailProps {
  project: Project;
  direction: number;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : direction < 0 ? '-100%' : 0,
    opacity: direction === 0 ? 1 : 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : direction > 0 ? '-100%' : 0,
    opacity: 0
  })
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, direction, onClose, onNext, onPrevious }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bloquear scroll del body al abrir detalle
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Al cambiar de proyecto (project.id), volvemos arriba del scroll para una navegación fluida
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [project.id]);

  return (
    <motion.div 
      ref={scrollContainerRef}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 40, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-[#f8f7f4] flex flex-col overflow-y-auto overflow-x-hidden custom-scroll"
    >
      {/* Botón Cerrar / Back (Fuera del AnimatePresence para que se mantenga fijo) */}
      <div className="fixed top-12 right-10 md:right-20 z-[110] mix-blend-difference">
        <button 
          onClick={onClose}
          className="group flex items-center space-x-6 text-white font-condensed font-bold tracking-[0.5em] text-[10px] uppercase"
        >
          <span className="group-hover:-translate-x-2 transition-transform">BACK TO PORTFOLIO</span>
          <div className="w-10 h-px bg-white group-hover:w-16 transition-all"></div>
        </button>
      </div>

      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={project.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { 
              type: "tween", 
              duration: 1.8, 
              ease: [0.85, 0, 0.15, 1] // Curva lenta al inicio y final, rápida en el medio
            },
            opacity: { duration: 0.8, ease: "linear" }
          }}
          className="flex flex-col w-full min-h-full"
        >
          {/* Hero Section del Proyecto */}
          <div className="relative h-[80vh] w-full shrink-0 overflow-hidden bg-stone-900">
            {project.image && (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover scale-105"
              />
            )}
            <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-20">
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 15, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-white text-[28px] font-condensed font-extrabold tracking-tighter uppercase leading-none"
              >
                {project.title}
              </motion.h1>
              <div className="flex justify-between items-center text-white/40 font-condensed font-bold tracking-[0.4em] text-xs mt-4">
                <span>.est LAB — {project.id.toString().padStart(3, '0')}</span>
              </div>
            </div>
          </div>

          {/* Contenido Detalle */}
          <div className="max-w-7xl mx-auto w-full px-10 md:px-20 py-24 grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Sidebar Técnica */}
            <div className="lg:col-span-4 space-y-16">
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold tracking-[0.5em] text-stone-400 uppercase">Ficha de Proyecto</h4>
                <div className="space-y-8">
                  {[
                    { label: 'AÑO', value: project.year },
                    { label: 'LOCALIZACIÓN', value: project.location },
                    { label: 'ARQUITECTO', value: project.architect },
                    { label: 'TIPOLOGÍA', value: project.buildingType },
                    { label: 'SISTEMA', value: project.structuralType },
                  ].map((item, i) => (
                    <div key={i} className="border-b border-stone-100 pb-4">
                      <span className="block text-[9px] text-stone-300 tracking-[0.2em] font-extrabold mb-1">{item.label}</span>
                      <p className="text-stone-900 font-bold text-sm tracking-widest uppercase">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cuerpo del Texto */}
            <div className="lg:col-span-8 space-y-24">
              <section className="space-y-8">
                <h2 className="text-4xl font-condensed font-extrabold text-stone-900 uppercase tracking-tight leading-none">
                  El Concepto Arquitectónico
                </h2>
                <p className="text-stone-500 text-xl font-light leading-relaxed uppercase tracking-tight">
                  {project.description}
                </p>
              </section>

              <section className="bg-stone-900 p-12 md:p-20 text-white space-y-10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 opacity-5 p-4">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                       <path d="M10 10L90 90M90 10L10 90" strokeWidth="0.5"/>
                       <circle cx="50" cy="50" r="40" strokeWidth="0.5"/>
                    </svg>
                 </div>
                 <h3 className="text-[10px] font-bold tracking-[0.6em] text-white/30 uppercase">Desafío Estructural — .est Insight</h3>
                 <p className="text-2xl md:text-3xl font-condensed font-bold leading-tight uppercase tracking-tight text-stone-200">
                   {project.solution}
                 </p>
                 <div className="pt-10 flex space-x-12 opacity-30">
                    <div className="flex flex-col">
                       <span className="text-[8px] font-bold tracking-widest mb-2">SOFTWARE</span>
                       <span className="text-xs font-bold uppercase tracking-widest">CYPE 3D / ANSYS</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] font-bold tracking-widest mb-2">NORMATIVA</span>
                       <span className="text-xs font-bold uppercase tracking-widest">CTE / EUROCÓDIGOS</span>
                    </div>
                 </div>
              </section>
            </div>
          </div>

          {/* Footer Minimalista de Proyecto - Navegación */}
          <div className="mt-auto py-24 md:py-32 px-10 md:px-20 border-t border-stone-100 flex flex-row justify-between items-center gap-4 bg-[#f8f7f4]">
             <button 
               onClick={onPrevious}
               className="font-condensed text-stone-300 hover:text-stone-900 transition-colors text-2xl md:text-4xl lg:text-[3.5rem] font-extrabold tracking-tighter uppercase leading-none text-left"
             >
               ANTERIOR
             </button>
             <button 
               onClick={onNext}
               className="font-condensed text-stone-300 hover:text-stone-900 transition-colors text-2xl md:text-4xl lg:text-[3.5rem] font-extrabold tracking-tighter uppercase leading-none text-right"
             >
               SIGUIENTE
             </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectDetail;