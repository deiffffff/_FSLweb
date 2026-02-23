
import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Studio from './components/Studio';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import { Project, PROJECTS_DATA } from './components/Projects';

const SECTIONS = ['inicio', 'portfolio', 'estudio', 'servicios', 'contacto'];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [settledSection, setSettledSection] = useState('inicio');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // 1 para siguiente, -1 para anterior
  
  // Fix: Use ReturnType<typeof setTimeout> to avoid "Cannot find namespace 'NodeJS'" error in browser environments.
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavigate = (id: string) => {
    if (id === activeSection) return;
    
    setSelectedProjectId(null); 
    setActiveSection(id);
    setDirection(0);

    // Limpiar timeout previo si existe
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    // Sincronizar 'settledSection' con el fin de la transición CSS (1800ms)
    navigationTimeoutRef.current = setTimeout(() => {
      setSettledSection(id);
      navigationTimeoutRef.current = null;
    }, 1800);
  };

  const handleProjectSelect = (id: number) => {
    setDirection(0);
    setSelectedProjectId(id);
  };

  const selectedProject = PROJECTS_DATA.find(p => p.id === selectedProjectId);

  const handleNextProject = () => {
    if (selectedProjectId === null) return;
    const currentIndex = PROJECTS_DATA.findIndex(p => p.id === selectedProjectId);
    const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
    setDirection(1);
    setSelectedProjectId(PROJECTS_DATA[nextIndex].id);
  };

  const handlePreviousProject = () => {
    if (selectedProjectId === null) return;
    const currentIndex = PROJECTS_DATA.findIndex(p => p.id === selectedProjectId);
    const prevIndex = (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    setDirection(-1);
    setSelectedProjectId(PROJECTS_DATA[prevIndex].id);
  };

  const getTranslateX = () => {
    const index = SECTIONS.indexOf(activeSection);
    return -(index * 100);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f8f7f4] selection:bg-stone-200 text-stone-900">
      <Navbar 
        activeSection={activeSection} 
        settledSection={settledSection}
        onNavigate={handleNavigate} 
      />
      
      {/* Overlay de Detalle de Proyecto */}
      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          direction={direction}
          onClose={() => setSelectedProjectId(null)}
          onNext={handleNextProject}
          onPrevious={handlePreviousProject}
        />
      )}

      {/* Contenedor Principal de Transición Horizontal */}
      <div 
        className={`flex w-[500vw] h-full transition-transform duration-[1800ms] ${selectedProjectId ? 'scale-95 opacity-50 blur-sm pointer-events-none' : 'scale-100 opacity-100 blur-0'}`}
        style={{ 
          transform: `translateX(${getTranslateX()}vw)`,
          transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)' 
        }}
      >
        {/* INICIO */}
        <section id="inicio" className="h-screen w-screen relative shrink-0">
          <Hero 
            activeSection={activeSection} 
            onExplore={() => handleNavigate('portfolio')} 
          />
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="h-screen w-screen bg-[#f8f7f4] shrink-0">
          <Projects onProjectClick={handleProjectSelect} />
        </section>

        {/* ESTUDIO */}
        <section id="estudio" className="h-screen w-screen bg-[#f8f7f4] flex items-center shrink-0">
          <Studio />
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="h-screen w-screen bg-[#f8f7f4] flex items-center border-x border-stone-100 shrink-0">
          <Services />
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="h-screen w-screen flex items-center bg-[#f8f7f4] shrink-0">
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default App;
