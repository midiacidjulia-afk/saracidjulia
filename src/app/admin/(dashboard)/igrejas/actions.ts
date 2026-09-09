"use server";

import { revalidatePath } from "next/cache";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type ChurchActionResult = { error?: string };

export async function createChurch(formData: FormData): Promise<ChurchActionResult> {
  const name = String(formData.get("name") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();

  if (!name || !city) {
    return { error: "Informe nome e cidade da igreja." };
  }

  if (!isSupabaseConfigured) {
    return { error: "Supabase não está configurado neste ambiente." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("churches").insert({ name, city });

  if (error) {
    return { error: "Não foi possível cadastrar a igreja." };
  }

  revalidatePath("/admin/igrejas");
  return {};
}
