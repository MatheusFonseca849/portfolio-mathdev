import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { buildPageMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, 'contact');
}

export default function ContactPage() {
  return <ContactForm />;
}
