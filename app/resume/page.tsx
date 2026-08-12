import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import WorkOutlineIcon from '@mui/icons-material/WorkOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';

interface Experience {
  position: string;
  company: string;
  period: string;
  description: string[];
  achievements?: string;
}

interface SkillGroup {
  title: string;
  skills: string[];
}

const experiences: Experience[] = [
  {
    position: 'IR Client Support Analyst',
    company: 'Q4 Inc.',
    period: 'September 2025 – Present',
    description: [
      'Updating clients’ investor relations websites using a custom CSM solution, maintaining a steady 96.8% SLA compliance.',
      'Using HTML, CSS, jQuery, and other tools to provide timely updates on client websites while maintaining strong performance metrics.',
      'Coordinating with colleagues to ensure a smooth earnings period service, making sure time-sensitive updates and announcements are published on time.',
      'Troubleshooting and resolving website issues.',
    ],
    achievements:
      'Maintained consistent above-average metrics across all tracked performance areas. Received numerous positive feedback from clients both over the phone and through the client survey channel.',
  },
  {
    position: 'Systems Implementation Analyst I',
    company: 'Outsmart',
    period: 'April 2025 – September 2025',
    description: [
      'Designed and developed front-end interfaces using React, TypeScript, Next.js, Vue.js, and Angular.',
      'Revamped layouts and implemented CSS styling to improve application interfaces.',
      'Integrated applications within the Zoho CRM environment using Deluge.',
      'Performed maintenance and improvements across front-end and back-end applications.',
      'Developed custom software solutions tailored to client requirements.',
      'Implemented technology solutions from requirement gathering through final deployment.',
    ],
    achievements:
      'Contributed to the development of several solutions and integrations for client companies, including complex features specifically tailored to individual business requirements.',
  },
  {
    position: 'Web Development Intern',
    company: 'Outsmart',
    period: 'September 2024 – April 2025',
    description: [
      'Developed front-end interfaces using React, TypeScript, Next.js, Vue.js, and Angular.',
      'Revamped application layouts and implemented CSS styling.',
      'Integrated applications within the Zoho CRM environment using Deluge.',
      'Performed maintenance on applications written in JavaScript, Vue.js, and Next.js.',
      'Developed custom software solutions for client companies.',
    ],
    achievements:
      'Successfully implemented solutions within tight deadlines. Became proficient with a new programming language and framework in less than two months (Deluge and Vue.js). Earned a full-time position after completing the six-month internship.',
  },
];

const academicActivities: Experience[] = [
  {
    position: 'Front-end Leader – Bay Area Project',
    company: 'IESB, Brasília – DF',
    period: 'March 2024 – August 2024',
    description: [
      'Developed interfaces using React and TypeScript with Next.js.',
      'Revamped layouts, created authenticated routes, and integrated applications with back-end systems.',
      'Coordinated front-end development activities and managed sprints.',
    ],
    achievements:
      'Contributed to coordinating the front-end development team and implemented solutions to improve code organization and scalability.',
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'SQL', 'Python'],
  },
  {
    title: 'Frameworks',
    skills: ['React', 'Next.js', 'Express', 'Vue'],
  },
  {
    title: 'Libraries',
    skills: ['Styled Components', 'Tailwind', 'Sass', 'Mongoose'],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'MySQL', 'SQLite'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'Node.js', 'Docker', 'Power BI'],
  },
  {
    title: 'Other',
    skills: [
      'Agile Development',
      'Project Management',
      'Slack',
      'Basecamp',
      'Bitrix',
      'Gather',
    ],
  },
];

const languages = [
  { language: 'English', level: 'Fluent' },
  { language: 'Spanish', level: 'Intermediate' },
  { language: 'French', level: 'Basic' },
];

const softSkills = [
  'Strong communication skills',
  'Ability to work within tight deadlines',
  'Self-motivated',
  'Self-managed',
  'Continuous learner',
  'Strong attention to detail',
];

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

function ExperienceItem({ experience }: { experience: Experience }) {
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

      {experience.achievements && (
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
              Achievement:{' '}
            </Box>
            {experience.achievements}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default function ResumePage() {
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
          My Resume
        </Typography>

        <Typography
          variant="h6"
          color="primary.main"
          sx={{ fontWeight: 500, mb: 3 }}
        >
          Full-Stack Developer
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.8,
            maxWidth: 800,
          }}
        >
          Systems Analysis and Development graduate with hands-on experience
          in full-stack development, specializing in React, Next.js, Node.js,
          and Python. Skilled in systems integration, team leadership, and the
          delivery of user-centric web solutions. Leveraging a strong
          foundation in sales to bring a unique perspective to problem-solving
          and stakeholder collaboration. Eager to contribute to innovative
          technology projects, driving results with a proactive mindset and
          commitment to excellence.
        </Typography>
      </Box>

      <Divider sx={{ mb: 7 }} />

      <Box component="section" sx={{ mb: 7 }}>
        <SectionTitle icon={<WorkOutlineIcon />}>
          Professional Experience
        </SectionTitle>

        <Box>
          {experiences.map((experience) => (
            <ExperienceItem
              key={`${experience.company}-${experience.position}`}
              experience={experience}
            />
          ))}
        </Box>
      </Box>

      <Box component="section" sx={{ mb: 7 }}>
        <SectionTitle icon={<SchoolOutlinedIcon />}>
          Academic Activities
        </SectionTitle>

        {academicActivities.map((activity) => (
          <ExperienceItem
            key={`${activity.company}-${activity.position}`}
            experience={activity}
          />
        ))}
      </Box>

      <Box component="section" sx={{ mb: 7 }}>
        <SectionTitle icon={<SchoolOutlinedIcon />}>
          Education
        </SectionTitle>

        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2.5, sm: 3 },
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700 }}>
            System Analysis and Development
          </Typography>

          <Typography
            variant="subtitle1"
            color="primary.main"
            sx={{ fontWeight: 600, mt: 0.5 }}
          >
            IESB, Brasília – DF
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Undergraduate • Graduated July 2026
          </Typography>
        </Paper>
      </Box>

      <Box component="section" sx={{ mb: 7 }}>
        <SectionTitle icon={<CodeOutlinedIcon />}>
          Technical Skills
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
          {skillGroups.map((group) => (
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
          Languages
        </SectionTitle>

        <Stack spacing={1.5}>
          {languages.map((item) => (
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
          Soft Skills
        </SectionTitle>

        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {softSkills.map((skill) => (
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