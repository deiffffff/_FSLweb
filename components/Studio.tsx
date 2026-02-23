import React from 'react';
import ScrollReveal from './ScrollReveal';
import CommonFooter from './CommonFooter';

const TEAM_MEMBERS = [
  {
    name: "MARCOS GÓMEZ",
    role: "FUNDADOR & DIRECTOR TÉCNICO",
    bio: [
  "Arquitecto especializado en cálculo y desarrollo de estructuras de edificación, con una trayectoria centrada en proyectos de alta exigencia técnica y en la resolución de sistemas estructurales complejos.",
  
  "Se formó en la Escuela Técnica Superior de Arquitectura de Madrid y en la Escuela Técnica Superior de Arquitectura de Valencia, consolidando una base académica sólida en el ámbito de la arquitectura y de la tecnología estructural del proyecto, complementada con estudios en el extranjero que ampliaron su visión internacional.",
  
  "Destaca su experiencia dentro del equipo de Estructuras Singulares, donde trabajó bajo la tutela directa de David Gallardo Llopis en el dimensionado de soluciones no convencionales —grandes luces, voladizos, apeos complejos y estructuras mixtas acero-hormigón— desarrollando propuestas estructurales optimizadas y completamente orientadas a su correcta ejecución mediante documentación técnica exhaustiva.",

  "Desde 2023 ejerce como consultor independiente en estructuras de edificación, interviniendo tanto en proyectos profesionales como en apoyo técnico avanzado, integrando cálculo estructural, desarrollo constructivo y viabilidad real de obra.",
  
  "Ha desarrollado también experiencia académica como profesor del módulo de estructuras en el Máster MArch en Arquitectura, Diseño e Innovación de la Universidad Europea de Valencia durante los años 2023 y 2024, programa dirigido por el arquitecto Fran Silvestre, impartiendo docencia a estudiantes de perfil internacional.",
  
  "Su enfoque profesional se basa en el rigor técnico, la optimización estructural y la integración temprana entre arquitectura y estructura como herramienta de diseño."
],

    image: "https://i.imgur.com/ThUcmP4.jpeg"
  },
    {
    name: "DAVID NAVARRO",
    role: "FUNDADOR & DIRECTOR TÉCNICO",
    bio: [
  "Arquitecto especializado en cálculo y desarrollo de estructuras de edificación, con una trayectoria centrada en proyectos de alta exigencia técnica y en la resolución de sistemas estructurales complejos.",
  
  "Se formó en la Escuela Técnica Superior de Arquitectura de Madrid y en la Escuela Técnica Superior de Arquitectura de Valencia, consolidando una base académica sólida en el ámbito de la arquitectura y de la tecnología estructural del proyecto, complementada con estudios en el extranjero que ampliaron su visión internacional.",
  
  "Destaca su experiencia dentro del equipo de Estructuras Singulares, donde trabajó bajo la tutela directa de David Gallardo Llopis en el dimensionado de soluciones no convencionales —grandes luces, voladizos, apeos complejos y estructuras mixtas acero-hormigón— desarrollando propuestas estructurales optimizadas y completamente orientadas a su correcta ejecución mediante documentación técnica exhaustiva.",

  "Desde 2023 ejerce como consultor independiente en estructuras de edificación, interviniendo tanto en proyectos profesionales como en apoyo técnico avanzado, integrando cálculo estructural, desarrollo constructivo y viabilidad real de obra.",
  
  "Ha desarrollado también experiencia académica como profesor del módulo de estructuras en el Máster MArch en Arquitectura, Diseño e Innovación de la Universidad Europea de Valencia durante los años 2023 y 2024, programa dirigido por el arquitecto Fran Silvestre, impartiendo docencia a estudiantes de perfil internacional.",
  
  "Su enfoque profesional se basa en el rigor técnico, la optimización estructural y la integración temprana entre arquitectura y estructura como herramienta de diseño."
],

    image: "https://i.imgur.com/ThUcmP4.jpeg"
  },
];

const Studio: React.FC = () => {
  return (
    <div className="h-full w-full flex items-start pt-[190px] px-10 md:px-20 overflow-y-auto custom-scroll">
      <div className="max-w-7xl mx-auto flex flex-col space-y-20 w-full pb-0">
        <div className="w-full">
          <ScrollReveal animation="reveal-left">
            <h2 className="text-3xl md:text-3xl lg:text-3xl font-condensed font-extrabold text-stone-900 leading-none tracking-tighter uppercase whitespace-nowrap">
              El Estudio
            </h2>
            <div className="w-full h-px bg-stone-200/70 mt-6"></div>
          </ScrollReveal>
        </div>
        
        <div className="w-full">
          <ScrollReveal animation="reveal" delay="reveal-delay-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-8">
                <p className="text-l font-condensed font-bold uppercase tracking-tight text-stone-900 leading-[tight]">
                  .est ES UN LABORATORIO DE INGENIERÍA ESTRUCTURAL DEDICADO A LA EXCELENCIA TÉCNICA Y LA INTEGRACIÓN ARQUITECTÓNICA
                </p>
              </div>            
              <div
                className="
                  lg:col-span-8
                  text-stone-500 text-[13px] leading-[1.65] tracking-[-0.01em]
                  columns-1 md:columns-2 xl:columns-3
                  gap-12
                  text-justify hyphens-auto
                  space-y-6
                  max-w-[60rem]
                "
              >
                <p>
                  Desarrollamos estructuras de edificación residencial en toda España. Somos arquitectos y entendemos la estructura como una pieza más del diseño de la arquitectura.
                </p>
                <p>
                  La integramos desde el origen del proyecto y la llevamos al máximo nivel de definición, anticipando problemas antes de que aparezcan en obra. Acompañamos al arquitecto durante la ejecución, dando respuestas claras y asumiendo la responsabilidad completa del trabajo que firmamos.
                </p>
                <p>
                  Buscamos la precisión, la coherencia y la mejor solución posible en cada decisión. Porque cuando la estructura está bien pensada, no se ve: sostiene la arquitectura y la hace posible.
                </p>
              </div>
            </div>
            
            {/* Separador fino en gris */}
            <div className="w-full h-px bg-stone-200/70 my-8"></div>

            {/* Sección de Equipo */}
            <div className="pt-14 space-y-20">
              {TEAM_MEMBERS.map((member, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
                >
                  {/* Columna izquierda: nombre + rol + foto */}
                  <div className="lg:col-span-4">
                  <div className="w-64">
                    {/* Subimos el bloque con margen negativo (sin sacarlo del flujo) */}
                    <div className="-mt-14 mb-0">
                      <h3 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tighter leading-none">
                        {member.name}
                      </h3>

                      <p className="text-stone-900 font-bold tracking-widest text-sm uppercase border-b border-stone-200 pb-2 whitespace-nowrap">
                        {member.role}
                      </p>
                    </div>

                    {/* Foto cuadrada debajo del rol */}
                    <div className="aspect-[2/3] w-64 bg-stone-100 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                  {/* Columna derecha: biografía */}
                  <div
                    className="
                      lg:col-span-8
                      text-stone-500 text-[13px] leading-[1.65] tracking-[-0.01em]
                      columns-1 md:columns-2 xl:columns-3
                      gap-12
                      text-justify hyphens-auto
                      space-y-6
                      max-w-[50rem]
                    "
                  >
                    {member.bio.map((paragraph, i) => (
                      <p key={i} className="break-inside-avoid">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

<CommonFooter />
</ScrollReveal>
</div>
</div>
</div>
);
};

export default Studio;