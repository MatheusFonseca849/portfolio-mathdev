import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import profilePhoto from '@/assets/Matheus-Fonseca.jpeg';

export default function HomePage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 3, md: 6 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: { xs: 4, md: 9 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          flexShrink: 0,
          width: { xs: 180, md: 450 },
          height: { xs: 180, md: 450 },
          borderRadius: '50%',
          overflow: 'hidden',
          order: { xs: -1, md: 1 },
        }}
      >
      <Image src={profilePhoto} alt="Profile" fill style={{ objectFit: 'cover', objectPosition: 'center top', borderRadius: '50%' }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" color="text.primary">
          Matheus Fonseca
        </Typography>
        <Typography variant="body1" color="text.primary">
          Graduated in 2026 in Systems Analysis and Development, Matheus has displayed great aptitude in the world of technology throughout his graduation journey. He was selected to be a monitor for two different disciplines on his first semester, was able to secure an internship at a systems development company in his second, was effectively hired on the third semester, and, at last, secured an international job as a client support analyst in the fourth, demonstrating his ability to adapt and thrive in challenging environments.
        </Typography>

        <Typography variant="body1" color="text.primary">
          Through his experiences, Matheus has developed a strong foundation in software development, problem-solving, and client communication, which he hopes to leverage in his career as a software developer. Being a declared enemy of bugs, low performance systems, and poorly designed architectures, Matheus is ready to keep on studying and working relentlessly to deliver high quality code output and contribute to a bug-free world.
        </Typography>

        <Typography variant="body1" color="text.primary">
          However, not everything is about ones and zeros. Matheus is also an avid rock and heavy metal fan, loves video games, pop culture, Brazilian music and cinema, and has a deep passion for learning new things and exploring different ideas.
        </Typography>
      </Box>
    </Container>
  );
}
