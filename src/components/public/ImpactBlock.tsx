import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function ImpactBlock() {
  return (
    <section className="relative border-t border-border py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(201,162,74,0.06),transparent_50%)]" />
      <Container className="relative flex flex-col gap-10">
        <SectionHeading
          eyebrow="Impacto real"
          title="Construir um novo templo e preparar um novo ambiente para um novo Agir de Deus"
          description="Cada cota preenchida representa mais do que uma ajuda - é uma oferta que trará incontáveis colheitas"
        />

        <p className="max-w-3xl border-l-2 border-gold/30 pl-6 font-serif text-lg italic leading-relaxed text-foreground-muted">
          Cremos que Deus tem grandes coisas para fazer no Bairro Cidade
          Júlia, não foi a toa que Deus proporcionou essa mudança. Cremos que
          esse novo salão é resposta de Deus para esse bairro, cremos em
          centenas de famílias e milhares de vidas sendo restauradas nesse
          lugar.
        </p>
      </Container>
    </section>
  );
}
