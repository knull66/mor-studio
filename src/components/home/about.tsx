"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/lib/i18n/language-provider";
import type { TeamMember } from "@/lib/types";

function copyFor(member: TeamMember, locale: string) {
  const en = locale === "en";
  return {
    name: member.name,
    role: en ? member.role_en || member.role : member.role,
    bio: en ? member.bio_en || member.bio : member.bio,
    bio2: en ? member.bio_2_en || member.bio_2 : member.bio_2,
  };
}

function FeaturedMember({
  member,
  cta,
  eyebrow,
}: {
  member: TeamMember;
  cta: string;
  eyebrow?: string;
}) {
  const { locale } = useI18n();
  const copy = copyFor(member, locale);
  const photos = [member.image_url, member.image_url_2].filter(Boolean);

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal>
        {photos.length === 0 ? (
          <div className="aspect-[4/5] bg-cream" />
        ) : photos.length === 1 ? (
          <div className="relative aspect-[3/4] overflow-hidden bg-cream">
            <Image
              src={photos[0]}
              alt={copy.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-cream">
              <Image
                src={photos[0]}
                alt={copy.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top"
              />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden bg-cream">
              <Image
                src={photos[1]}
                alt={copy.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        )}
      </Reveal>
      <Reveal delay={0.1}>
        {eyebrow ? (
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-taupe-dark">{eyebrow}</p>
        ) : null}
        <h2 className={`font-serif text-4xl font-medium sm:text-5xl ${eyebrow ? "mt-4" : ""}`}>
          {copy.name}
        </h2>
        {copy.role ? (
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-muted">{copy.role}</p>
        ) : null}
        {copy.bio ? (
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{copy.bio}</p>
        ) : null}
        {copy.bio2 ? (
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{copy.bio2}</p>
        ) : null}
        <a href="#reservar" className="outlined-btn mt-8 border-ink text-ink">
          {cta}
        </a>
      </Reveal>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const { locale } = useI18n();
  const copy = copyFor(member, locale);
  const photo = member.image_url || member.image_url_2;

  return (
    <article>
      {photo ? (
        <div className="relative aspect-[3/4] overflow-hidden bg-cream">
          <Image
            src={photo}
            alt={copy.name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover object-top"
          />
        </div>
      ) : null}
      <h3 className="mt-5 font-serif text-3xl">{copy.name}</h3>
      {copy.role ? (
        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted">{copy.role}</p>
      ) : null}
      {copy.bio ? <p className="mt-3 text-sm leading-relaxed text-muted">{copy.bio}</p> : null}
    </article>
  );
}

export function About({ members }: { members: TeamMember[] }) {
  const { t } = useI18n();
  if (!members.length) return null;

  const featured = members.find((item) => item.is_founder) ?? members[0];
  const others = members.filter((item) => item.id !== featured.id);
  const cta = others.length ? t.about.ctaTeam : t.about.cta;

  return (
    <section id="nosotras" className="bg-sand px-6 py-20 sm:py-28">
      {others.length ? (
        <Reveal>
          <p className="text-center text-[0.68rem] uppercase tracking-[0.28em] text-taupe-dark">
            {t.about.teamEyebrow}
          </p>
          <h2 className="mt-4 mb-14 text-center font-serif text-4xl font-medium sm:text-5xl">
            {t.about.teamTitle}
          </h2>
        </Reveal>
      ) : null}

      <FeaturedMember
        member={featured}
        cta={cta}
        eyebrow={others.length ? undefined : t.about.eyebrow}
      />

      {others.length ? (
        <div className="mx-auto mt-20 grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.08}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      ) : null}
    </section>
  );
}
