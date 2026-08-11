'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { getRepos } from 'portfolio-github-integration';
import ProjectCard from '@/components/ProjectCard';

const GITHUB_USERNAME = 'MatheusFonseca849';

export default function ProjectsPage() {
  const [repos, setRepos] = useState<
    { name: string; url: string; publicUrl?: string; thumbnail?: string | null; info: string; title: string; customConfig?: Record<string, unknown> }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const data = await getRepos(GITHUB_USERNAME, {
          maxRepos: 50,
          debug: false,
        });
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="primary" />
      </Container>
    );
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
