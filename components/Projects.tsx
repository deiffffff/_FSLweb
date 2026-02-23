import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import CommonFooter from './CommonFooter';

/**
 * PORTFOLIO — MAQUETACIÓN EDITORIAL (referencia “Welcome”)
 * - Título arriba-izquierda (text-xl) en negrita.
 * - Imagen cuadrada en B/N.
 * - Palabras clave bajo la imagen (sin descripción).
 *
 * Nota: el contenido (texto/datos) se conserva íntegro en PROJECTS_DATA; aquí solo se cambia la presentación.
 */

export interface Project {
  id: number;
  title: string;
  year: number;
  image: string;
  buildingType: string;
  structuralType: string;
  architect: string;
  location: string;
  description: string;
  solution: string;
}

export const PROJECTS_DATA: Project[] = [
  { 
    id: 1, 
    title: "Villa Munuera", 
    year: 2026, 
    // Ejemplo de imagen externa (Unsplash)
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600", 
    buildingType: "RESIDENCIAL", 
    structuralType: "HORMIGÓN ARMADO", 
    architect: "DAVID MUNUERA ORTUÑO",
    location: "MURCIA, ESPAÑA",
    description: "Una vivienda de volúmenes puros donde la estructura se convierte en el lenguaje principal de la fachada.",
    solution: "Se proyectó una losa de hormigón visto de gran canto para permitir vuelos de 5 metros sin apoyos visibles, integrando las instalaciones en el núcleo estructural."
  },
  { 
    id: 2, 
    title: "Casa Pabellón", 
    year: 2025, 
    // Ejemplo de cómo se vería una ruta local si tuvieras la imagen en la carpeta public/projects/
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600", 
    buildingType: "RESIDENCIAL", 
    structuralType: "METÁLICA", 
    architect: "PABLO ALFONSO GARCÍA",
    location: "ALICANTE, ESPAÑA",
    description: "Transparencia extrema bajo una cubierta que parece levitar sobre el paisaje costero.",
    solution: "Estructura de perfiles HEB de alta resistencia con nudos rígidos soldados in situ para minimizar la sección de los pilares a solo 10cm."
  },
  { 
    id: 3, 
    title: "Refugio Eva", 
    year: 2024, 
    image: "https://images.unsplash.com/photo-1449156001935-d28bc1dc728f?auto=format&fit=crop&q=80&w=1600", 
    buildingType: "RESIDENCIAL", 
    structuralType: "MADERA", 
    architect: "EVA",
    location: "SIERRA MADRID, ESPAÑA",
    description: "Sostenibilidad y calidez en un entorno protegido donde la huella de carbono fue la prioridad.",
    solution: "Uso de paneles CLT (Cross Laminated Timber) de pino radiata con un sistema de cimentación ligera mediante micropilotes."
  },
  { 
    id: 4, 
    title: "Residencia Taller I", 
    year: 2025, 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600", 
    buildingType: "RESIDENCIAL", 
    structuralType: "HORMIGÓN ARMADO", 
    architect: "EL TALLER ESTUDIO DE ARQUITECTURA",
    location: "VALENCIA, ESPAÑA",
    description: "Reinterpretación de la arquitectura mediterránea mediante el uso de muros de carga de hormigón blanco.",
    solution: "Cálculo de muros pantalla de hormigón autocompactante con acabado fenólico, actuando simultáneamente como estructura y cerramiento final."
  },
  { 
    id: 5, 
    title: "Estructura S-26", 
    year: 2026, 
    image: "https://images.unsplash.com/photo-1518005020480-10f13b5cb445?auto=format&fit=crop&q=80&w=1600", 
    buildingType: "RESIDENCIAL", 
    structuralType: "METÁLICA", 
    architect: "DAVID MUNUERA ORTUÑO",
    location: "MADRID, ESPAÑA",
    description: "Esqueleto metálico visto integrado en una reforma integral de un loft industrial.",
    solution: "Refuerzo mediante perfiles UPN abrazando los pilares de fundición existentes y nuevas cerchas tipo Pratt para ampliar la luz del forjado principal."
  },
  { 
    id: 6, 
    title: "Vivienda Atrio", 
    year: 2024, 
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=1600", 
    buildingType: "RESIDENCIAL", 
    structuralType: "MADERA", 
    architect: "PABLO ALFONSO GARCÍA",
    location: "BARCELONA, ESPAÑA",
    description: "Vivienda organizada en torno a un patio central con estructura ligera de entramado de madera.",
    solution: "Sistema de muros de carga de entramado ligero (Light Frame) con forjados mixtos de madera y una capa técnica de compresión."
  },
  { 
    id: 7, 
    title: "Proyecto Origen", 
    year: 2025, 
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1600", 
    buildingType: "RESIDENCIAL", 
    structuralType: "HORMIGÓN ARMADO", 
    architect: "EL TALLER ESTUDIO DE ARQUITECTURA",
    location: "IBIZA, ESPAÑA",
    description: "Integración topográfica máxima donde la vivienda se entierra parcialmente en la roca.",
    solution: "Muros de contención de hormigón ciclópeo utilizando la propia piedra de la excavación para mimetizar la estructura con el terreno."
  },
  { 
    id: 8, 
    title: "Casa de Luz", 
    year: 2024, 
    image: "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80&w=1600", 
    buildingType: "RESIDENCIAL", 
    structuralType: "METÁLICA", 
    architect: "EVA",
    location: "MÁLAGA, ESPAÑA",
    description: "Una caja de cristal protegida por una celosía estructural de acero corten.",
    solution: "Diseño de subestructura de fachada autoportante que actúa como viga Vierendeel, eliminando la necesidad de pilares en las esquinas del salón."
  }
];

