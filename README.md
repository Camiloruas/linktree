# Linktree

Aplicação React + TypeScript + Vite com Firebase.

## Variáveis de ambiente

As credenciais do Firebase foram movidas para variáveis de ambiente para evitar que voltem ao Git.

1. Use o arquivo `.env.example` como referência.
2. Mantenha suas credenciais reais apenas no arquivo `.env`.
3. O `.env` está ignorado no Git por meio do `.gitignore`.

Exemplo:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

## Rodando o projeto

```bash
npm install
npm run dev
```
