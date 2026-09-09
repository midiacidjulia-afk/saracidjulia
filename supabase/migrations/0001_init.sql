-- Juntos pela Obra — schema inicial
-- Igrejas, participantes, contribuições, comprovantes e configurações da campanha.

create extension if not exists "pgcrypto";

create type receipt_status as enum ('pendente', 'aprovado', 'reprovado');

create table if not exists churches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  created_at timestamptz not null default now()
);

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp text not null,
  city text not null,
  church_id uuid not null references churches (id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists contributions (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references participants (id) on delete cascade,
  church_id uuid not null references churches (id) on delete restrict,
  cotas integer not null check (cotas > 0),
  amount numeric(12, 2) not null check (amount >= 0),
  contribution_date date not null,
  status receipt_status not null default 'pendente',
  created_at timestamptz not null default now()
);

create table if not exists receipts (
  id uuid primary key default gen_random_uuid(),
  contribution_id uuid not null references contributions (id) on delete cascade,
  file_url text not null,
  status receipt_status not null default 'pendente',
  reviewed_by uuid references auth.users (id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists settings (
  id smallint primary key default 1 check (id = 1),
  goal_amount numeric(12, 2) not null default 100000,
  cota_value numeric(12, 2) not null default 100,
  total_cotas integer not null default 1000,
  whatsapp_number text not null default '',
  whatsapp_contact_name text not null default 'Nivaldo',
  updated_at timestamptz not null default now()
);
insert into settings (id) values (1) on conflict (id) do nothing;

create table if not exists impact_stats (
  id smallint primary key default 1 check (id = 1),
  people_reached integer not null default 0,
  lives_transformed integer not null default 0,
  families_supported integer not null default 0,
  new_people integer not null default 0,
  projects_completed integer not null default 0,
  updated_at timestamptz not null default now()
);
insert into impact_stats (id) values (1) on conflict (id) do nothing;

create index if not exists idx_participants_church on participants (church_id);
create index if not exists idx_contributions_participant on contributions (participant_id);
create index if not exists idx_contributions_church on contributions (church_id);
create index if not exists idx_contributions_status on contributions (status);
create index if not exists idx_receipts_contribution on receipts (contribution_id);

-- Row Level Security -------------------------------------------------------

alter table churches enable row level security;
alter table participants enable row level security;
alter table contributions enable row level security;
alter table receipts enable row level security;
alter table settings enable row level security;
alter table impact_stats enable row level security;

-- Leitura pública: dashboard, ranking e cotas são públicos.
-- Contribuições/participantes só expõem dados aprovados publicamente;
-- o painel admin (usuário autenticado) enxerga tudo via policies "auth".

create policy "public read churches" on churches
  for select using (true);

create policy "public read settings" on settings
  for select using (true);

create policy "public read impact_stats" on impact_stats
  for select using (true);

create policy "public read approved contributions" on contributions
  for select using (status = 'aprovado');

create policy "public insert contributions" on contributions
  for insert with check (true);

create policy "public read participants of approved contributions" on participants
  for select using (
    exists (
      select 1 from contributions
      where contributions.participant_id = participants.id
        and contributions.status = 'aprovado'
    )
  );

create policy "public insert participants" on participants
  for insert with check (true);

create policy "public insert receipts" on receipts
  for insert with check (true);

-- Administradores autenticados (Supabase Auth) têm acesso total.

create policy "admin manage churches" on churches
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin manage participants" on participants
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin manage contributions" on contributions
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin manage receipts" on receipts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin manage settings" on settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "admin manage impact_stats" on impact_stats
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage: bucket privado para os comprovantes enviados no formulário.
insert into storage.buckets (id, name, public)
values ('comprovantes', 'comprovantes', false)
on conflict (id) do nothing;

create policy "public upload comprovantes" on storage.objects
  for insert with check (bucket_id = 'comprovantes');

create policy "admin read comprovantes" on storage.objects
  for select using (bucket_id = 'comprovantes' and auth.role() = 'authenticated');
