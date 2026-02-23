import React, { useCallback, useEffect, useMemo, useState } from "react";

interface NavbarProps {
  activeSection: string;
  settledSection: string; // kept for compatibility with parent; not used here
  onNavigate: (id: string) => void;
}

const NAV_ITEMS = [
  { id: "inicio", label: "INICIO" },
  { id: "portfolio", label: "PORTFOLIO" },
  { id: "estudio", label: "ESTUDIO" },
  { id: "servicios", label: "SERVICIOS" },
  { id: "contacto", label: "CONTACTO" },
] as const;

const TOP_THRESHOLD_PX = 6;

const Navbar: React.FC<NavbarProps> = ({ activeSection, settledSection, onNavigate }) => {
  // avoid TS unused param warnings while keeping API stable
  void settledSection;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const LIGHT_HEADER_SECTIONS = new Set(["estudio", "portfolio", "servicios", "contacto"]);
  const isStudio = LIGHT_HEADER_SECTIONS.has(activeSection);

  const navTextActive = isStudio ? "text-stone-900" : "text-white";
  const navTextInactive = isStudio ? "text-stone-400" : "text-white/40";
  const navTextHover = isStudio ? "hover:text-stone-900" : "hover:text-white";
  const navBorder = isStudio ? "border-stone-900" : "border-white";

  const getScrollTop = useCallback((): number => {
    // Your pages scroll inside a container with `.custom-scroll`
    const el = document.querySelector(".custom-scroll") as HTMLElement | null;
    if (el) return el.scrollTop ?? 0;
    return window.scrollY || 0;
  }, []);

  const updateAtTop = useCallback(() => {
    const top = getScrollTop();
    setIsAtTop(top <= TOP_THRESHOLD_PX);
  }, [getScrollTop]);

  useEffect(() => {
    // Update on mount + whenever section changes
    updateAtTop();

    const el = document.querySelector(".custom-scroll") as HTMLElement | null;

    const opts: AddEventListenerOptions = { passive: true };

    if (el) {
      el.addEventListener("scroll", updateAtTop, opts);
      return () => el.removeEventListener("scroll", updateAtTop);
    }

    window.addEventListener("scroll", updateAtTop, opts);
    return () => window.removeEventListener("scroll", updateAtTop);
  }, [activeSection, updateAtTop]);

  // Visible only when:
  // - menu open (mobile drawer)
  // - on "inicio"
  // - user is actually at the top of the scroll container
  const shouldBeVisible = isMenuOpen || isAtTop;

  const navClassName = useMemo(() => {
    const blend = isStudio ? "" : "mix-blend-difference";
    const shown = shouldBeVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0";
    return `fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pb-16 ${shown} ${blend}`;
  }, [isStudio, shouldBeVisible]);

  return (
    <>
      {/* Fixed Navbar */}
      <div className={navClassName}>
        {/* Fondo sólido del header */}
        <div
          className={`absolute inset-x-0 top-0 h-[140px] ${
            isStudio ? "bg-[#f8f7f4]" : "bg-transparent"
          }`}
        />
        {/* Línea editorial inferior */}
        <div
          className={`absolute inset-x-0 top-[140px] h-px ${
            isStudio ? "bg-stone-200/70" : "bg-transparent"
          }`}
        />

        <nav className="relative px-10 md:px-20 py-12 flex justify-between items-center pointer-events-none">

          {/* Brand */}
          <div
            className="flex items-center space-x-6 cursor-pointer pointer-events-auto group"
            onClick={() => onNavigate("inicio")}
          >
            <div className={`transition-all duration-300 ${navTextActive}`}>
              <span className="font-condensed text-3xl font-extrabold tracking-tighter block leading-none">.est</span>
            </div>

            <div
              className={`flex flex-col border-l-2 ${navBorder} pl-6 ml-2 bg-transparent transition-colors duration-300 ${navTextActive}`}
            >
              <span className="font-condensed text-base font-bold tracking-[0.25em] leading-tight">
                DARCHEST STRUCTURE LAB
              </span>
              <span className="text-[9px] tracking-[0.5em] font-medium uppercase opacity-50 leading-tight">
                High Performance Engineering
              </span>
            </div>
          </div>

          {/* Desktop links (vertical, right-aligned) */}
          <div className="hidden md:flex flex-col items-end space-y-0 pointer-events-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`font-condensed text-sm tracking-[0.4em] transition-colors duration-300 relative py-0 leading-none outline-none text-right ${
                    isActive ? `${navTextActive} font-extrabold` : `${navTextInactive} font-bold ${navTextHover}`
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`md:hidden pointer-events-auto transition-colors duration-300 flex flex-col items-end space-y-1.5 ${navTextActive}`}
            aria-label="Open menu"
          >
            <div className="w-8 h-[3px] bg-current" />
            <div className="w-8 h-[3px] bg-current" />
            <div className="w-8 h-[3px] bg-current" />
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[60] transition-all duration-300 ${isMenuOpen ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-stone-900/10 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-[#f8f7f4] shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.85, 0, 0.15, 1)] p-12 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-24">
            <span className="font-condensed text-2xl font-extrabold tracking-tighter text-stone-900">MENU</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="relative w-8 h-8 flex items-center justify-center"
              aria-label="Close menu"
            >
              <div className="absolute w-8 h-[3px] bg-stone-900 rotate-45" />
              <div className="absolute w-8 h-[3px] bg-stone-900 -rotate-45" />
            </button>
          </div>

          <div className="flex flex-col space-y-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`font-condensed text-5xl font-extrabold tracking-tighter text-left uppercase transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-stone-900 translate-x-4"
                    : "text-stone-300 hover:text-stone-900 hover:translate-x-2"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-stone-100">
            <span className="block text-[10px] tracking-[0.4em] font-bold text-stone-400 uppercase mb-4">
              Darchest Structure Lab
            </span>
            <p className="text-stone-500 text-xs leading-relaxed uppercase tracking-tight font-medium">
              Ingeniería de alta precisión para arquitectura de vanguardia.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
