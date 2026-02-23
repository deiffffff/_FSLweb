
import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'reveal' | 'reveal-left' | 'reveal-scale';
  delay?: string;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '', 
  animation = 'reveal',
  delay = '',
  threshold = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${animation} ${isVisible ? 'active' : ''} ${delay} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
