import { useCallback, useState } from "react";

// O tema inicial ja foi aplicado por um script inline no index.html (evita
// piscar); aqui so lemos e alternamos a classe `dark` no <html>.
export function useTheme() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("tema", next ? "escuro" : "claro");
    } catch {
      // navegador bloqueando storage: o tema so nao fica salvo
    }
    setDark(next);
  }, []);

  return { dark, toggle };
}
