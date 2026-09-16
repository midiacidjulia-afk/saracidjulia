import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContributionsList } from "@/components/public/ContributionsList";
import { getContributions } from "@/lib/data/queries";

export const metadata = {
  title: "Contribuições | Juntos pela Obra",
};

export default async function ContribuicoesPage() {
  const contributions = await getContributions();

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Comunidade"
          title="Todas as contribuições"
          description="Cada nome aqui representa alguém que decidiu fazer parte dessa obra. Obrigado por caminhar com a gente."
        />
        <ContributionsList contributions={contributions} />
      </Container>
    </section>
  );
}