interface ProjectsProps {
  onProjectClick?: (id: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectClick }) => {
  const [searchTerm] = useState(''); // mantenido por compatibilidad
  const [filterYear, setFilterYear] = useState('ALL');
  const [filterBuildingType, setFilterBuildingType] = useState('ALL');
  const [filterStructuralType, setFilterStructuralType] = useState('ALL');
  const [filterArchitect, setFilterArchitect] = useState('ALL');

  const sortOptions = (options: string[]) => {
    const others = options
      .filter((o) => o !== 'ALL')
      .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
    return ['ALL', ...others];
  };

  const years = sortOptions(['ALL', '2024', '2025', '2026']);
  const buildingTypes = sortOptions(['ALL', 'RESIDENCIAL']);
  const structuralTypes = sortOptions(['ALL', 'HORMIGÓN ARMADO', 'METÁLICA', 'MADERA']);
  const architects = sortOptions([
    'ALL',
    'PABLO ALFONSO GARCÍA',
    'EVA',
    'EL TALLER ESTUDIO DE ARQUITECTURA',
    'DAVID MUNUERA ORTUÑO',
  ]);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA
      .filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = filterYear === 'ALL' || p.year.toString() === filterYear;
        const matchesBuilding = filterBuildingType === 'ALL' || p.buildingType === filterBuildingType;
        const matchesStructural = filterStructuralType === 'ALL' || p.structuralType === filterStructuralType;
        const matchesArchitect = filterArchitect === 'ALL' || p.architect === filterArchitect;
        return matchesSearch && matchesYear && matchesBuilding && matchesStructural && matchesArchitect;
      })
      .sort((a, b) => b.year - a.year);
  }, [searchTerm, filterYear, filterBuildingType, filterStructuralType, filterArchitect]);

  // Proyecto destacado (primero tras aplicar filtros). El resto alimenta la cuadrícula.
  const featuredProject = filteredProjects[0] ?? null;
  const gridProjects = featuredProject ? filteredProjects.slice(1) : filteredProjects;

  const resetFilters = () => {
    setFilterYear('ALL');
    setFilterBuildingType('ALL');
    setFilterStructuralType('ALL');
    setFilterArchitect('ALL');
  };

  const cityFromLocation = (location: string) => {
    const parts = location.split(',').map((s) => s.trim()).filter(Boolean);
    return parts[0] || location;
  };

  return (
    <div className="h-full w-full flex items-start pt-[190px] px-10 md:px-20 overflow-y-auto custom-scroll bg-[#f8f7f4] relative">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      <div className="max-w-7xl mx-auto flex flex-col space-y-8 w-full pb-0">
         <div className="w-full space-y-3">
          <div className="w-full">
          <ScrollReveal animation="reveal-left">
            <h2 className="text-3xl md:text-3xl lg:text-3xl font-condensed font-extrabold text-stone-900 leading-none tracking-tighter uppercase whitespace-nowrap">
              Portfolio
            </h2>
            <div className="w-full h-px bg-stone-200/70 mt-6" />
          </ScrollReveal>
        </div>

        <div className="w-full">
          <ScrollReveal animation="reveal" delay="reveal-delay-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-end gap-4">
              <div className="lg:col-span-3 flex flex-col space-y-2">
                <label className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">AÑO</label>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="bg-transparent pb-1 font-condensed font-bold text-sm tracking-widest text-stone-900 focus:outline-none focus:ring-0 cursor-pointer uppercase"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3 flex flex-col space-y-1">
                <label className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">TIPO DE EDIFICIO</label>
                <select
                  value={filterBuildingType}
                  onChange={(e) => setFilterBuildingType(e.target.value)}
                  className="bg-transparent pb-1 font-condensed font-bold text-sm tracking-widest text-stone-900 focus:outline-none focus:ring-0 cursor-pointer uppercase"
                >
                  {buildingTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3 flex flex-col space-y-1">
                <label className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">TIPOLOGÍA ESTRUCTURAL</label>
                <select
                  value={filterStructuralType}
                  onChange={(e) => setFilterStructuralType(e.target.value)}
                  className="bg-transparent pb-1 font-condensed font-bold text-sm tracking-widest text-stone-900 focus:outline-none focus:ring-0 cursor-pointer uppercase"
                >
                  {structuralTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3 flex flex-col space-y-1">
                <label className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">ARQUITECTO</label>
                <select
                  value={filterArchitect}
                  onChange={(e) => setFilterArchitect(e.target.value)}
                  className="bg-transparent pb-1 font-condensed font-bold text-sm tracking-widest text-stone-900 focus:outline-none focus:ring-0 cursor-pointer uppercase"
                >
                  {architects.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          <div className="mt-3 h-px bg-stone-200/80" />

          {/* PROYECTO DESTACADO (primer vistazo) */}
          {featuredProject && (
            <section className="w-full pt-10 pb-14">
            {/* TÍTULO SOLO ENCIMA DE LA IMAGEN */}
              <div className="w-full flex justify-end">
                <div className="pl-[0.6cm] w-full lg:w-1/2">
                  <h3 className="mb-2 text-2xl md:text-2xl font-playfair font-semibold italic text-stone-900 leading-none tracking-tight">
                    {featuredProject.title}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch lg:gap-x-1">
                {/* Texto (columna izquierda) */}
                <div className="pr-0 lg:pr-1 flex items-start">
                  <div className="w-full flex items-start justify-end">
                    <p className="text-[12px] leading-[1.65] text-stone-700 text-right max-w-[42ch] ml-auto">
                      {featuredProject.description}
                    </p>
                  </div>
                </div>

                {/* Imagen (columna derecha) */}
                <div className="pl-[0.6cm] flex flex-col items-start">
                  <div className="w-full max-w-[720px] aspect-[3/2] overflow-hidden bg-white/55">
                    <img
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      className="h-full w-full object-cover grayscale"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 h-px bg-stone-200/80" />
            </section>
          )}
          </ScrollReveal>
        </div>
      </div>

        <div className="relative pb-16 w-full">
          {filteredProjects.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
                {gridProjects.map((p) => (
                  <motion.article
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      onClick={() => onProjectClick && onProjectClick(p.id)}
                      className="w-full text-left"
                      aria-label={`Abrir proyecto: ${p.title}`}
                    >

                      <div className="aspect-square w-full overflow-hidden bg-white/55">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-full w-full object-cover grayscale"
                          loading="lazy"
                        />
                      </div>

                    </button>
                  </motion.article>
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <div className="text-sm text-stone-500">No hay proyectos que coincidan con los filtros.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;