import { routing, type Locale } from '@/i18n/routing';
import { resumeEn } from './en';
import { resumePt } from './pt';
import type { ResumeContent } from './types';

const content: Record<Locale, ResumeContent> = {
  en: resumeEn,
  pt: resumePt,
};

export function getResumeContent(locale: string): ResumeContent {
  return content[locale as Locale] ?? content[routing.defaultLocale];
}