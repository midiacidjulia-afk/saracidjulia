"use server";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type SubmitContributionResult = {
  success: boolean;
  error?: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function submitContribution(
  formData: FormData,
): Promise<SubmitContributionResult> {
  const name = String(formData.get("name") ?? "").trim();
  const whatsapp = String(formData.get("whatsapp") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const churchName = String(formData.get("churchName") ?? "").trim();
  const cotas = Number(formData.get("cotas") ?? 0);
  const amount = Number(formData.get("amount") ?? 0);
  const contributionDate = String(formData.get("contributionDate") ?? "");
  const hideFromRanking = formData.get("hideFromRanking") === "true";
  const receipt = formData.get("receipt");

  if (!name || !whatsapp || !city || !churchName) {
    return { success: false, error: "Preencha todos os dados obrigatórios." };
  }
  if (!cotas || cotas < 1) {
    return { success: false, error: "Selecione ao menos uma cota." };
  }
  if (!contributionDate) {
    return { success: false, error: "Informe a data da oferta." };
  }

  const file = receipt instanceof File && receipt.size > 0 ? receipt : null;
  if (file && file.size > MAX_FILE_SIZE) {
    return { success: false, error: "O comprovante deve ter até 10MB." };
  }

  if (!isSupabaseConfigured) {
    // Modo de demonstração: sem Supabase configurado, apenas simula sucesso
    // para que a jornada completa (incluindo tela de agradecimento) possa
    // ser validada localmente.
    return { success: true };
  }

  const supabase = await createClient();

  let churchId: string;
  const { data: existingChurch } = await supabase
    .from("churches")
    .select("id")
    .ilike("name", churchName)
    .maybeSingle();

  if (existingChurch) {
    churchId = existingChurch.id;
  } else {
    const { data: newChurch, error: churchError } = await supabase
      .from("churches")
      .insert({ name: churchName, city })
      .select("id")
      .single();
    if (churchError || !newChurch) {
      return { success: false, error: "Não foi possível registrar a igreja." };
    }
    churchId = newChurch.id;
  }

  const { data: participant, error: participantError } = await supabase
    .from("participants")
    .insert({ name, whatsapp, city, church_id: churchId, hide_from_ranking: hideFromRanking })
    .select("id")
    .single();

  if (participantError || !participant) {
    return { success: false, error: "Não foi possível registrar seus dados." };
  }

  const { data: contribution, error: contributionError } = await supabase
    .from("contributions")
    .insert({
      participant_id: participant.id,
      church_id: churchId,
      cotas,
      amount,
      contribution_date: contributionDate,
      status: "pendente",
    })
    .select("id")
    .single();

  if (contributionError || !contribution) {
    return { success: false, error: "Não foi possível registrar sua participação." };
  }

  if (file) {
    const extension = file.name.split(".").pop() ?? "bin";
    const path = `${contribution.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from("comprovantes")
      .upload(path, file, { contentType: file.type });

    if (!uploadError) {
      await supabase.from("receipts").insert({
        contribution_id: contribution.id,
        file_url: path,
        status: "pendente",
      });
    }
  }

  return { success: true };
}
