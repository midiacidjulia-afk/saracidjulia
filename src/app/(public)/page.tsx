import Link from "next/link";
import { Users } from "lucide-react";
import { Hero } from "@/components/public/Hero";
import { GoalCard } from "@/components/public/GoalCard";
import { ImpactBlock } from "@/components/public/ImpactBlock";
import { CotasCross } from "@/components/public/CotasCross";
import { ContributionsList } from "@/components/public/ContributionsList";
import { VideoMessage } from "@/components/public/VideoMessage";
import { QrCode } from "@/components/public/QrCode";
import { StatCard } from "@/components/ui/StatCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { formatNumber } from "@/lib/utils";
import {
  getCampaignStats,
  getContributions,
  getSettings,
} from "@/lib/data/queries";

export default async function DashboardPage() {
  const [settings, stats, contributions] = await Promise.all([
    getSettings(),
    getCampaignStats(),
    getContributions(6),
  ]);

  return (
    <>
      <VideoMessage />

      <Hero />

      <Container className="-mt-10 sm:-mt-14">
        <GoalCard
          totalRaised={stats.totalRaised}
          goalAmount={settings.goalAmount}
          cotasFilled={stats.totalCotasFilled}
          totalCotas={settings.totalCotas}
          cotaValue={settings.cotaValue}
        />

        <div className="mt-6 max-w-sm">
          <StatCard icon={Users} value={formatNumber(stats.totalParticipants)} label="Pessoas que já contribuíram" />
        </div>
      </Container>

      <ImpactBlock />

      <section className="border-t border-border py-20 sm:py-28">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Nossas cotas"
              title="Faça parte da construção desse novo TEMPLO"
              description={`${settings.totalCotas.toLocaleString("pt-BR")} cotas de R$ ${settings.cotaValue.toFixed(0)} compõem a meta de R$ ${settings.goalAmount.toLocaleString("pt-BR")}. Veja o quanto já caminhamos juntos.`}
            />
            <LinkButton href="/cotas" variant="secondary">
              Ver todas as cotas
            </LinkButton>
          </div>
          <div className="flex justify-center">
            <CotasCross total={settings.totalCotas} filled={stats.totalCotasFilled} />
          </div>
        </Container>
      </section>

      <section className="border-t border-border pb-20 pt-20 sm:pb-28 sm:pt-28">
        <Container className="mx-auto flex max-w-2xl flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Comunidade" title="Últimas contribuições" />
            <Link href="/contribuicoes" className="text-sm text-accent hover:text-accent-light">
              Ver todas →
            </Link>
          </div>
          <ContributionsList contributions={contributions} />
        </Container>
      </section>

      <section className="border-t border-border bg-radial-glow py-20 sm:py-24">
        <Container className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <h2 className="max-w-xl font-serif text-3xl text-foreground sm:text-4xl">
              Faça parte dessa história
            </h2>
            <p className="max-w-lg text-foreground-muted">
              Sua cota é mais do que uma contribuição — é um passo em direção a
              um templo renovado e mais vidas alcançadas.
            </p>
            <LinkButton href="/contribuir" size="lg" className="mt-2">
              Quero fazer parte →
            </LinkButton>
          </div>

          <QrCode />
        </Container>
      </section>
    </>
  );
}
