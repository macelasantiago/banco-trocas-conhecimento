import { useEffect, useState } from "react";

// Hook personalizado para criar um efeito de máquina de escrever, onde o texto é revelado caractere por caractere.
function useTypewriter(lines, speed = 45, pauseBetween = 300) {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [done, setDone]   = useState(false);

  // Lógica de digitação: escreve a primeira linha, depois a segunda, com pausas entre elas
  useEffect(() => {
    let timeoutId;
    let charIndex = 0;

    // Escreve a primeira linha caractere por caractere
    const typeLine1 = () => {
      if (charIndex <= lines[0].length) {
        setLine1(lines[0].slice(0, charIndex));
        charIndex++; // Incrementa o índice para revelar o próximo caractere
        timeoutId = setTimeout(typeLine1, speed);
      } else {
        timeoutId = setTimeout(typeLine2Start, pauseBetween);
      }
    };

    // Escreve a segunda linha após a primeira, com a mesma lógica
    let charIndex2 = 0;
    // Função para iniciar a digitação da segunda linha  
    const typeLine2Start = () => {
      const type = () => {
        // Continua revelando a segunda linha caractere por caractere
        if (charIndex2 <= lines[1].length) {
          setLine2(lines[1].slice(0, charIndex2));
          charIndex2++;
          timeoutId = setTimeout(type, speed);
        } else {
          setDone(true);
        }
      };
      type();
    };

    typeLine1();
    return () => clearTimeout(timeoutId);
  }, []);

  return { line1, line2, done };
}

export default useTypewriter;