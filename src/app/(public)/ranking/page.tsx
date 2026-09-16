import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RankingTabs } from "@/components/public/RankingTabs";
import { getChurches, getTopParticipants } from "@/lib/data/queries";

export const metadata = {
  title: "Ranking | Juntos pela Obra",
};

export default async function RankingPage() {
  const [churches, participants] = await Promise.all([
    getChurches(),
    getTopParticipants(),
  ]);

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Ranking"
          title="Quem está fazendo parte dessa história"
          description="Um reconhecimento à mobilização das igrejas e participantes que estão caminhando juntos rumo à nossa meta."
        />
        <RankingTabs churches={churches} participants={participants} />
      </Container>
    </section>
  );
}
