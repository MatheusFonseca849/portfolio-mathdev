import { Box, Container, Typography } from '@mui/material';
import { getRepos } from 'portfolio-github-integration';
import ProjectCard from '@/components/ProjectCard';

const GITHUB_USERNAME = 'MatheusFonseca849';

export const revalidate = 3600; // Re-fetch from GitHub every 1 hour

export default async function ProjectsPage() {
  let repos: { name: string; url: string; publicUrl?: string; thumbnail?: string | null; info: string; title: string; customConfig?: Record<string, unknown> }[] = [];
  let error: string | null = null;

  try {
    repos = await getRepos(GITHUB_USERNAME, {
      token: process.env.GITHUB_TOKEN,
      maxRepos: 50,
      debug: false,
      sortBy: "order"
    });
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch projects';
    repos = [];
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography color="error" sx={{ textAlign: 'center' }}>
          {error}
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
            info={repo.info}
            customConfig={repo.customConfig}
          />
        ))}
      </Box>
    </Container>
  );
}
