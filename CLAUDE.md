@AGENTS.md

# CLAUDE.md

Este arquivo dá contexto ao Claude Code sobre o projeto. Leia antes de gerar ou alterar código.

## Sobre o projeto

**Juntos pela Obra** — plataforma de arrecadação da igreja **Sara Nossa Terra (Júlia-SP)**, com meta de **R$ 100.000,00** para reforma do templo, dividida em **1.000 cotas de R$ 100,00**.

- Slogan: "Um templo renovado. Mais vidas alcançadas."
- Contato responsável pela obra: **Nivaldo** (recebe comprovantes via WhatsApp)
- Referência: Lucas 6:38, citada no hero da página inicial

## Stack

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS v4
- **Backend/Banco:** Supabase (PostgreSQL + Auth + Storage)
- **Gráficos:** Recharts
- **Ícones:** lucide-react
- **Deploy:** Vercel
- **Integrações:** WhatsApp (link `wa.me` com mensagem pré-preenchida na tela de agradecimento)

## Identidade visual

Alinhada à identidade oficial da Sara Nossa Terra (referência: sntzonasul.com.br) — grafite escuro nos menus e azul como destaque —, combinada com um conteúdo claro e caloroso pedido explicitamente pelo cliente.

- Menu/sidebar e rodapé: grafite escuro (tokens `sidebar`/`sidebar-elevated`/`sidebar-border`/`sidebar-foreground` em `globals.css`)
- Área de conteúdo: creme/branco claro (`background`/`background-card`), nunca volta a ficar escura — pedido explícito do cliente após ver a primeira versão ("mais leve, mais claro, que traga mais conexão e amor")
- Destaque: azul (`accent`/`accent-light`/`accent-dark`) — substitui o dourado usado na primeira versão
- Texto: tons neutros escuros sobre claro (`foreground`), claros sobre o grafite (`sidebar-foreground`)
- Tipografia elegante, institucional (Playfair Display nos títulos, Inter no corpo)
- Glow/luz sutil, animações discretas — nunca "gamificado" ou infantilizado
- Layout mobile-first, design responsivo em todas as páginas (com navegação inferior no mobile)

Não existe arquivo de logo real da igreja — `src/components/ui/Logo.tsx` usa uma marca própria em forma de folha/chama que evoca o símbolo da Sara Nossa Terra.

## Tom de voz (regra importante)

Nunca usar linguagem de "doação". Sempre linguagem de **participação e pertencimento**:

| Evitar | Usar |
|---|---|
| Doar / Doação | Contribuir / Fazer parte |
| Progresso da arrecadação | Nossa meta / Nosso impacto |
| Sua doação | Sua cota / Sua participação |

Frases-padrão já validadas: "Quero fazer parte", "Quero contribuir", "Minha cota", "Nossa meta", "Nosso impacto".

## Estrutura da aplicação

### Área pública (`src/app/(public)`)
- `/` — Dashboard principal (hero, meta, métricas, impacto real, grade de 1.000 cotas, ranking de igrejas, últimas contribuições)
- `/contribuir` — Formulário multi-etapa (Dados → Participação → Data → Comprovante → Finalizar) + tela de agradecimento com orientação para enviar comprovante pelo WhatsApp
- `/impacto` — Números de pessoas alcançadas, vidas transformadas, famílias acompanhadas, projetos realizados
- `/cotas` — Visualização detalhada das 1.000 cotas com marcos de progresso (25/50/75/100%)
- `/ranking` — Ranking por igreja e por participante (abas)
- `/contribuicoes` — Lista completa de últimas contribuições
- `/sobre` — Contexto institucional da reforma

### Área administrativa (`src/app/admin`, protegida por Supabase Auth)
- `/admin/login` — Login (fora do shell administrativo)
- `/admin` — Dashboard geral
- `/admin/participantes` — Lista, busca, filtro por status, exportação CSV
- `/admin/igrejas` — Gestão das igrejas participantes e cotas
- `/admin/comprovantes` — Aprovação/rejeição de comprovantes
- `/admin/graficos` — Relatórios e gráficos (Recharts)
- `/admin/configuracoes` — Configurações gerais (meta, valor da cota, WhatsApp)

O acesso a `/admin/*` é protegido por `src/proxy.ts` (antigo `middleware.ts` — Next.js 16 renomeou a convenção), que verifica a sessão do Supabase Auth.

## Modo de demonstração (sem Supabase configurado)

Enquanto `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` não estiverem definidos:
- `src/lib/supabase/env.ts` expõe `isSupabaseConfigured = false`;
- `src/lib/data/queries.ts` retorna dados de exemplo de `src/lib/mock-data.ts` em vez de consultar o Supabase;
- o painel `/admin` fica acessível sem login (com um aviso visível de "modo de demonstração"), para permitir revisar o layout antes de provisionar o backend;
- os formulários (`/contribuir`, cadastro de igreja, configurações, revisão de comprovantes) retornam mensagens de erro ao tentar persistir, exceto o envio de contribuição, que simula sucesso para permitir testar a jornada completa até a tela de agradecimento.

Essa camada existe para manter `npm run dev`/`npm run build` funcionando sem segredos — **não é** um mecanismo de autenticação real e não deve ser usado em produção.

## Modelo de dados (alto nível)

Ver migração SQL em `supabase/migrations/0001_init.sql`.

- `churches` — igrejas participantes
- `participants` — participantes da campanha
- `contributions` — contribuições (cotas, valor, participante, igreja, data, status)
- `receipts` — comprovantes enviados (arquivo no Storage, status de aprovação)
- `settings` — configurações (meta, valor da cota, WhatsApp)
- `impact_stats` — números do bloco "Impacto real"

RLS habilitado em todas as tabelas: leitura pública restrita a contribuições/participantes aprovados, inserção pública liberada (formulário de contribuição), e acesso total para usuários autenticados (painel admin).

## Requisitos não-funcionais

- Segurança e proteção de dados dos participantes (LGPD) — RLS no Supabase, bucket de comprovantes privado
- Exportação de dados em CSV no painel admin (`src/lib/csv.ts`)
- Atualização de métricas via Server Components (near real-time a cada requisição/revalidação)
- Facilidade de manutenção — priorizar simplicidade sobre abstrações desnecessárias

## Convenções de código

- Componentes React em `PascalCase`, uma responsabilidade por componente
- Tailwind para estilos (tokens de tema em `src/app/globals.css`); evitar CSS solto fora do padrão do projeto
- Variáveis de ambiente para chaves do Supabase — nunca commitar segredos (ver `.env.example`)
- Server Components por padrão; `"use client"` apenas onde há interatividade (formulários, filtros, gráficos)
- Mutações via Server Actions (`actions.ts` ao lado da página), nunca API routes desnecessárias

## Comandos úteis

```bash
npm run dev      # ambiente de desenvolvimento (http://localhost:3000)
npm run build    # build de produção
npm run start    # roda o build de produção
npm run lint     # eslint
```

Para conectar o Supabase real: copie `.env.example` para `.env.local`, preencha as chaves do projeto e rode a migração em `supabase/migrations/0001_init.sql` (via Supabase CLI ou SQL editor do painel).
