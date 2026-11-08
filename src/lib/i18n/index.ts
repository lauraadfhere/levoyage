import { chromeMessages } from "./chrome";
import { homeMessages } from "./home";
import { pageMessages } from "./pages";
import { extraMessages } from "./extra";
import { isLocale, type Locale } from "./core";

export * from "./core";

const dictionaries: Record<Locale, Record<string, string>> = {
  en: { ...chromeMessages.en, ...homeMessages.en, ...pageMessages.en, ...extraMessages.en },
  fr: { ...chromeMessages.fr, ...homeMessages.fr, ...pageMessages.fr, ...extraMessages.fr },
  ar: { ...chromeMessages.ar, ...homeMessages.ar, ...pageMessages.ar, ...extraMessages.ar },
};

export type Translate = (key: string, vars?: Record<string, string | number>) => string;

/** Translator for a locale, falling back to English for any missing key. */
export function createTranslator(locale: string | undefined): Translate {
  const active: Locale = isLocale(locale) ? locale : "en";
  const dict = dictionaries[active];
  const fallback = dictionaries.en;
  return (key, vars) => {
    let value = dict[key] ?? fallback[key] ?? key;
    if (vars) {
      for (const [name, replacement] of Object.entries(vars)) {
        value = value.replaceAll(`{${name}}`, String(replacement));
      }
    }
    return value;
  };
}

export function localeOrDefault(value: string | undefined): Locale {
  return isLocale(value) ? value : "en";
}

/** Picks the right plural-ish key for a count. */
export function countKey(t: Translate, one: string, many: string, count: number, vars?: Record<string, string | number>) {
  return t(count === 1 ? one : many, { count, ...vars });
}
