import Link from "next/link";
import SpotBulleFooter from "./SpotBulleFooter";
import SpotBulleHeader from "./SpotBulleHeader";

export default function SpotBulleOffresPage({
  dict,
  locale,
}: {
  dict: any;
  locale: "fr" | "en";
}) {
  const prefix = `/${locale}`;
  const isFr = locale === "fr";

  const pageCopy = isFr
    ? {
        title: "MES ACCOMPAGNEMENTS – ESTELLE",
        subtitle:
          "ACCOMPAGNEMENTS SUR-MESURE POUR REVELER LE POTENTIEL DE CHAQUE JEUNE ET LUI DONNER LES CLES DE LA REUSSITE",
        intro:
          "Chaque jeune est unique. Mes accompagnements sont pensés pour répondre à ses besoins spécifiques, lui redonner confiance et l'aider à construire son avenir.",
        cards: [
          {
            title: "Accompagnement individuel Dar Bouazza",
            text: "Un suivi personnalisé pour progresser efficacement et reprendre confiance.",
            price: "400 DH",
            unit: "/ séance",
            bullets: [
              "Méthodologie",
              "Expression écrite et orale",
              "Préparation aux évaluations",
              "Estime de soi",
            ],
          },
          {
            title: "Accompagnement individuel Casablanca",
            text: "Un suivi personnalisé à domicile sur Casablanca.",
            price: "500 DH",
            unit: "/ séance",
            note: "Prise en compte des frais de déplacement",
          },
          {
            title: "Cours collectifs Préparation Brevet",
            text: "Un cadre stimulant pour progresser en petit groupe.",
            price: "300 DH",
            unit: "/ séance",
            note: "Maximum 5 élèves",
          },
          {
            title: "Préparation Baccalauréat",
            text: "Un accompagnement ciblé pour réussir les épreuves écrites et orales.",
            price: "400 DH",
            unit: "/ séance",
            bullets: ["Méthodologie", "Analyse de textes", "Préparation à l'oral"],
          },
          {
            title: "Orientation & Stratégie (Forfait Premium)",
            text: "Un accompagnement structuré pour mieux se connaître, choisir la bonne voie et construire un projet d'avenir.",
            price: "3 000 DH",
            unit: "/ forfait 3 séances",
            bullets: [
              "Identification des profils",
              "Réflexion sur les parcours",
              "Accompagnement Parcoursup et dossiers écoles",
            ],
          },
          {
            title: "Coaching personnalisé & besoins spécifiques",
            text: "Un accompagnement bienveillant et adapté pour aider chaque jeune à progresser durablement.",
            price: "3 000 DH",
            unit: "/ mois",
            bullets: [
              "Suivi régulier",
              "Accompagnement des devoirs",
              "Organisation",
              "Soutien méthodologique et moral",
            ],
          },
          {
            title: "Immersion & séjours à thème",
            text: "Week-ends immersifs et séjours par passion ou thématique.",
            price: "Sur devis",
            unit: "",
            note: "Selon la durée et les activités",
            bullets: [
              "Institutions européennes",
              "Assemblée nationale",
              "Conférences",
            ],
          },
        ],
        commitment:
          "Mon engagement : accompagner chaque jeune avec bienveillance, exigence et passion pour l'aider à révéler son potentiel et construire son avenir.",
        ctaTitle: "BESOIN D'UN ACCOMPAGNEMENT PERSONNALISE ?",
        ctaBody:
          "Echangeons sur les besoins de votre enfant et trouvons ensemble la formule la plus adaptée.",
        ctaButton: "PRENDRE RENDEZ-VOUS",
      }
    : {
        title: "MY PROGRAMS – ESTELLE",
        subtitle:
          "TAILORED SUPPORT TO REVEAL EACH STUDENT'S POTENTIAL AND GIVE THEM THE KEYS TO SUCCESS",
        intro:
          "Each student is unique. My support programs are designed to meet specific needs, rebuild confidence, and help shape a clear future.",
        cards: [],
        commitment:
          "My commitment: support every student with care and high standards to help them grow and succeed.",
        ctaTitle: "NEED PERSONALIZED SUPPORT?",
        ctaBody:
          "Let's discuss your child's needs and choose the most suitable formula together.",
        ctaButton: "BOOK AN APPOINTMENT",
      };

  return (
    <div className="min-h-screen bg-[#062a2c] font-sans text-[#f7f1e3]">
      <SpotBulleHeader dict={dict} locale={locale} />
      <div className="relative isolate w-full pb-16">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/backgrounds/bg2.png')] bg-cover bg-center bg-no-repeat"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-1 bg-no-repeat"
          style={{
            backgroundImage: "url('/images/backgrounds/e0haut.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            height: 437,
          }}
          aria-hidden
        />
        <main className="relative z-10 mx-auto max-w-[1232px] px-3 py-6 sm:px-5 sm:py-8 md:px-10 md:py-10 lg:px-14">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            <Link className="text-[#B6F0EA] transition hover:text-white" href={prefix}>
              {dict.nav?.home}
            </Link>
            <span className="text-white/40"> / </span>
            <span className="text-white/80">{isFr ? "Tarifs et Formules" : "Pricing & Plans"}</span>
          </p>

          <section className="mt-4 overflow-hidden rounded-2xl border border-white/12 bg-[#0a3d40]/55 text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md">
            <div className="grid gap-0 lg:grid-cols-1">
              <div className="px-6 py-7 md:px-9 md:py-9">
                <h1 className="text-[40px] font-black leading-none tracking-tight text-white md:text-[56px]">
                  {isFr ? "Mes prestations" : "My services"}
                </h1>
                <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#B6F0EA] md:text-[14px]">
                  {isFr
                    ? "Accompagnements sur-mesure pour révéler le potentiel de chaque jeune."
                    : "Tailored programs to reveal each student's potential."}
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/88 md:text-[15px]">
                  {pageCopy.intro}
                </p>
              </div>
            </div>

            {pageCopy.cards.length > 0 ? (
              <div className="flex flex-wrap justify-between gap-3 px-4 pb-4 lg:gap-y-4 lg:px-6 lg:pb-6">
                {pageCopy.cards.map((card, index) => (
                  <article
                    key={card.title}
                    className={`w-full rounded-xl border border-white/12 bg-[#0f4b4f]/55 px-4 py-5 text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm md:w-[48.7%] ${
                      index < 4 ? "lg:w-[24%]" : "lg:w-[32%]"
                    }`}
                  >
                    <h2 className="text-[22px] font-bold leading-tight text-[#B6F0EA]">{card.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/88">{card.text}</p>
                    {card.bullets?.length ? (
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-white/85 marker:text-[#B6F0EA]">
                        {card.bullets.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : null}
                    <p className="mt-4 text-[30px] font-semibold leading-none text-[#d5b162]">{card.price}</p>
                    {card.unit ? (
                      <p className="mt-1 text-sm font-semibold text-white/80">{card.unit}</p>
                    ) : null}
                    {card.note ? <p className="mt-2 text-xs text-white/70">{card.note}</p> : null}
                  </article>
                ))}
              </div>
            ) : null}

            <div className="border-t border-white/12 bg-[#0b4448]/55 px-6 py-4 text-white/90 backdrop-blur-sm">
              <p className="text-sm italic leading-relaxed text-white/88">{pageCopy.commitment}</p>
            </div>

            <div className="bg-[#0e5f65] px-6 py-5 text-white md:flex md:items-center md:justify-between md:gap-6">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-widest text-white/85">
                  {pageCopy.ctaTitle}
                </p>
                <p className="mt-1 text-sm text-white/85">{pageCopy.ctaBody}</p>
              </div>
              <Link
                href={`${prefix}/contact`}
                className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full bg-[#d5b162] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#e1c47e] md:mt-0"
              >
                {pageCopy.ctaButton}
              </Link>
            </div>
          </section>
        </main>
      </div>

      <SpotBulleFooter dict={dict} locale={locale} />
    </div>
  );
}
