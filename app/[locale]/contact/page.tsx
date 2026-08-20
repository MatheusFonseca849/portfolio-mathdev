'use client';

import { useState, type FormEvent } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/SendOutlined';
import { useTranslations } from 'next-intl';

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;

const LINKEDIN_URL = 'https://www.linkedin.com/in/matheusfonseca1993';

/** Error codes the API is known to return; anything else falls back to UNKNOWN. */
const KNOWN_ERROR_CODES = new Set([
  'FORBIDDEN',
  'RATE_LIMITED',
  'INVALID_BODY',
  'REQUIRED_FIELDS',
  'NAME_TOO_LONG',
  'INVALID_EMAIL',
  'MESSAGE_TOO_LONG',
  'SERVER_CONFIG',
  'SEND_FAILED',
]);

interface ApiError {
  error?: string;
  seconds?: number;
  max?: number;
}

interface FormState {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const t = useTranslations('contact');

  const describeError = (data: ApiError) => {
    const code = data?.error;
    if (!code || !KNOWN_ERROR_CODES.has(code)) {
      return t('errors.UNKNOWN');
    }
    return t(`errors.${code}`, {
      seconds: data.seconds ?? 0,
      max: data.max ?? 0,
    });
  };

  const isValid =
    form.name.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.message.trim().length > 0;

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid || status === 'sending') return;

    setStatus('sending');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          website: form.website,
        }),
      });

      const data: ApiError = await res.json();

      if (res.ok) {
        setStatus('success');
        setFeedback(t('success'));
        setForm({ name: '', email: '', message: '', website: '' });
      } else {
        setStatus('error');
        setFeedback(describeError(data));
      }
    } catch {
      setStatus('error');
      setFeedback(t('errors.NETWORK'));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          color="text.primary"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.25rem', sm: '3rem' },
            mb: 1,
          }}
        >
          {t('heading')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {t('intro')}
        </Typography>
      </Box>

      <Paper
        variant="outlined"
        sx={{ p: { xs: 3, sm: 4 }, borderRadius: 2 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {/* Honeypot — invisible to real users */}
          <TextField
            label={t('websiteLabel')}
            value={form.website}
            onChange={handleChange('website')}
            tabIndex={-1}
            autoComplete="off"
            sx={{
              position: 'absolute',
              left: -9999,
              opacity: 0,
              height: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          />

          <TextField
            label={t('nameLabel')}
            required
            fullWidth
            value={form.name}
            onChange={handleChange('name')}
            slotProps={{ htmlInput: { maxLength: MAX_NAME } }}
            disabled={status === 'sending'}
          />

          <TextField
            label={t('emailLabel')}
            type="email"
            required
            fullWidth
            value={form.email}
            onChange={handleChange('email')}
            slotProps={{ htmlInput: { maxLength: MAX_EMAIL } }}
            disabled={status === 'sending'}
          />

          <TextField
            label={t('messageLabel')}
            required
            fullWidth
            multiline
            minRows={4}
            maxRows={10}
            value={form.message}
            onChange={handleChange('message')}
            slotProps={{ htmlInput: { maxLength: MAX_MESSAGE } }}
            helperText={`${form.message.length}/${MAX_MESSAGE}`}
            disabled={status === 'sending'}
          />

          {feedback && (
            <Alert severity={status === 'success' ? 'success' : 'error'} sx={{ borderRadius: 2 }}>
              {feedback}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!isValid || status === 'sending'}
            endIcon={
              status === 'sending' ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            sx={{ alignSelf: 'flex-end', borderRadius: 2, px: 4 }}
          >
            {status === 'sending' ? t('sending') : t('send')}
          </Button>
        </Box>
      </Paper>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {t('linkedinPrompt')}{' '}
        <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          {t('linkedinLabel')}
        </Link>
      </Typography>
    </Container>
  );
}
