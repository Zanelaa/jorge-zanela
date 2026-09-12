// Tudo que muda de pessoa pra pessoa fica aqui. Pra reaproveitar o site em
// outro projeto, troque estes dados e as imagens em public/img.
export const SITE = {
  name: "Jorge Zanela",
  fullName: "Jorge Luis Zanela",
  role: "Desenvolvedor full stack e automação",
  city: "Joinville, SC",
  whatsapp: "5547992275739",
  whatsappDisplay: "(47) 99227-5739",
  email: "jorge.luis.zanela@outlook.com",
  linkedin: "https://www.linkedin.com/in/jorge-luis-zanela",
  github: "https://github.com/Zanelaa",
} as const;

// Um unico rotulo pra intencao "falar comigo", usado no site inteiro.
export const CTA_LABEL = "Chamar no WhatsApp";

const MENSAGEM_PADRAO = "Olá, Jorge! Vi seu site e quero conversar sobre um projeto.";

export function whatsappLink(mensagem: string = MENSAGEM_PADRAO) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
