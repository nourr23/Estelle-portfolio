"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Locale = "fr" | "en";

type Role = "imagine" | "organise" | "aide" | "mene";
type Learning = "voir" | "ecouter" | "faire";
type ElementKey = "feu" | "air" | "eau" | "terre";

type Answers = {
  role?: Role;
  learning?: Learning;
  passion?: string;
  inspiration?: string;
  birthdate?: string | null;
};

type Message =
  | { id: string; from: "bot"; text: string }
  | { id: string; from: "user"; text: string };

const ELEMENT_LABELS: Record<Locale, Record<ElementKey, string>> = {
  fr: { feu: "Feu", air: "Air", eau: "Eau", terre: "Terre" },
  en: { feu: "Fire", air: "Air", eau: "Water", terre: "Earth" },
};

const ELEMENT_EMOJI: Record<ElementKey, string> = {
  feu: "🔥",
  air: "🌬️",
  eau: "💧",
  terre: "🌱",
};

function safeTrim(value: string | undefined | null) {
  return (value ?? "").trim();
}

function elementFromRole(role: Role): ElementKey {
  // Match the brief’s 4 roles to a simple 4-elements reading.
  // Imagine -> Air, Organise -> Terre, Aide -> Eau, Mène -> Feu
  switch (role) {
    case "imagine":
      return "air";
    case "organise":
      return "terre";
    case "aide":
      return "eau";
    case "mene":
      return "feu";
  }
}

function elementFromLearning(learning: Learning): ElementKey {
  // Lightweight secondary axis based on learning preference.
  switch (learning) {
    case "voir":
      return "air";
    case "ecouter":
      return "eau";
    case "faire":
      return "feu";
  }
}

function pickSecondary(primary: ElementKey, learning: Learning): ElementKey {
  const proposed = elementFromLearning(learning);
  if (proposed !== primary) return proposed;
  // Neutral fallback if duplicated.
  return "terre";
}

