import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import heroImg from "@/assets/hero-community.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resgatando Valores — Acolhimento, Educação e Cidadania" },
      {
        name: "description",
        content:
          "ONG Resgatando Valores: acolhemos crianças e adolescentes em vulnerabilidade social, oferecendo educação, cultura e proteção. Doe, seja voluntário ou estagiário.",
      },
      { property: "og:title", content: "Resgatando Valores" },
      {
        property: "og:description",
        content:
          "Resgatar o presente e transformar o futuro de crianças e adolescentes através do acolhimento e da educação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Home,
});

const galleryImages = [g1, g2, g3, g4, g5, g1, g2];

function Home() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  // Drag-to-scroll for the gallery
  const dragState = useRef({ down: false, x: 0, left: 0 });
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollerRef.current) return;
    dragState.current = {
      down: true,
      x: e.pageX,
      left: scrollerRef.current.scrollLeft,
    };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragState.current.down || !scrollerRef.current) return;
    scrollerRef.current.scrollLeft =
      dragState.current.left - (e.pageX - dragState.current.x);
  };
  const endDrag = () => (dragState.current.down = false);

  const nav = [
    { href: "#sobre", label: "Sobre Nós" },
    { href: "#projetos", label: "Projetos" },
    { href: "#ajudar", label: "Como Ajudar" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ============ HEADER ============ */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <a href="#top" className="font-display text-lg sm:text-xl font-semibold tracking-tight">
            Resgatando <span className="text-muted-foreground">Valores</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-foreground/80 hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#ajudar"
              className="hidden sm:inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-accent"
            >
              Fazer Doação
            </a>
            <button
              className="md:hidden rounded-full p-2 border border-border"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <span className="block w-5 h-0.5 bg-foreground mb-1" />
              <span className="block w-5 h-0.5 bg-foreground mb-1" />
              <span className="block w-5 h-0.5 bg-foreground" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-6 py-4 flex flex-col gap-3 text-sm">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-1"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#ajudar"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-primary-foreground"
              >
                Fazer Doação
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ============ HERO ============ */}
      <section
        id="top"
        className="relative min-h-[78vh] flex items-center justify-center overflow-hidden"
      >
        <img
          src={heroImg}
          alt="Crianças e adolescentes em atividade no espaço da ONG Resgatando Valores"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-white/85 text-sm sm:text-base tracking-[0.2em] uppercase mb-6">
            Acolhimento &amp; Impacto Social
          </p>
          <h1 className="font-display text-white text-5xl sm:text-6xl md:text-7xl font-medium leading-[1.05]">
            O Futuro Começa com Nossas Ações
          </h1>
          <div className="mt-10">
            <a
              href="#sobre"
              className="inline-flex items-center rounded-full bg-primary/90 px-7 py-3.5 text-primary-foreground text-sm font-medium hover:bg-primary hover:px-9"
            >
              Saiba Mais
            </a>
          </div>
        </div>
      </section>

      {/* ============ SOBRE ============ */}
      <section id="sobre" className="py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">
            Sobre Nós
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium leading-tight">
            Resgatamos o presente para transformar o futuro.
          </h2>
          <div className="mt-10 space-y-6 text-muted-foreground text-lg leading-relaxed text-left sm:text-center">
            <p>
              A <strong className="text-foreground">Resgatando Valores</strong> nasceu
              da iniciativa de uma moradora que não aceitou ver as crianças da comunidade
              perderem suas vidas para o tráfico. O que começou com a distribuição simples
              de água, alimento e roupas em um terreno abandonado tornou-se, através do
              esforço coletivo e de doações, uma estrutura física sólida — que chegou até
              a resgatar a família em situação de rua que habitava o local, encaminhando-os
              a um abrigo digno.
            </p>
            <p>
              Hoje, atendemos crianças menores pela manhã e adolescentes à tarde, em turno
              inverso à escola. O critério de permanência é simples e transformador:
              estar matriculado e frequentar regularmente o ensino regular. Oferecemos
              refúgio seguro, alimentação, atividades de apoio e proteção contra o
              recrutamento pelo crime organizado.
            </p>
          </div>

          {/* Missão / Visão / Valores */}
          <div className="mt-20 grid gap-10 sm:grid-cols-3 text-left">
            {[
              {
                t: "Missão",
                d: "Resgatar o presente e transformar o futuro de crianças e adolescentes em vulnerabilidade social por meio de acolhimento, educação, cultura e cidadania.",
              },
              {
                t: "Visão",
                d: "Ser referência em desenvolvimento social e comunitário, reconhecida por reescrever histórias de vida através da educação complementar.",
              },
              {
                t: "Valores",
                d: "Acolhimento humano, educação como chave, resgate de vidas e solidariedade comunitária.",
              },
            ].map((b) => (
              <div key={b.t} className="border-t border-border pt-6">
                <h3 className="text-xl font-medium mb-3">{b.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>

          {/* Fundadores */}
          <div className="mt-24 border-t border-border pt-10">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
              Fundadores e Responsáveis
            </p>
            <p className="text-muted-foreground">
              {/* TODO: adicionar nomes dos fundadores e responsáveis */}
              [Nomes a serem adicionados]
            </p>
          </div>
        </div>
      </section>

      {/* ============ GALERIA / PROJETOS ============ */}
      <section id="projetos" className="py-24 sm:py-32 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Nossos Projetos
              </p>
              <h2 className="text-4xl sm:text-5xl font-medium max-w-xl leading-tight">
                Histórias em movimento.
              </h2>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Anterior"
                className="h-11 w-11 rounded-full border border-border hover:bg-primary hover:text-primary-foreground grid place-items-center"
              >
                ←
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Próxima"
                className="h-11 w-11 rounded-full border border-border hover:bg-primary hover:text-primary-foreground grid place-items-center"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            className="gallery flex gap-6 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing select-none scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {galleryImages.map((src, i) => (
              <figure
                key={i}
                className="gallery-item relative shrink-0 w-[320px] sm:w-[420px] h-[420px] overflow-hidden rounded-md bg-muted"
              >
                <img
                  src={src}
                  alt={`Atividade ${i + 1} da ONG`}
                  loading="lazy"
                  className="h-full w-full object-cover pointer-events-none"
                />
              </figure>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Passe o cursor sobre uma imagem, use as setas ou arraste para navegar.
          </p>
        </div>
      </section>

      {/* ============ COMO AJUDAR ============ */}
      <section id="ajudar" className="py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
              Como Ajudar
            </p>
            <h2 className="text-4xl sm:text-5xl font-medium leading-tight">
              Não conseguimos fazer isso sozinhos.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg">
              Cada mão que se estende amplia o impacto. Veja abaixo as formas mais
              urgentes de apoiar o nosso trabalho.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="relative bg-card border border-border rounded-lg p-8 flex flex-col">
              <span className="inline-block text-[10px] tracking-[0.2em] uppercase bg-foreground text-background px-2.5 py-1 rounded-full self-start mb-6">
                Chamado Urgente
              </span>
              <h3 className="text-2xl font-medium mb-4">
                Assistente Social Voluntário(a)
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Precisamos urgentemente de um profissional de Serviço Social
                </strong>{" "}
                para nos ajudar no mapeamento das famílias, no fortalecimento técnico da
                operação e no processo de reconhecimento junto à Prefeitura.{" "}
                <strong className="text-foreground">
                  Sua assinatura e atuação técnica podem abrir portas para convênios
                  públicos que manterão a ONG viva.
                </strong>
              </p>
              <a
                href="#contato"
                className="mt-8 inline-flex text-sm font-medium border-b border-foreground pb-1 self-start hover:text-muted-foreground"
              >
                Quero contribuir →
              </a>
            </article>

            <article className="bg-card border border-border rounded-lg p-8 flex flex-col">
              <span className="inline-block text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground px-2.5 py-1 rounded-full self-start mb-6">
                Voluntariado
              </span>
              <h3 className="text-2xl font-medium mb-4">
                Estagiários e Voluntários
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">
                  Falta mão de obra para as atividades diárias.
                </strong>{" "}
                Se você estuda pedagogia, psicologia, educação física — ou simplesmente
                quer doar seu tempo para recreação e oficinas — junte-se a nós.
              </p>
              <a
                href="#contato"
                className="mt-8 inline-flex text-sm font-medium border-b border-foreground pb-1 self-start hover:text-muted-foreground"
              >
                Quero ser voluntário →
              </a>
            </article>

            <article className="bg-card border border-border rounded-lg p-8 flex flex-col">
              <span className="inline-block text-[10px] tracking-[0.2em] uppercase bg-accent text-accent-foreground px-2.5 py-1 rounded-full self-start mb-6">
                Doações
              </span>
              <h3 className="text-2xl font-medium mb-4">Doações de Recursos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Aceitamos alimentos, roupas em bom estado, produtos de higiene,
                materiais pedagógicos e{" "}
                <strong className="text-foreground">apoio financeiro via PIX</strong>{" "}
                para manutenção do espaço físico.
              </p>
              <div className="mt-8 p-4 rounded-md bg-muted text-sm">
                <p className="text-muted-foreground">PIX</p>
                {/* TODO: adicionar chave PIX */}
                <p className="font-medium">[chave-pix@resgatandovalores.org]</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ CONTATO / FOOTER ============ */}
      <footer id="contato" className="bg-foreground text-background pt-24 pb-10 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 mb-16">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-background/60 mb-4">
                Contato
              </p>
              <h2 className="font-display text-4xl sm:text-5xl leading-tight">
                Vamos construir juntos.
              </h2>
              <p className="mt-6 text-background/70 max-w-md">
                Escreva, ligue ou visite. Toda ajuda começa com uma conversa.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 text-sm">
              <div>
                <p className="text-background/60 mb-1">E-mail</p>
                {/* TODO: adicionar e-mail */}
                <p>[contato@resgatandovalores.org]</p>
              </div>
              <div>
                <p className="text-background/60 mb-1">Telefone / WhatsApp</p>
                {/* TODO: adicionar telefone */}
                <p>[(00) 00000-0000]</p>
              </div>
              <div>
                <p className="text-background/60 mb-1">Endereço</p>
                {/* TODO: adicionar endereço físico */}
                <p>[Rua, número — Bairro, Cidade — UF]</p>
              </div>
              <div>
                <p className="text-background/60 mb-1">Redes Sociais</p>
                <div className="flex gap-4">
                  {/* TODO: adicionar URLs das redes sociais */}
                  <a href="#" className="hover:text-primary">Instagram</a>
                  <a href="#" className="hover:text-primary">Facebook</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-background/15 pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-background/50">
            <p>© {new Date().getFullYear()} Resgatando Valores. Todos os direitos reservados.</p>
            <p>Feito com propósito e comunidade.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
