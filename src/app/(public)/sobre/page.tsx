import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { PhotoGallery } from "@/components/public/PhotoGallery";

export const metadata = {
  title: "Nossa história | Juntos pela Obra",
};

export default function SobrePage() {
  return (
    <>
      <section className="border-b border-border bg-radial-glow py-16 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Nossa história"
            title="Estamos transformando vidas. E você pode fazer parte disso."
            description="Cada culto, cada oração, cada abraço na porta da igreja é parte de uma história que já mudou milhares de vidas — e que continua sendo escrita a cada domingo."
            className="mx-auto"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <PhotoGallery />

          <div className="mx-auto max-w-2xl text-center text-foreground-muted leading-relaxed">
            <p>
              Por trás de cada cadeira ocupada, cada mão levantada em oração e
              cada testemunho de recomeço, existe uma família que decidiu
              caminhar junto com a Sara Nossa Terra — Júlia-SP. É gente comum
              encontrando propósito, cura e comunidade. É isso que nos move.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-6 text-foreground-muted leading-relaxed">
            <h2 className="font-serif text-2xl text-foreground">Um templo renovado, mais vidas alcançadas</h2>
            <p>
              A igreja <strong className="text-foreground">Sara Nossa Terra — Júlia-SP</strong>{" "}
              iniciou a campanha <strong className="text-foreground">Juntos pela Obra</strong>{" "}
              com um propósito claro: reformar o templo para preparar um espaço
              ainda melhor para acolher, cuidar e transformar vidas.
            </p>
            <p>
              Ao longo dos anos, este templo tem sido lugar de encontro, cura e
              recomeço para milhares de pessoas. Hoje, sentimos que é hora de
              renovar essa casa — não apenas em sua estrutura física, mas como
              um passo de fé para tudo o que ainda está por vir.
            </p>
            <p>
              A meta é arrecadar <strong className="text-foreground">R$ 100.000,00</strong>,
              divididos em <strong className="text-foreground">1.000 cotas de R$ 100,00</strong>.
              Cada cota é um convite à participação coletiva — não uma doação
              distante, mas um gesto de pertencimento a algo maior que estamos
              construindo juntos.
            </p>
            <p>
              Acreditamos, como está escrito em Lucas 6:38, que{" "}
              <em>&ldquo;dai, e ser-vos-á dado&rdquo;</em>. Cada contribuição
              feita com generosidade se torna semente para uma colheita de
              vidas alcançadas e transformadas.
            </p>
          </div>

          <Card className="h-fit">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Fale com a coordenação da obra
            </p>
            <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
              Dúvidas sobre a campanha ou sobre como enviar seu comprovante?
              Fale diretamente com Nivaldo, responsável pela obra.
            </p>
            <LinkButton href="/contribuir" className="mt-5 w-full">
              Quero fazer parte
            </LinkButton>
          </Card>
        </Container>
      </section>
    </>
  );
}
