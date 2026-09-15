import { Box, Container, Typography } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { getRepos, type RepoMetadata } from 'portfolio-github-integration';
import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import { routing, type Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/metadata';

const GITHUB_USERNAME = 'MatheusFonseca849';

export const revalidate = 3600; // Re-fetch from GitHub every 1 hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, 'projects');
}

function localizedInfo(repo: RepoMetadata, locale: string): string {
  if (locale === routing.defaultLocale) return repo.info;

  const translated = repo.customConfig?.[`info${locale.toUpperCase()}`];

  return typeof translated === 'string' && translated.trim() !== ''
    ? translated
    : repo.info;
}

export default async function ProjectsPage() {
  const t = await getTranslations('projects');
  const locale = await getLocale();

  let repos: RepoMetadata[] = [];
  let failed = false;

  try {
    repos = await getRepos(GITHUB_USERNAME, {
      token: process.env.GITHUB_TOKEN,
      maxRepos: 50,
      debug: false,
      sortBy: "order"
    });
  } catch (err) {
    console.error('Failed to fetch GitHub repos:', err);
    failed = true;
    repos = [];
  }

  if (failed) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography color="error" sx={{ textAlign: 'center' }}>
          {t('fetchError')}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {repos.map((repo) => (
          <ProjectCard
            key={repo.name}
            title={repo.title}
            thumbnail={repo.thumbnail ?? ''}
            name={repo.name}
            url={repo.url}
            publicUrl={repo.publicUrl ?? ''}
            info={localizedInfo(repo, locale)}
            customConfig={repo.customConfig}
          />
        ))}
      </Box>
    </Container>
  );
}
