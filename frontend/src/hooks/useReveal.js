import { useRef, useEffect } from "react";

function useReveal(delay = 0) {
  const ref = useRef(null);

  // Detecta quando o elemento entra na tela e aplica a animação de fade-up
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Configura o IntersectionObserver para detectar quando o elemento entra na viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity   = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
 
    // Inicia a observação do elemento e garante que o observer seja limpo quando o componente for desmontado
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

export default useReveal;
