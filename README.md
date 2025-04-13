
# 🎓 Kadoo Education - Frontend

Este projeto é o frontend do **Kadoo Education**, uma plataforma educacional com foco em mentorias, trilhas de aprendizado, bolsas, eventos e gamificação. Ele foi desenvolvido com **Next.js + TypeScript + Tailwind CSS** e segue uma arquitetura moderna baseada em domínio (Feature-based Architecture), pronta para escalar.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia       | Descrição                                                                 |
|------------------|---------------------------------------------------------------------------|
| **Next.js 15**   | Framework React fullstack com renderização híbrida (SSR + SSG)           |
| **React 19**     | Biblioteca base para construção da UI                                    |
| **TypeScript**   | Superset do JavaScript com tipagem estática                              |
| **Tailwind CSS** | Framework utilitário para estilos rápidos e responsivos                  |
| **Axios**        | Cliente HTTP para consumo da API backend (`kadoo-api`)                   |
| **App Router**   | Nova abordagem de rotas baseada em arquivos (Next.js 13+)                |
| **Turbopack**    | Compilador moderno do Next.js para desenvolvimento ultra rápido          |

---

## 🧱 Arquitetura do Projeto

A arquitetura é baseada em **feature-based folders**, permitindo organização por domínio funcional e alta escalabilidade.

```
src/
├── app/                      # Rotas e páginas (Next.js App Router)
│   ├── login/page.tsx        # Tela de login
│   └── dashboard/page.tsx    # Painel principal
│
├── components/               # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── Input.tsx
│   └── Button.tsx
│
├── features/                 # Domínios funcionais (DDD modularizado)
│   ├── auth/
│   ├── usuario/
│   ├── mentoria/
│   ├── edital/
│   ├── trilha/
│   └── evento/
│
├── services/                 # Comunicação com a API
│   └── api.ts
│
├── context/                  # Contextos globais (ex: autenticação)
│   └── AuthContext.tsx
│
├── hooks/                    # Hooks personalizados
│   └── useAuth.ts
├── lib/                      # Helpers e utilitários
├── types/                    # Tipagens globais
└── styles/                   # Estilos e Tailwind config
```

---

## 🔐 Autenticação

A autenticação utiliza **JWT**, armazenado no `localStorage`. Um **interceptor Axios** adiciona o token automaticamente nas requisições autenticadas:

```ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🧠 Vantagens da Arquitetura

- ✅ Separação de responsabilidades
- ✅ Alta escalabilidade e modularidade
- ✅ Reutilização de componentes e hooks
- ✅ Testabilidade por domínio
- ✅ Pronto para CI/CD e proteção de rotas

---

## 🛠️ Como rodar o projeto

```bash
# Clone o repositório

# Acesse a pasta
cd kadoo-web

# Instale as dependências
npm install

# Rode o projeto localmente
npm run dev
```


