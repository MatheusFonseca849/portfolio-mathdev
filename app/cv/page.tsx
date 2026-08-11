import { Box, Typography, Container } from '@mui/material';

export default function CVPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        <Typography variant="h5" color="text.primary">
          Curriculum Vitae
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
          Coming soon...
        </Typography>
      </Box>
    </Container>
  );
}
