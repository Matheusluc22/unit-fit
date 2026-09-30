<div align="center">
  <img src="logo.jpg" alt="UniFit Logo" width="120" style="border-radius: 20px; box-shadow: 0 4px 20px rgba(34, 197, 94, 0.3);">
  <h1>🏋️‍♂️ UniFit - Inteligência Artificial para Treinos Personalizados</h1>
  <p><strong>Plataforma fitness de alta performance que gera rotinas de treino otimizadas, acompanha evolução e oferece suporte PWA completo.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/PWA-Ready-22c55e?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA">
    <img src="https://img.shields.io/badge/Status-Online-success?style=for-the-badge" alt="Status">
  </p>
</div>

---

## 📋 Sobre o Projeto

O **UniFit** é uma aplicação web progressiva (PWA) de musculação e condicionamento físico focada em resultados reais. Utilizando algoritmos inteligentes de periodização e prescrição, o UniFit gera treinos sob medida de acordo com o objetivo, nível de experiência, frequência semanal e restrições de cada usuário.

---

## ✨ Funcionalidades Principais

- 🤖 **Geração Inteligente de Treinos**: Cálculo automático de volume, intensidade, descanso e divisão de treino (ABC, ABCD, Push/Pull/Legs, etc.).
- 🛠️ **Montador de Treino Interativo (Workout Builder)**: Permite personalizar rotinas, trocar exercícios e ajustar séries e repetições.
- ⏱️ **Sessão de Treino em Tempo Real**: Timer de descanso integrado, marcação de séries concluídas e anotação de cargas.
- 📊 **Evolução e Gráficos (Chart.js)**: Gráficos de volume semanal, frequência, evolução de cargas e histórico completo.
- 🎮 **Gamificação e Recompensas**: Sistema de XP, níveis, metas diárias e insígnias para manter a disciplina em alta.
- 📍 **Localização de Academias (Leaflet & OpenStreetMap)**: Busca e visualização de coordenadas geográficas e mapa interativo.
- 📱 **PWA (Progressive Web App)**: Totalmente responsivo, instalável no smartphone ou desktop, com suporte offline via Service Worker (`sw.js`).
- 💳 **Planos e Assinaturas**: Interface de checkout simulado com geração de QR Code Pix.

---

## 📁 Estrutura de Arquivos

```text
UniFit/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Deploy automático no GitHub Pages
├── css/
│   └── styles.css            # Estilos modernos com tema dark neon
├── js/
│   ├── services/             # Serviços modulares (API, Auth, Storage, etc.)
│   ├── utils/                # Funções utilitárias e validações
│   ├── admin.js              # Painel administrativo
│   ├── ai-assistant.js       # Assistente virtual de treino
│   ├── algorithm.js          # Algoritmo de geração de treinos
│   ├── app.js                # Orquestração e controle de telas
│   ├── auth.js               # Gestão de sessões de usuário
│   ├── evolution.js          # Métricas e gráficos de evolução
│   ├── exercises-db.js       # Banco de dados completo de exercícios
│   ├── gamification.js       # Sistema de XP, streaks e conquistas
│   ├── subscription.js       # Planos e assinaturas
│   ├── workout-builder.js    # Construtor customizado de fichas
│   └── workout-session.js    # Execução e timer de treinos
├── .gitignore                # Arquivos ignorados pelo Git
├── index.html                # Página principal e SPA
├── logo.jpg                  # Logo oficial do UniFit
├── manifest.webmanifest      # Manifesto PWA para instalação
├── README.md                 # Documentação do projeto
└── sw.js                     # Service Worker para cache offline
```

---

## 🚀 Como Executar Localmente

Como o UniFit é construído com tecnologias web puras (Vanilla HTML, CSS e JavaScript), você não precisa compilar nada:

1. Clone o repositório ou baixe os arquivos:
   ```bash
   git clone https://github.com/SEU_USUARIO/UniFit.git
   ```
2. Abra a pasta do projeto e dê dois cliques no arquivo `index.html`, ou utilize uma extensão como o **Live Server** no VS Code / editor de sua preferência.

---

## 🌐 Como Colocar o Site no Ar (Passo a Passo)

### Opção 1: GitHub Pages (100% Gratuito e Recomendado)

O projeto já está configurado com GitHub Actions em `.github/workflows/deploy.yml`.

1. Crie um novo repositório no seu GitHub com o nome `unifit` (público).
2. No seu terminal, envie os arquivos:
   ```bash
   git init
   git add .
   git commit -m "feat: projeto UniFit pronto para deploy"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/unifit.git
   git push -u origin main
   ```
3. Acesse o seu repositório no GitHub:
   - Vá em **Settings** > **Pages**.
   - Em **Build and deployment** > **Source**, escolha **GitHub Actions** (ou **Deploy from a branch** selecionando a branch `main` e pasta `/root`).
4. Seu site estará no ar em poucos segundos em:
   `https://SEU_USUARIO.github.io/unifit/`

---

### Opção 2: Vercel ou Netlify (Arrastar e Soltar)

1. Acesse [vercel.com](https://vercel.com) ou [netlify.com](https://netlify.com) e crie uma conta gratuita.
2. Arraste a pasta do projeto `UniFit` diretamente para o painel de importação.
3. O deploy é instantâneo e você recebe um link seguro (`https://seu-unifit.vercel.app` ou `https://seu-unifit.netlify.app`).

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de demonstração. Sinta-se livre para utilizar, modificar e evoluir a plataforma.
