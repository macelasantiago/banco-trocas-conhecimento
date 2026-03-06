import { useRef, useEffect } from "react";

function useReveal(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // timerId precisa ser cancelável para o caso do elemento ser desmontado
    // antes do delay expirar — sem isso, o callback toca num nó detachado
    // e causa o erro "removeChild: node is not a child of this node" no React
    let timerId = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerId = setTimeout(() => {
            // Verifica se o elemento ainda está montado antes de tocá-lo
            if (ref.current) {
              el.style.opacity   = "1";
              el.style.transform = "translateY(0)";
            }
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    // Cleanup: cancela o timer E para de observar ao desmontar
    return () => {
      observer.disconnect();
      if (timerId !== null) clearTimeout(timerId);
    };
  }, [delay]);

  return ref;
}

export default useReveal;