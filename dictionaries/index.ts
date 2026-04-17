import "server-only";

const dictionaries = {
  fr: () => import("./fr.json").then((m) => m.default),
  en: () => import("./en.json").then((m) => m.default),
};

const marketingPagesByLocale = {
  fr: () => import("./marketing-fr.json").then((m) => m.default),
  en: () => import("./marketing-en.json").then((m) => m.default),
} as const;

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => {
  const [base, marketingPages] = await Promise.all([
    dictionaries[locale](),
    marketingPagesByLocale[locale](),
  ]);
  return { ...base, marketingPages };
};

