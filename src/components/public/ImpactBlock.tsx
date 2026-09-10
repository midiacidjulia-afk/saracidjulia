import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export function ImpactBlock() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Impacto real"
          title="Construir um novo templo e preparar um novo ambiente para um novo Agir de Deus"
          description="Cada cota preenchida representa mais do que uma ajuda - é uma oferta que trará incontáveis colheitas"
        />

        <p className="max-w-3xl font-serif text-lg italic leading-relaxed text-foreground-muted">
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
