import type {
  CampaignStats,
  Church,
  Contribution,
  ImpactStats,
  Participant,
  Settings,
  TopParticipant,
} from "./types";

// Dados de demonstração usados quando o Supabase não está configurado
// (ver src/lib/supabase/env.ts). Permite rodar `npm run dev` localmente
// sem depender de um projeto Supabase já existente.

export const mockSettings: Settings = {
  goalAmount: 20_000,
  cotaValue: 100,
  totalCotas: 200,
  whatsappNumber: "5511999999999",
  whatsappContactName: "Nivaldo",
};

export const mockChurches: Church[] = [
  { id: "1", name: "Sara Nossa Terra Cidade Júlia", city: "São Paulo", cotas: 34, amount: 3_400, participants: 18 },
  { id: "2", name: "Sara Nossa Terra Vila Prudente", city: "São Paulo", cotas: 21, amount: 2_100, participants: 11 },
  { id: "3", name: "Sara Nossa Terra Osasco", city: "Osasco", cotas: 15, amount: 1_500, participants: 8 },
  { id: "4", name: "Sara Nossa Terra Guarulhos", city: "Guarulhos", cotas: 9, amount: 900, participants: 5 },
  { id: "5", name: "Sara Nossa Terra ABC", city: "Santo André", cotas: 6, amount: 600, participants: 3 },
  { id: "6", name: "Sara Nossa Terra Zona Norte", city: "São Paulo", cotas: 4, amount: 400, participants: 2 },
];

const firstNames = [
  "Maria", "João", "Ana", "Pedro", "Juliana", "Carlos", "Fernanda", "Lucas",
  "Patrícia", "Rafael", "Camila", "Marcos", "Beatriz", "Gabriel", "Larissa",
  "Thiago", "Débora", "André", "Renata", "Felipe",
];
const lastNames = [
  "Silva", "Santos", "Oliveira", "Souza", "Costa", "Pereira", "Almeida",
  "Ferreira", "Rodrigues", "Gomes", "Martins", "Araújo", "Barbosa", "Ribeiro",
];

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function buildParticipants(): Participant[] {
  const rand = seededRandom(42);
  const statuses: Array<Participant["status"]> = ["aprovado", "aprovado", "aprovado", "pendente", "reprovado"];
  const list: Participant[] = [];
  const now = Date.now();

  for (let i = 0; i < 30; i++) {
    const church = mockChurches[Math.floor(rand() * mockChurches.length)];
    const cotas = 1 + Math.floor(rand() * 4);
    const daysAgo = Math.floor(rand() * 15);
    const name = `${firstNames[Math.floor(rand() * firstNames.length)]} ${lastNames[Math.floor(rand() * lastNames.length)]}`;

    list.push({
      id: String(i + 1),
      name,
      whatsapp: `1199999${String(1000 + i).padStart(4, "0")}`,
      city: church.city,
      churchId: church.id,
      churchName: church.name,
      cotas,
      amount: cotas * mockSettings.cotaValue,
      date: new Date(now - daysAgo * 86_400_000).toISOString(),
      status: statuses[Math.floor(rand() * statuses.length)],
      createdAt: new Date(now - daysAgo * 86_400_000 - Math.floor(rand() * 3_600_000)).toISOString(),
      hideFromRanking: rand() < 0.15,
    });
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const mockParticipants: Participant[] = buildParticipants();

export const mockContributions: Contribution[] = mockParticipants
  .filter((p) => p.status !== "reprovado")
  .map((p) => ({
    id: p.id,
    participantName: p.name,
    churchName: p.churchName,
    cotas: p.cotas,
    amount: p.amount,
    createdAt: p.createdAt,
    status: p.status,
  }));

export const mockImpact: ImpactStats = {
  peopleReached: 3_240,
  livesTransformed: 512,
  familiesSupported: 187,
  newPeople: 264,
  projectsCompleted: 12,
};

export function computeCampaignStats(): CampaignStats {
  const approved = mockParticipants.filter((p) => p.status === "aprovado");
  return {
    totalRaised: approved.reduce((sum, p) => sum + p.amount, 0),
    totalCotasFilled: approved.reduce((sum, p) => sum + p.cotas, 0),
    totalParticipants: new Set(approved.map((p) => p.name)).size,
    totalChurches: mockChurches.length,
    totalReceipts: mockParticipants.length,
  };
}

export function computeTopParticipants(): TopParticipant[] {
  const approved = mockParticipants.filter(
    (p) => p.status === "aprovado" && !p.hideFromRanking,
  );
  const byName = new Map<string, TopParticipant>();

  for (const p of approved) {
    const existing = byName.get(p.name);
    if (existing) {
      existing.cotas += p.cotas;
      existing.amount += p.amount;
    } else {
      byName.set(p.name, {
        name: p.name,
        churchName: p.churchName,
        cotas: p.cotas,
        amount: p.amount,
      });
    }
  }

  return Array.from(byName.values()).sort((a, b) => b.cotas - a.cotas);
}
