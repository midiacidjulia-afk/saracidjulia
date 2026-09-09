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

Tema escuro unificado (cinza grafite em toda a aplicação, não só no menu), com dois destaques que dividem função: **branco pérola** para marca/ação e **dourado** para valor/celebração (cotas, ranking, dinheiro) — combinação lida como "premium" pedida explicitamente pelo cliente.

- Fundo: cinza grafite unificado em toda a aplicação — `background` (#232327, base), `background-elevated`, `background-card` (elevações mais claras, para hierarquia); `sidebar`/`sidebar-elevated`/`sidebar-border` levemente mais escuros que o conteúdo, para o menu/rodapé se destacarem como um painel; tom mais claro que as versões anteriores, a pedido do cliente ("cinza um pouco mais claro")
- Destaque de marca/ação: branco pérola (`accent`/`accent-light`/`accent-dark`) — badge da marca, botões, links, navegação, elementos interativos; por ser um tom claro sobre fundo escuro, todo preenchimento sólido de `bg-accent` usa texto escuro (`text-sidebar`) em vez de branco, para manter contraste
- Destaque de valor/celebração: dourado (`gold`/`gold-light`/`gold-dark`) — pirâmide de cotas, valores arrecadados, medalhas do ranking (1º/2º/3º), citações em itálico
- Cores de status: verde/âmbar/vermelho vivos (`success`/`warning`/`danger`), tons "-400" do Tailwind — legíveis sobre fundo escuro
- Texto: off-white quente (`foreground`) sobre o grafite
- Tipografia elegante, institucional (Playfair Display nos títulos, Inter no corpo)
- Glow/luz sutil (`glow-accent`, `glow-gold`), animações discretas — nunca "gamificado" ou infantilizado
- Layout mobile-first, design responsivo em todas as páginas (com navegação inferior no mobile)
- Vídeo de mensagem (Nivaldo) como banner no topo da home, antes do hero — não mais como plano de fundo full-bleed
- Marca (`Logo.tsx`) é um desenho próprio em forma de folha/chama que evoca o símbolo da Sara Nossa Terra; não há arquivo vetorial real da marca da igreja disponível no projeto — o cliente enviou uma referência de logo de uma unidade parceira (Sara Saúde) com o mesmo ícone de chama em branco sobre fundo escuro, usada para calibrar o desenho e o layout do wordmark (`LogoBadge` + nome em duas linhas: nome principal + linha menor em caixa alta)
- Wordmark do cabeçalho público (`PublicSidebar.tsx`): "Sara" / "Cidade Júlia" — nome de exibição da marca, distinto do nome institucional completo ("Sara Nossa Terra — Júlia-SP") usado no rodapé e nos textos institucionais

Histórico: v1 preto/dourado → v2 claro/creme → v3 híbrido (menu escuro + conteúdo claro) com azul da SNT → v4 cinza escuro unificado com azul+dourado → v5 vídeo em banner no topo, logo refinado, azul trocado por branco pérola → **v6 (atual)**: cinza de fundo mais claro, branco pérola mais intenso, badge da marca com tinta pérola (em vez de dourado) e wordmark do cabeçalho ajustado para "Sara / Cidade Júlia" a partir de referência visual enviada pelo cliente.

Histórico: a primeira versão era preto/dourado; depois foi para um tema claro/creme a pedido do cliente ("mais leve, mais claro"); depois ganhou o azul da identidade oficial da SNT num modelo híbrido (menu escuro + conteúdo claro); a versão atual voltou a ser inteiramente escura ("cinza escuro, cores mais premium"), reaproveitando o dourado como segundo destaque em vez de descartá-lo.

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
