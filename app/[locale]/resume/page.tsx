import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { getLocale } from 'next-intl/server';

import { getResumeContent } from './content';
import type { Experience } from './content/types';

import WorkOutlineIcon from '@mui/icons-material/WorkOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';

function SectionTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'primary.main',
        }}
      >
        {icon}
      </Box>

      <Typography variant="h5" color="text.primary" sx={{ fontWeight: 700 }}>
        {children}
      </Typography>
    </Stack>
  );
}

function ExperienceItem({
  experience,
  achievementLabel,
}: {
  experience: Experience;
  achievementLabel: string;
}) {
  const achievements = experience.achievements ?? [];

  return (
    <Box
      sx={{
        position: 'relative',
        pl: { xs: 3, sm: 4 },
        pb: 4,
        '&:before': {
          content: '""',
          position: 'absolute',
          left: 5,
          top: 8,
          bottom: 0,
          width: '2px',
          bgcolor: 'divider',
        },
        '&:last-child': {
          pb: 0,
          '&:before': {
            display: 'none',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 4,
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          border: '3px solid',
          borderColor: 'background.paper',
          boxSizing: 'border-box',
          zIndex: 1,
        }}
      />

      <Typography
        variant="h6"
        color="text.primary"
        sx={{ fontWeight: 700, lineHeight: 1.3 }}
      >
        {experience.position}
      </Typography>

      <Typography
        variant="subtitle1"
        color="primary.main"
        sx={{ fontWeight: 600, mt: 0.5 }}
      >
        {experience.company}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5, mb: 2 }}
      >
        {experience.period}
      </Typography>

      <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
        {experience.description.map((item, index) => (
          <Box
            component="li"
            key={index}
            sx={{
              mb: 1,
              color: 'text.secondary',
              '&::marker': {
                color: 'primary.main',
              },
            }}
          >
            <Typography variant="body2" color="text.primary" component="span">
              {item}
            </Typography>
          </Box>
        ))}
      </Box>

      {achievements.length > 0 && (
        <Paper
          variant="outlined"
          sx={{
            mt: 2.5,
            p: 2,
            borderRadius: 2,
            bgcolor: 'action.hover',
          }}
        >
          <Typography
            variant="body2"
            component="div"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7,
            }}
          >
            <Box
              component="span"
              sx={{
                color: 'text.primary',
                fontWeight: 700,
              }}
            >
              {achievementLabel}{' '}
            </Box>

            {achievements.length === 1 ? (
              achievements[0]
            ) : (
              <Box component="ul" sx={{ pl: 2.5, m: 0, mt: 1 }}>
                {achievements.map((item, index) => (
                  <Box
                    component="li"
                    key={index}
                    sx={{
                      mb: 0.5,
                      '&:last-child': { mb: 0 },
                      '&::marker': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </Box>
            )}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default async function ResumePage() {
  const locale = await getLocale();
  const resume = getResumeContent(locale);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ mb: 7 }}>
        <Typography
          variant="h3"
          component="h1"
          color="text.primary"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.25rem', sm: '3rem' },
            mb: 1,
          }}
        >
          Matheus Fonseca
        </Typography>

        <Typography
          variant="h6"
          color="primary.main"
          sx={{ fontWeight: 500, mb: 3 }}
        >
          {resume.jobTitle}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.8,
            maxWidth: 800,
          }}
        >
          {resume.intro}
        </Typography>
      </Box>

      <Divider sx={{ mb: 7 }} />

      <Box component="section" sx={{ mb: 7 }}>
        <SectionTitle icon={<WorkOutlineIcon />}>
          {resume.sections.experience}
        </SectionTitle>

        <Box>
          {resume.experiences.map((experience) => (
            <ExperienceItem
              key={`${experience.company}-${experience.position}`}
              experience={experience}
              achievementLabel={resume.achievementLabel}
            />
          ))}
        </Box>
      </Box>

      <Box component="section" sx={{ mb: 7 }}>
        <SectionTitle icon={<SchoolOutlinedIcon />}>
          {resume.sections.academic}
        </SectionTitle>

        {resume.academicActivities.map((activity) => (
          <ExperienceItem
            key={`${activity.company}-${activity.position}`}
            experience={activity}
            achievementLabel={resume.achievementLabel}
          />
        ))}
      </Box>

      <Box component="section" sx={{ mb: 7 }}>
        <SectionTitle icon={<SchoolOutlinedIcon />}>
          {resume.sections.education}
        </SectionTitle>

        <Stack spacing={2}>
          {resume.education.map((entry) => (
            <Paper
              key={`${entry.institution}-${entry.degree}`}
              variant="outlined"
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontWeight: 700 }}
              >
                {entry.degree}
              </Typography>

              <Typography
                variant="subtitle1"
                color="primary.main"
                sx={{ fontWeight: 600, mt: 0.5 }}
              >
                {entry.institution}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {entry.detail}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>

      <Box component="section" sx={{ mb: 7 }}>
        <SectionTitle icon={<CodeOutlinedIcon />}>
          {resume.sections.skills}
        </SectionTitle>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
            },
            gap: 2,
          }}
        >
          {resume.skillGroups.map((group) => (
            <Paper
              key={group.title}
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.primary"
                sx={{ fontWeight: 700, mb: 1.5 }}
              >
                {group.title}
              </Typography>

              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.8 }}>
                {group.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box component="section" sx={{ mb: 7 }}>
        <SectionTitle icon={<TranslateOutlinedIcon />}>
          {resume.sections.languages}
        </SectionTitle>

        <Stack spacing={1.5}>
          {resume.languages.map((item) => (
            <Box
              key={item.language}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid',
                borderColor: 'divider',
                pb: 1.5,
              }}
            >
              <Typography color="text.primary" sx={{ fontWeight: 600 }}>
                {item.language}
              </Typography>

              <Chip
                label={item.level}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
          ))}
        </Stack>
      </Box>

      <Box component="section">
        <SectionTitle icon={<PsychologyOutlinedIcon />}>
          {resume.sections.softSkills}
        </SectionTitle>

        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {resume.softSkills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              variant="outlined"
              sx={{
                py: 2,
                borderRadius: 2,
              }}
            />
          ))}
        </Stack>
      </Box>
    </Container>
  );
}