import React from 'react';
import ScrollReveal from './ScrollReveal';

const CommonFooter: React.FC = () => {
  return (
    <ScrollReveal animation="reveal" threshold={0} className="w-full">
      <div className="mt-32 pt-10 pb-16 border-t border-stone-100 flex justify-end w-full">
        <p className="text-[9px] text-stone-300 tracking-[0.4em] font-bold uppercase">© 2026 DARCHEST STRUCTURE LAB</p>
      </div>
    </ScrollReveal>
  );
};

export default CommonFooter;