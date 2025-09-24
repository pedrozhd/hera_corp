# Hera Corporation

## Alunos
- Pedro Henrique Dias França - 561940
- Luiz Gustavo Gonçalves - 564495
- Olavo Porto Neves - 563558

## Visão Geral
A Hera é uma startup focada em reduzir taxas de absenteísmo em teleconsultas para hospitais. Nosso objetivo é garantir preparo, engajamento e qualidade em cada etapa da jornada do paciente, aumentando a adesão e a efetividade das consultas remotas.

Após a primeira consulta presencial, entramos em ação com um sistema de automações integrado ao WhatsApp — inicialmente via Telegram, por questões de custo. Nossa plataforma:

- Envia vídeos e guias de acesso passo a passo.
- Dispara lembretes diários e checkpoints de preparo.
- Oferece gamificação e status de jornada para incentivar o progresso.
- Mantém comunicação humanizada em cada contato.
- Inclui um verificador de pré-consulta (teste de câmera e som).
- Permite adicionar um acompanhante, que recebe os mesmos conteúdos.

Dessa forma, garantimos que o paciente esteja tecnicamente preparado, engajado e bem orientado, reduzindo faltas e imprevistos em teleconsultas.

## Pilares da Solução
- Automação de comunicação (WhatsApp/Telegram) com mensagens segmentadas.
- Conteúdo educativo multimídia (vídeos, guias e orientações claras).
- Lembretes inteligentes e rotinas diárias de engajamento.
- Gamificação e status da jornada para mostrar progresso.
- Verificador técnico de pré-consulta (câmera, microfone e acesso).
- Suporte a acompanhante com recebimento de comunicações paralelas.
- Linguagem e tom humanizados em todas as interações.

## Estrutura do Projeto
Este repositório contém o front-end da plataforma, construído com Vite, React e TypeScript.

Estrutura principal de diretórios:

```
hera_corporation/
├─ projeto_antigo/           # Protótipos/ativos estáticos da versão anterior (HTML/CSS/JS puros)
│  ├─ html/
│  ├─ scripts/
│  └─ styles/
├─ public/                   # Arquivos estáticos servidos diretamente
├─ src/                      # Código-fonte da aplicação (React + TS)
│  ├─ assets/                # Imagens, ícones e outros assets
│  ├─ components/            # Componentes reutilizáveis (ex.: header, aboutproject, contact, faq)
│  ├─ pages/                 # Páginas/rotas da aplicação (ex.: about, betasolution, faqpage)
│  ├─ utils/                 # Funções utilitárias e helpers
│  ├─ App.css                # Estilos globais/escopados do App
│  └─ App.tsx                # Componente raiz da aplicação
├─ index.html                # Template HTML principal usado pelo Vite
├─ vite.config.ts            # Configuração do Vite
├─ tsconfig*.json            # Configurações TypeScript do projeto
├─ eslint.config.js          # Regras de lint
├─ package.json              # Dependências e scripts NPM
└─ README.md                 # Este documento
