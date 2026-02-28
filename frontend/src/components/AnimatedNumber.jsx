import { useEffect, useRef, useState } from "react";

/**
 * AnimatedNumber
 * Conta do zero até `value` quando o elemento entra no viewport.
 * 
 * Props:
 *   value    → número final
 *   suffix   → texto após o número (ex: "%", "+")
 *   duration → duração total da animação em ms (padrão: 2000)
 *   special  → se definido, exibe esse texto com fade-in (ex: "∞")
 */
function AnimatedNumber({ value, suffix = "", duration = 2000, special }) {
  const [display, setDisplay] = useState(special ? "" : "0");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  // Detecta quando o elemento entra na tela
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Configura o IntersectionObserver para detectar quando o elemento entra na viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // 30% do elemento visível para ativar
    );

    // Inicia a observação do elemento e garante que o observer seja limpo quando o componente for desmontado
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Inicia a animação apenas quando visível
  useEffect(() => {
    if (!visible) return;

    // Caso especial: apenas fade-in do símbolo
    if (special) {
      setDisplay(special);
      return;
    }

    // Animação de contagem do zero até o valor final usando requestAnimationFrame para suavidade
    const startTime = performance.now();
    const fps = 60;
    const interval = 1000 / fps;

    // Easing: easeOutCubic — começa rápido, desacelera no final
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // Função de animação que atualiza o número exibido com base no tempo decorrido
    const tick = (now) => {
      const elapsed = now - startTime; // Tempo decorrido desde o início da animação
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * value);
      setDisplay(current);

      // Continua a animação enquanto não tiver atingido o valor final
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    // Inicia a animação
    requestAnimationFrame(tick);
  }, [visible, value, duration, special]);

  return (
    // O número animado é exibido com o sufixo, e se for um caso especial, exibe o texto definido
    <span
      ref={ref}
      style={{
        transition: special ? "opacity 0.8s ease" : undefined,
        opacity: special ? (visible ? 1 : 0) : 1,
      }}
    >
      {display}{!special && suffix}
    </span>
  );
}

export default AnimatedNumber;