# Linktree

Projeto em desenvolvimento inspirado em uma página de links, com área pública e uma área administrativa protegida por autenticação com Firebase.

O app ainda não está finalizado, mas já possui a base de navegação, login e proteção de rota para evolução das próximas funcionalidades.

## Status do projeto

Atualmente o projeto possui:

- página inicial pública
- tela de login integrada ao Firebase Authentication
- rota privada para a área administrativa
- estrutura inicial para gerenciamento de redes sociais
- configuração de variáveis de ambiente com `.env`

Pontos que ainda estão em construção:

- conteúdo final da área administrativa
- cadastro e edição completa dos links sociais
- refinamento visual e experiência responsiva
- validações e fluxos extras de autenticação

## Tecnologias

- React
- TypeScript
- Vite
- React Router
- Firebase
- Tailwind CSS

## Rotas atuais

As rotas disponíveis hoje são:

- `/` página inicial pública
- `/login` autenticação do usuário
- `/networks` página inicial para redes sociais
- `/admin/social` área protegida por login

## Como executar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Use o arquivo `.env.example` como base e crie seu `.env` local com as credenciais do Firebase.

Exemplo:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

Importante:

- o arquivo `.env` não deve ser enviado para o Git
- o projeto usa apenas variáveis prefixadas com `VITE_`
- se alguma variável estiver ausente, a inicialização do Firebase falhará

### 3. Rode o projeto em desenvolvimento

```bash
npm run dev
```

### 4. Gerar build de produção

```bash
npm run build
```

### 5. Validar o código com lint

```bash
npm run lint
```

## Estrutura principal

```txt
src/
  components/
    input/
    social/
  pages/
    admin/
    home/
    login/
    networks/
  routes/
    Private.tsx
  services/
    firebaseConnections.ts
```

## Segurança

Alguns cuidados já aplicados no projeto:

- credenciais removidas do código-fonte e movidas para `.env`
- `.env` ignorado pelo Git
- arquivo `.env.example` incluído para facilitar configuração sem expor segredos
- rota administrativa protegida por verificação de autenticação

## Próximos passos sugeridos

- conectar a área administrativa ao Firestore
- permitir criar, listar, editar e remover links
- melhorar feedbacks de erro e sucesso no login
- adicionar logout
- publicar o projeto com ambiente separado para produção

## Observação

Este README descreve o estado atual do projeto. Conforme novas funcionalidades forem sendo adicionadas, vale atualizar esta documentação para mantê-la compatível com a implementação real.
