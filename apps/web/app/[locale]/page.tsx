import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('hero');
  return (
    <main>
      <h1>{t('line1')} {t('line2')}</h1>
      <h2>{t('line3')} {t('line4')}</h2>
    </main>
  );
}
