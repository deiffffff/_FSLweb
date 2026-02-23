
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HOME_IMAGE_URL = "https://www.eltallerestudiodearquitectura.com/wp-content/uploads/2024/05/EXT_07-enhanced-1024x576.png";

interface HeroProps {
  onExplore: () => void;
  activeSection?: string;
}

const Hero: React.FC<HeroProps> = ({ onExplore, activeSection }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-stone-950">
      {/* Capa 1: La imagen de fondo */}
      <img 
        src={HOME_IMAGE_URL} 
        alt="DARCHEST STRUCTURE LAB" 
        className="w-full h-full object-cover grayscale brightness-100"
      />

      {/* Capa 2: Eslogan (Visible cuando se revela) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isRevealed ? 1 : 0,
          y: isRevealed ? 0 : 20 
        }}
        transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-20 left-0 w-full flex flex-col items-center justify-center pointer-events-none px-10 z-[5]"
      >
        <h1 className="text-white font-condensed font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-[0.1em] text-center uppercase leading-none">
          DESDE LA PENUMBRA, ORDEN
        </h1>
        <div className="mt-4 w-12 h-px bg-white/20"></div>
      </motion.div>
      
      {/* Capa 3: Overlay Negro con Máscara Radial Animada */}
      <motion.div 
        initial={false}
        animate={{
          maskImage: isRevealed 
            ? 'radial-gradient(circle at center, transparent 100%, black 120%)' 
            : 'radial-gradient(circle at center, transparent 0%, black 0%)',
          WebkitMaskImage: isRevealed 
            ? 'radial-gradient(circle at center, transparent 100%, black 120%)' 
            : 'radial-gradient(circle at center, transparent 0%, black 0%)'
        }}
        transition={{ duration: 2.5, ease: [0.85, 0, 0.15, 1] }}
        className="absolute inset-0 bg-stone-950 z-10 pointer-events-none"
      />

      {/* Capa 4: Botón Central */}
      <AnimatePresence>
        {!isRevealed && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleReveal}
              className="relative w-16 h-16 md:w-20 h-20 rounded-full bg-white flex items-center justify-center group"
            >
              {/* Círculo decorativo pulsante */}
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-white/30"
              />
              
              {/* El botón ahora es puramente visual y minimalista */}
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Indicador sutil de derechos */}
      <div className="absolute bottom-8 right-10 text-white/20 font-condensed text-[10px] tracking-[0.4em] uppercase pointer-events-none z-20">
        © 2026 - TODOS LOS DERECHOS RESERVADOS
      </div>
    </div>
  );
};

export default Hero;
