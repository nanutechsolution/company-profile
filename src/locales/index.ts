import type { Dictionary } from "./types";
import { id } from "./id";
import { en } from "./en";

export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export function getDictionary(locale: Locale): Dictionary { return locale === "id" ? id : en; }
