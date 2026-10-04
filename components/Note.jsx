import { content } from "@/content";

// The part after the hero: a short, plain, human note. Static markup, no JavaScript needed.
export default function Note() {
  const { kicker, title, paragraphs, signoff } = content.note;

  return (
    <section className="relative bg-paper px-6 pb-16 pt-28 sm:pt-36">
      <div className="mx-auto max-w-2xl">
        <p className="hand -rotate-2 text-2xl text-ember">{kicker}</p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">{title}</h2>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/80">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <p className="hand mt-12 text-3xl text-ink">— {content.name}</p>
        <p className="hand mt-1 text-lg text-ink/60">{signoff}</p>
      </div>

      <footer className="mx-auto mt-24 max-w-2xl border-t border-ink/10 pt-6 text-sm text-ink/55">
        Built with Next.js, Tailwind CSS and GSAP ScrollTrigger. The car is hand-drawn SVG.
      </footer>
    </section>
  );
}
