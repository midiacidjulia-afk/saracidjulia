"use server";

import { revalidatePath } from "next/cache";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type SettingsActionResult = { error?: string; success?: boolean };

export async function updateSettings(formData: FormData): Promise<SettingsActionResult> {
  if (!isSupabaseConfigured) {
    return { error: "Supabase não está configurado neste ambiente." };
  }

  const goalAmount = Number(formData.get("goalAmount"));
  const cotaValue = Number(formData.get("cotaValue"));
  const totalCotas = Number(formData.get("totalCotas"));
  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").trim();
  const whatsappContactName = String(formData.get("whatsappContactName") ?? "").trim();

  if (!goalAmount || !cotaValue || !totalCotas || !whatsappNumber || !whatsappContactName) {
    return { error: "Preencha todos os campos." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("settings")
    .update({
      goal_amount: goalAmount,
      cota_value: cotaValue,
      total_cotas: totalCotas,
      whatsapp_number: whatsappNumber,
      whatsapp_contact_name: whatsappContactName,
    })
    .eq("id", 1);

  if (error) {
    return { error: "Não foi possível salvar as configurações." };
  }

  revalidatePath("/", "layout");
  return { success: true };
}
