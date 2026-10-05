# JT Estética Automotiva

Landing page moderna de alta performance desenvolvida para o estabelecimento **JT Estética Automotiva** (Lava-jato em Curitiba, Paraná).

## 🚀 Tecnologias e Recursos

- **Next.js 16 (App Router)** com **TypeScript** e **Tailwind CSS v4**
- **GSAP + ScrollTrigger + SplitText**:
  - Ticker sincronizado com Lenis para taxa de quadros e rolagem suave ultra fluida
  - Revelação de tipografia mascarada linha a linha e palavra por palavra
  - Parallax dinâmico no vídeo Hero e nas seções
  - Efeito magnético nos botões com `quickTo` para ponteiros finos
  - Faixa Marquee reativa à velocidade e direção do scroll
- **Framer Motion**:
  - Animação no Hero com gradiente Aurora animado
- **Vídeo Hero em Background**:
  - Faróis de Ferrari ligando em 1080p, com suporte a pausa/reprodução e respeito a `prefers-reduced-motion`
- **Atendimento Automatizado no WhatsApp**:
  - Saudação inteligente (Bom dia, Boa tarde, Boa noite) calculada no fuso de Curitiba/PR
  - Mensagem personalizada de acordo com o contexto do clique (geral, horários, localização, orçamento)
- **Google Maps Integrado**:
  - Endereço completo verificado na Rua Frei Rogério, 50
  - Botão de rota direta e mapa interativo
- **Cálculo de Status Aberto / Fechado em Tempo Real**:
  - Seg–Sex: 08:15 – 18:00
  - Sáb: 08:15 – 14:00
  - Dom: Fechado

## 🛠️ Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/Ryan863/jt-estetica-automotiva.git
```

2. Acesse a pasta do projeto:
```bash
cd jt-estetica-automotiva
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
