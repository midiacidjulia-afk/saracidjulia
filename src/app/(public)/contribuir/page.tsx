import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Wizard } from "@/components/public/contribuir/Wizard";
import { getChurches, getSettings } from "@/lib/data/queries";

export const metadata = {
  title: "Quero contribuir | Juntos pela Obra",
};

export default async function ContribuirPage() {
  const [churches, settings] = await Promise.all([getChurches(), getSettings()]);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Quero fazer parte"
          title="Sua cota, nossa meta"
          description="Leva menos de dois minutos. Preencha os dados abaixo para registrar sua participação na campanha."
          className="mx-auto mb-12"
        />
        <Wizard churches={churches} settings={settings} />
      </Container>
    </section>
  );
}
