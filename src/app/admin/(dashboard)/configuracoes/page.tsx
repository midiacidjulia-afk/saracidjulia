import { SectionHeading } from "@/components/ui/SectionHeading";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/data/queries";

export const metadata = {
  title: "Configurações | Painel administrativo",
};

export default async function ConfiguracoesPage() {
  const settings = await getSettings();

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        eyebrow="Configurações"
        title="Configurações gerais"
        description="Ajuste a meta, o valor da cota e os dados de contato usados na campanha."
      />
      <SettingsForm settings={settings} />
    </div>
  );
}
