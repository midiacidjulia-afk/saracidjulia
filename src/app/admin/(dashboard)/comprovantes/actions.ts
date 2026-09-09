"use server";

import { revalidatePath } from "next/cache";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { ReceiptStatus } from "@/lib/types";

export type ReviewResult = { error?: string };

export async function reviewContribution(
  contributionId: string,
  status: Extract<ReceiptStatus, "aprovado" | "reprovado">,
): Promise<ReviewResult> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase não está configurado neste ambiente." };
  }

  const supabase = await createClient();

  const { error: contributionError } = await supabase
    .from("contributions")
    .update({ status })
    .eq("id", contributionId);

  if (contributionError) {
    return { error: "Não foi possível atualizar a contribuição." };
  }

  await supabase.from("receipts").update({ status }).eq("contribution_id", contributionId);

  revalidatePath("/admin/comprovantes");
  revalidatePath("/admin/participantes");
  revalidatePath("/admin");
  return {};
}
