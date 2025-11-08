# Hera Corporation

## 👥 Equipe
- Pedro Henrique Dias França - 561940
- Luiz Gustavo Gonçalves - 564495
- Olavo Porto Neves - 563558

## 🚀 Visão Geral
A Hera é uma startup focada em reduzir taxas de absenteísmo em teleconsultas para hospitais. Nosso objetivo é garantir preparo, engajamento e qualidade em cada etapa da jornada do paciente, aumentando a adesão e a efetividade das consultas remotas.

Após a primeira consulta presencial, entramos em ação com um sistema de automações integrado ao WhatsApp — inicialmente via Telegram, por questões de custo. Nossa plataforma:

- Envia vídeos e guias de acesso passo a passo.
- Dispara lembretes diários e checkpoints de preparo.
- Oferece gamificação e status de jornada para incentivar o progresso.
- Mantém comunicação humanizada em cada contato.
- Inclui um verificador de pré-consulta (teste de câmera e som).
- Permite adicionar um acompanhante, que recebe os mesmos conteúdos.

## 🛠️ Tecnologias

### Frontend
- [Vite](https://vitejs.dev/) - Build tool e servidor de desenvolvimento
- [React](https://react.dev/) - Biblioteca JavaScript para interfaces de usuário
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado do JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [React Router](https://reactrouter.com/) - Roteamento para aplicações React

## 🚀 Começando

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm (vem com o Node.js) ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/hera_corporation.git
   cd hera_corporation
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

### Comandos disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera uma versão otimizada para produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter no código

## 📂 Estrutura do Projeto

```
hera_corporation/
├── public/                   # Arquivos estáticos servidos diretamente
├── src/                      # Código-fonte da aplicação (React + TS)
│   ├── assets/              # Imagens, ícones e outros assets
│   ├── components/          # Componentes reutilizáveis (Header, Footer, Toast, etc.)
│   ├── contexts/            # Contextos React (ToastContext)
│   ├── interfaces/          # Interfaces TypeScript centralizadas
│   ├── pages/               # Páginas/rotas da aplicação
│   ├── services/            # Serviços de API e autenticação
│   ├── App.tsx              # Componente raiz da aplicação
│   ├── index.css            # Estilos globais e animações
│   └── main.tsx             # Ponto de entrada da aplicação
├── index.html               # Template HTML principal
├── package.json             # Dependências e scripts
├── tailwind.config.js       # Configuração do Tailwind CSS
└── tsconfig.json            # Configuração do TypeScript
```

## 🔐 Como Usar o Sistema

### 1️⃣ **Primeiro Acesso - Cadastro**

1. Acesse a aplicação em [https://hera-corporation.vercel.app/](https://hera-corporation.vercel.app/)
2. Clique em **"Faça login para ver a solução"** ou acesse diretamente `/login`
3. Clique em **"Criar nova conta"** na parte inferior
4. Preencha os dados:
   - **Nome completo**
   - **Email**
   - **Senha**
5. Clique em **"Cadastrar"**
6. Você verá uma notificação de sucesso ✅
7. Agora faça login com suas credenciais

### 2️⃣ **Login**

1. Na página de login (`/login`), preencha:
   - **Email** cadastrado
   - **Senha**
2. Clique em **"Entrar"**
3. Você será redirecionado automaticamente para o **Dashboard**

### 3️⃣ **Navegação no Dashboard**

Após o login, você terá acesso ao **Dashboard** com as seguintes funcionalidades:

#### **📊 Gerenciar Pacientes**
- **Cadastrar**: Adicionar novo paciente com dados completos
- **Visualizar**: Ver lista de todos os pacientes
- **Editar**: Atualizar informações de um paciente
- **Excluir**: Remover um paciente do sistema

#### **👨‍⚕️ Gerenciar Médicos**
- **Cadastrar**: Adicionar novo médico (CRM, especialidade, etc.)
- **Visualizar**: Ver lista de todos os médicos
- **Editar**: Atualizar informações de um médico
- **Excluir**: Remover um médico do sistema

#### **📅 Gerenciar Consultas**
- **Cadastrar**: Agendar nova consulta (paciente + médico + data/hora)
- **Visualizar**: Ver lista de todas as consultas
- **Editar**: Atualizar informações de uma consulta
- **Excluir**: Cancelar uma consulta

### 4️⃣ **Funcionalidades Especiais**

#### **🔔 Notificações Toast**
O sistema possui notificações elegantes que aparecem no canto superior direito:
- ✅ **Sucesso** (verde): Operação realizada com sucesso
- ❌ **Erro** (vermelho): Algo deu errado
- ⚠️ **Aviso** (amarelo): Atenção necessária
- ℹ️ **Info** (azul): Informação importante

#### **🔐 Sessão Persistente**
- Seu login fica salvo mesmo se você fechar o navegador
- Você pode navegar entre as páginas sem precisar fazer login novamente
- A sessão só expira quando você clica em **"Sair"**

#### **🚪 Logout**
Para sair da conta:
1. No Dashboard, clique no botão vermelho **"Sair"** no canto superior direito
2. Você será redirecionado para a página de login
3. Sua sessão será encerrada

#### **📱 Acesso Rápido ao Dashboard**
Quando logado, você verá um botão **"Dashboard"** no header em todas as páginas para acesso rápido!

### 5️⃣ **Fluxo Completo de Uso**

```
1. Cadastro → 2. Login → 3. Dashboard → 4. Escolher operação (CRUD)
                    ↓
              5. Executar ação → 6. Ver notificação → 7. Continuar usando
                    ↓
              8. Logout (quando terminar)
```

## 🎨 Recursos Visuais

- ✨ **Animações suaves** em cards e botões
- 🎨 **Gradientes modernos** em botões e backgrounds
- 📱 **Totalmente responsivo** (mobile, tablet, desktop)
- 🌈 **Feedback visual** em todas as ações
- 🎯 **Interface intuitiva** e fácil de usar

## 🔗 API Backend

A aplicação consome a API REST hospedada em:
```
https://hera-api.onrender.com/hera-api
```

**Endpoints disponíveis:**
- `POST /login` - Autenticação
- `POST /usuarios` - Cadastro de usuários
- `GET/POST/PUT/DELETE /pacientes` - CRUD de pacientes
- `GET/POST/PUT/DELETE /medicos` - CRUD de médicos
- `GET/POST/PUT/DELETE /consultas` - CRUD de consultas

## 🎯 Pilares da Solução
- Automação de comunicação (WhatsApp/Telegram) com mensagens segmentadas.
- Conteúdo educativo multimídia (vídeos, guias e orientações claras).
- Lembretes inteligentes e rotinas diárias de engajamento.
- Gamificação e status da jornada para mostrar progresso.
- Verificador técnico de pré-consulta (câmera, microfone e acesso).
- Suporte a acompanhante com recebimento de comunicações paralelas.
- Linguagem e tom humanizados em todas as interações.

## 🤝 Contribuindo
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça o push da branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🤝 Link do Repositório, Projeto na Vercel e Youtube
- https://github.com/pedrozhd/hera_corp.git
- https://hera-corporation.vercel.app/
- https://youtu.be/76jVMzFffsM

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✉️ Contato
Para mais informações, entre em contato conosco através do email: contato@heracorporation.com
