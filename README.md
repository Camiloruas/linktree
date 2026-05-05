# DevLink

Projeto inspirado em uma página de links (Linktree), com área pública e uma área administrativa protegida por autenticação com Firebase.

## Funcionalidades

- **Área Pública**: Visualização de todos os links cadastrados e ícones sociais automáticos.
- **Autenticação**: Login seguro com Firebase Auth.
- **Gerenciamento Unificado**: Cadastro, listagem e remoção de links em um único local.
- **Identificação Inteligente**: Reconhecimento automático de redes sociais e portfólio/trabalho para exibição de ícones no rodapé.
- **Customização**: Escolha de cores de fundo e texto para cada link.

## Tecnologias

- React
- TypeScript
- Vite
- React Router
- Firebase (Auth & Firestore)
- Tailwind CSS
- React Icons

## Rotas

- `/` - Página inicial pública
- `/login` - Autenticação do usuário
- `/admin` - Gerenciamento de links (Protegida)

## Como executar o projeto

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Configure o Firebase**
   Crie um projeto no console do Firebase e configure as credenciais em `src/services/firebaseConnections.ts`.

3. **Execute o projeto**
   ```bash
   npm run dev
   ```
