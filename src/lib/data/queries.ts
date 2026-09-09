import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  computeCampaignStats,
  computeTopParticipants,
  mockChurches,
  mockContributions,
  mockImpact,
  mockParticipants,
  mockSettings,
} from "@/lib/mock-data";
import type {
  CampaignStats,
  Church,
  Contribution,
  ImpactStats,
  Participant,
  Settings,
  TopParticipant,
} from "@/lib/types";

/**
 * Camada de acesso a dados. Sempre que o Supabase estiver configurado
 * (`NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`), busca os
 * dados reais; caso contrário, usa os dados de demonstração em
 * `src/lib/mock-data.ts`, para que o site funcione localmente sem um
 * projeto Supabase já provisionado.
 */

export async function getSettings(): Promise<Settings> {
  if (!isSupabaseConfigured) return mockSettings;

  const supabase = await createClient();
  const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
  if (!data) return mockSettings;

  return {
    goalAmount: Number(data.goal_amount),
    cotaValue: Number(data.cota_value),
    totalCotas: data.total_cotas,
    whatsappNumber: data.whatsapp_number,
    whatsappContactName: data.whatsapp_contact_name,
  };
}

export async function getImpactStats(): Promise<ImpactStats> {
  if (!isSupabaseConfigured) return mockImpact;

  const supabase = await createClient();
  const { data } = await supabase.from("impact_stats").select("*").eq("id", 1).single();
  if (!data) return mockImpact;

  return {
    peopleReached: data.people_reached,
    livesTransformed: data.lives_transformed,
    familiesSupported: data.families_supported,
    newPeople: data.new_people,
    projectsCompleted: data.projects_completed,
  };
}

export async function getChurches(): Promise<Church[]> {
  if (!isSupabaseConfigured) return mockChurches;

  const supabase = await createClient();
  const { data: churches } = await supabase.from("churches").select("id, name, city");
  if (!churches) return [];

  const { data: contributions } = await supabase
    .from("contributions")
    .select("church_id, cotas, amount, participant_id")
    .eq("status", "aprovado");

  return churches
    .map((church) => {
      const rows = (contributions ?? []).filter((c) => c.church_id === church.id);
      return {
        id: church.id,
        name: church.name,
        city: church.city,
        cotas: rows.reduce((sum, r) => sum + r.cotas, 0),
        amount: rows.reduce((sum, r) => sum + Number(r.amount), 0),
        participants: new Set(rows.map((r) => r.participant_id)).size,
      };
    })
    .sort((a, b) => b.cotas - a.cotas);
}

export async function getContributions(limit?: number): Promise<Contribution[]> {
  if (!isSupabaseConfigured) {
    return limit ? mockContributions.slice(0, limit) : mockContributions;
  }

  const supabase = await createClient();
  let query = supabase
    .from("contributions")
    .select(
      "id, cotas, amount, created_at, status, participants(name), churches(name)",
    )
    .eq("status", "aprovado")
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data } = await query;
  if (!data) return [];

  return data.map((row) => {
    const participant = Array.isArray(row.participants) ? row.participants[0] : row.participants;
    const church = Array.isArray(row.churches) ? row.churches[0] : row.churches;
    return {
      id: row.id,
      participantName: participant?.name ?? "Participante",
      churchName: church?.name ?? "—",
      cotas: row.cotas,
      amount: Number(row.amount),
      createdAt: row.created_at,
      status: row.status,
    };
  });
}

export async function getCampaignStats(): Promise<CampaignStats> {
  if (!isSupabaseConfigured) return computeCampaignStats();

  const supabase = await createClient();
  const [{ data: contributions }, { count: churchCount }, { count: receiptCount }] =
    await Promise.all([
      supabase
        .from("contributions")
        .select("amount, cotas, participant_id, status")
        .eq("status", "aprovado"),
      supabase.from("churches").select("id", { count: "exact", head: true }),
      supabase.from("receipts").select("id", { count: "exact", head: true }),
    ]);

  const rows = contributions ?? [];
  return {
    totalRaised: rows.reduce((sum, r) => sum + Number(r.amount), 0),
    totalCotasFilled: rows.reduce((sum, r) => sum + r.cotas, 0),
    totalParticipants: new Set(rows.map((r) => r.participant_id)).size,
    totalChurches: churchCount ?? 0,
    totalReceipts: receiptCount ?? 0,
  };
}

export async function getTopParticipants(): Promise<TopParticipant[]> {
  if (!isSupabaseConfigured) return computeTopParticipants();

  const supabase = await createClient();
  const { data } = await supabase
    .from("contributions")
    .select("cotas, amount, participants(name), churches(name)")
    .eq("status", "aprovado");

  if (!data) return [];

  const byName = new Map<string, TopParticipant>();
  for (const row of data) {
    const participant = Array.isArray(row.participants) ? row.participants[0] : row.participants;
    const church = Array.isArray(row.churches) ? row.churches[0] : row.churches;
    const name = participant?.name ?? "Participante";
    const existing = byName.get(name);
    if (existing) {
      existing.cotas += row.cotas;
      existing.amount += Number(row.amount);
    } else {
      byName.set(name, {
        name,
        churchName: church?.name ?? "—",
        cotas: row.cotas,
        amount: Number(row.amount),
      });
    }
  }

  return Array.from(byName.values()).sort((a, b) => b.cotas - a.cotas);
}

export async function getParticipants(): Promise<Participant[]> {
  if (!isSupabaseConfigured) return mockParticipants;

  const supabase = await createClient();
  const { data } = await supabase
    .from("participants")
    .select(
      "id, name, whatsapp, city, created_at, church_id, churches(name), contributions(id, cotas, amount, contribution_date, status)",
    )
    .order("created_at", { ascending: false });

  if (!data) return [];

  return data.flatMap((row) => {
    const church = Array.isArray(row.churches) ? row.churches[0] : row.churches;
    const contributions = row.contributions ?? [];
    if (contributions.length === 0) return [];

    return contributions.map((contribution) => ({
      id: contribution.id,
      name: row.name,
      whatsapp: row.whatsapp,
      city: row.city,
      churchId: row.church_id,
      churchName: church?.name ?? "—",
      cotas: contribution.cotas,
      amount: Number(contribution.amount),
      date: contribution.contribution_date,
      status: contribution.status,
      createdAt: row.created_at,
    }));
  });
}
