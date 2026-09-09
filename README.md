# Juntos pela Obra

Plataforma de arrecadação da igreja **Sara Nossa Terra — Júlia-SP**, com meta de
**R$ 100.000,00** para reforma do templo, dividida em **1.000 cotas de R$ 100,00**.

> "Um templo renovado. Mais vidas alcançadas."

Veja `CLAUDE.md` para o contexto completo do projeto (identidade visual, tom de
voz, estrutura de páginas e modelo de dados).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS v4
- [Supabase](https://supabase.com) (PostgreSQL, Auth, Storage)
- [Recharts](https://recharts.org) para os gráficos do painel admin
- Deploy: [Vercel](https://vercel.com)

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Sem nenhuma configuração adicional, o site já funciona em **modo de
demonstração**, com dados de exemplo (`src/lib/mock-data.ts`) — inclusive o
painel `/admin`, acessível sem login enquanto o Supabase não está conectado.

## Conectando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Copie `.env.example` para `.env.local` e preencha:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```
3. Rode a migração `supabase/migrations/0001_init.sql` no SQL editor do
   Supabase (ou via `supabase db push` com a CLI).
4. Crie um usuário em **Authentication → Users** no painel do Supabase — esse
   será o login de `/admin/login`.

Com essas variáveis definidas, os dados reais substituem automaticamente os
de demonstração e a autenticação do painel administrativo passa a ser
obrigatória.

## Comandos

```bash
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run start    # roda o build de produção
npm run lint     # eslint
```

## Estrutura

```
src/
  app/
    (public)/        # site público (dashboard, contribuir, impacto, cotas...)
    admin/            # painel administrativo (protegido por Supabase Auth)
  components/
    public/           # componentes do site público
    admin/            # componentes do painel admin
    ui/               # componentes de base (botão, card, campo...)
    layout/           # header, footer, navegação mobile
  lib/
    supabase/         # clients Supabase (browser/server) e tipos gerados
    data/              # camada de acesso a dados (Supabase → fallback mock)
    mock-data.ts       # dados de demonstração
supabase/
  migrations/          # schema SQL (tabelas, RLS, storage)
```
