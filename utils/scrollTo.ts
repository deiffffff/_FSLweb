
/**
 * Motor de scroll cinemático para AXON.
 * Implementa una curva de easing sofisticada (Quintic) para una navegación de alto standing.
 */

const easeInOutQuint = (t: number): number => {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
};

export const scrollToId = (id: string, duration: number = 1500) => {
  const targetElement = document.getElementById(id);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  
  // Si la distancia es insignificante, cancelamos para evitar bucles
  if (Math.abs(distance) < 2) return;

  let startTime: number | null = null;

  // Ajustamos la duración basada en la distancia para mantener la naturalidad
  // Una distancia mayor requiere un poco más de tiempo, pero no linealmente.
  const adjustedDuration = Math.min(Math.max(Math.abs(distance) * 0.6, 700), duration);

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / adjustedDuration, 1);
    const run = easeInOutQuint(progress);
    
    window.scrollTo(0, startPosition + distance * run);

    if (timeElapsed < adjustedDuration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};