function qualitiesFor(element: ElementKey, locale: Locale): [string, string] {
  const fr: Record<ElementKey, [string, string]> = {
    feu: ["leadership", "détermination"],
    air: ["créativité", "vision"],
    eau: ["empathie", "intuition"],
    terre: ["organisation", "persévérance"],
  };
  const en: Record<ElementKey, [string, string]> = {
    feu: ["leadership", "drive"],
    air: ["creativity", "vision"],
    eau: ["empathy", "intuition"],
    terre: ["organization", "perseverance"],
  };
  return locale === "fr" ? fr[element] : en[element];
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export default function SpotBulleAgentChat({
  locale,
  bookingHref,
}: {
  locale: Locale;
  bookingHref: string;
}) {
  const t = useMemo(() => {
    const fr = {
      title: "SpotBulle • Diagnostic en 30 secondes",
      hook:
        "Salut ! Moi, c’est SpotBulle, l’IA d’Estelle. En 30 secondes, je vais t’aider à découvrir tes forces cachées pour booster ta réussite. On commence ?",
      start: "Oui, on commence",
      q1: "Si tu devais mener un projet, tu serais plutôt :",
      q1a: "J’imagine (créatif)",
      q1b: "J’organise (méthodique)",
      q1c: "J’aide (empathique)",
      q1d: "Je mène (leader)",
      q2: "Pour bien comprendre, tu préfères :",
      q2a: "Voir (schémas, couleurs)",
      q2b: "Écouter (explications)",
      q2c: "Faire (pratiquer)",
      q3: "Quelle est ta passion, ton sport ou un talent dont tu es fier ?",
      q3ph: "Ex: musique, jeu vidéo, dessin, sport…",
      q4: "Y a-t-il une personne célèbre ou un mentor qui t’inspire vraiment ?",
      q4ph: "Ex: un sportif, un entrepreneur, un proche…",
      q5: "Optionnel : quelle est ta date de naissance ?",
      q5ph: "JJ/MM/AAAA ou AAAA-MM-JJ",
      skip: "Je préfère passer",
      send: "Envoyer",
      restart: "Recommencer",
      cta: "RÉSERVER MON RDV DE 1H30 AVEC ESTELLE",
    };
    const en = {
      title: "SpotBulle • 30-second diagnosis",
      hook:
        "Hi! I’m SpotBulle, Estelle’s AI. In 30 seconds, I’ll help you spot hidden strengths to boost your success. Ready?",
      start: "Yes, let’s start",
      q1: "If you had to lead a project, you would be:",
      q1a: "I imagine (creative)",
      q1b: "I organize (methodical)",
      q1c: "I help (empathetic)",
      q1d: "I lead (leader)",
      q2: "To understand well, you prefer:",
      q2a: "Seeing (diagrams, colors)",
      q2b: "Listening (explanations)",
      q2c: "Doing (hands-on)",
      q3: "What’s your passion, sport, or a talent you’re proud of?",
      q3ph: "Ex: music, gaming, drawing, sports…",
      q4: "Is there a person (mentor or famous figure) who truly inspires you?",
      q4ph: "Ex: athlete, entrepreneur, someone close…",
      q5: "Optional: what’s your birth date?",
      q5ph: "YYYY-MM-DD",
      skip: "Skip",
      send: "Send",
      restart: "Restart",
      cta: "BOOK MY 1H30 SESSION WITH ESTELLE",
    };
    return locale === "fr" ? fr : en;
  }, [locale]);

  const [phase, setPhase] = useState<
    | "hook"
    | "q1"
    | "q2"
    | "q3"
    | "q4"
    | "q5"
    | "result"
  >("hook");
  const [answers, setAnswers] = useState<Answers>({});
  const [draft, setDraft] = useState("");

  const [messages, setMessages] = useState<Message[]>(() => [
    { id: uid("b"), from: "bot", text: t.hook },
  ]);

  const commitUser = (text: string) => {
    setMessages((prev) => [...prev, { id: uid("u"), from: "user", text }]);
  };

  const commitBot = (text: string) => {
    setMessages((prev) => [...prev, { id: uid("b"), from: "bot", text }]);
  };

  const goQ1 = () => {
    setPhase("q1");
    commitUser(t.start);
    commitBot(t.q1);
  };

  const chooseRole = (role: Role, label: string) => {
    setAnswers((prev) => ({ ...prev, role }));
    setPhase("q2");
    commitUser(label);
    commitBot(t.q2);
  };

  const chooseLearning = (learning: Learning, label: string) => {
    setAnswers((prev) => ({ ...prev, learning }));
    setPhase("q3");
    commitUser(label);
    commitBot(t.q3);
  };

  const submitText = (field: "passion" | "inspiration") => {
    const value = safeTrim(draft);
    if (!value) return;

    setDraft("");
    setAnswers((prev) => ({ ...prev, [field]: value }));
    commitUser(value);

    if (field === "passion") {
      setPhase("q4");
      commitBot(t.q4);
    } else {
      setPhase("q5");
      commitBot(t.q5);
    }
  };

  const skipBirthdate = () => {
    setAnswers((prev) => ({ ...prev, birthdate: null }));
    commitUser(t.skip);
    setPhase("result");
  };

  const submitBirthdate = () => {
    const value = safeTrim(draft);
    if (!value) return;
    setDraft("");
    setAnswers((prev) => ({ ...prev, birthdate: value }));
    commitUser(value);
    setPhase("result");
  };

  const result = useMemo(() => {
    if (!answers.role || !answers.learning) return null;
    const primary = elementFromRole(answers.role);
    const secondary = pickSecondary(primary, answers.learning);
    const [q1, q2] = qualitiesFor(primary, locale);
    return { primary, secondary, qualities: [q1, q2] as const };
  }, [answers.learning, answers.role, locale]);

  const conclusionText = useMemo(() => {
    if (!result) return null;
    const passion = safeTrim(answers.passion) || (locale === "fr" ? "ta passion" : "your passion");
    const inspiration =
      safeTrim(answers.inspiration) ||
      (locale === "fr" ? "ton inspiration" : "your inspiration");

    const labelPrimary = ELEMENT_LABELS[locale][result.primary];
    const labelSecondary = ELEMENT_LABELS[locale][result.secondary];
    const e1 = `${ELEMENT_EMOJI[result.primary]} ${labelPrimary}`;
    const e2 = `${ELEMENT_EMOJI[result.secondary]} ${labelSecondary}`;

    if (locale === "fr") {
      return `Génial ! 🎯 Avec ta passion pour "${passion}" et ton envie de ressembler à "${inspiration}", je vois que tu as une énergie de type ${e1} / ${e2}. Tu as un vrai potentiel de ${result.qualities[0]} (et ${result.qualities[1]}) !

Estelle a déjà analysé ton profil. Elle t’attend pour une session de 1h30 afin de transformer tes talents en une réussite concrète (Bac, Brevet ou Orientation). On réserve ton créneau ?`;
    }

    return `Great! 🎯 With your passion for "${passion}" and your desire to be like "${inspiration}", I see an energy of type ${e1} / ${e2}. You have strong potential for ${result.qualities[0]} (and ${result.qualities[1]})!

Estelle is ready for a 1h30 session to turn your talents into concrete results (exams or guidance). Shall we book your slot?`;
  }, [answers.inspiration, answers.passion, locale, result]);

  // When entering result phase for the first time, append the conclusion.
  const [resultAnnounced, setResultAnnounced] = useState(false);
  if (phase === "result" && !resultAnnounced && conclusionText) {
    setResultAnnounced(true);
    commitBot(conclusionText);
  }

  const reset = () => {
    setPhase("hook");
    setAnswers({});
    setDraft("");
    setResultAnnounced(false);
    setMessages([{ id: uid("b"), from: "bot", text: t.hook }]);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0e0f10] shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#f7f1e3]">{t.title}</p>
          <p className="mt-1 text-xs text-[#f7f1e3]/65">
            {locale === "fr"
              ? "Sans compte, sans sauvegarde — juste un diagnostic rapide."
              : "No account, no save — just a quick diagnosis."}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-white/5 px-3 py-2 text-xs font-semibold text-[#f7f1e3] ring-1 ring-inset ring-white/10 transition hover:bg-white/10"
        >
          {t.restart}
        </button>
      </div>

      <div className="max-h-[420px] overflow-auto px-5 py-4">
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[92%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
                  m.from === "bot"
                    ? "bg-white/5 text-[#f7f1e3] ring-1 ring-inset ring-white/10"
                    : "bg-[#43c6c8]/15 text-[#d8fbfb] ring-1 ring-inset ring-[#43c6c8]/30"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4">
        {phase === "hook" ? (
          <button
            type="button"
            onClick={goQ1}
            className="w-full rounded-md bg-[#d5b162] px-5 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
          >
            {t.start}
          </button>
        ) : null}

        {phase === "q1" ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => chooseRole("imagine", t.q1a)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-[#f7f1e3] transition hover:bg-white/10"
            >
              {t.q1a}
            </button>
            <button
              type="button"
              onClick={() => chooseRole("organise", t.q1b)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-[#f7f1e3] transition hover:bg-white/10"
            >
              {t.q1b}
            </button>
            <button
              type="button"
              onClick={() => chooseRole("aide", t.q1c)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-[#f7f1e3] transition hover:bg-white/10"
            >
              {t.q1c}
            </button>
            <button
              type="button"
              onClick={() => chooseRole("mene", t.q1d)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-[#f7f1e3] transition hover:bg-white/10"
            >
              {t.q1d}
            </button>
          </div>
        ) : null}

        {phase === "q2" ? (
          <div className="grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => chooseLearning("voir", t.q2a)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-[#f7f1e3] transition hover:bg-white/10"
            >
              {t.q2a}
            </button>
            <button
              type="button"
              onClick={() => chooseLearning("ecouter", t.q2b)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-[#f7f1e3] transition hover:bg-white/10"
            >
              {t.q2b}
            </button>
            <button
              type="button"
              onClick={() => chooseLearning("faire", t.q2c)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-[#f7f1e3] transition hover:bg-white/10"
            >
              {t.q2c}
            </button>
          </div>
        ) : null}

        {phase === "q3" || phase === "q4" || phase === "q5" ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={phase === "q3" ? t.q3ph : phase === "q4" ? t.q4ph : t.q5ph}
              className="w-full flex-1 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f7f1e3] placeholder:text-[#f7f1e3]/40 outline-none ring-0 focus:border-[#43c6c8]/40"
            />
            <div className="flex gap-2">
              {phase === "q5" ? (
                <button
                  type="button"
                  onClick={skipBirthdate}
                  className="rounded-md bg-white/5 px-4 py-3 text-sm font-semibold text-[#f7f1e3] ring-1 ring-inset ring-white/10 transition hover:bg-white/10"
                >
                  {t.skip}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  if (phase === "q3") submitText("passion");
                  else if (phase === "q4") submitText("inspiration");
                  else submitBirthdate();
                }}
                className="rounded-md bg-[#43c6c8] px-4 py-3 text-sm font-semibold text-[#071830] transition hover:bg-[#6fe6e8]"
              >
                {t.send}
              </button>
            </div>
          </div>
        ) : null}

        {phase === "result" ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-[#f7f1e3]/65">
              {locale === "fr"
                ? "Tu peux réserver maintenant, ou recommencer le diagnostic."
                : "You can book now, or restart the diagnosis."}
            </div>
            <Link
              href={bookingHref}
              className="inline-flex items-center justify-center rounded-md bg-[#d5b162] px-5 py-3 text-sm font-semibold text-[#101010] transition hover:bg-[#e1c47e]"
            >
              {t.cta}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

