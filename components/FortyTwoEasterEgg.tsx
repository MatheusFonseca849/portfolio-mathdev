'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Backdrop, Box, ButtonBase, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const SEQUENCE = ['4', '2'];
/** Max gap between keystrokes before the sequence resets. */
const SEQUENCE_TIMEOUT_MS = 1500;
const REDIRECT_DELAY_MS = 2800;

const pop = keyframes`
  0% { transform: scale(0.2) rotate(-20deg); opacity: 0; }
  60% { transform: scale(1.15) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

const rise = keyframes`
  from { transform: translateY(16px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const drift = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(100vw); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-70px) rotate(-12deg); }
`;

const DOLPHIN_COUNT = 3;
const DOLPHIN_TRAVEL_MS = 2200;
const DOLPHIN_STAGGER_MS = 220;

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

export default function FortyTwoEasterEgg() {
  const t = useTranslations('easterEgg');
  const router = useRouter();
  const [active, setActive] = useState(false);
  const progress = useRef(0);
  const lastKeyAt = useRef(0);

  const trigger = useCallback(() => {
    setActive((current) => current || true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (active || event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) return;

      const now = Date.now();
      if (now - lastKeyAt.current > SEQUENCE_TIMEOUT_MS) progress.current = 0;
      lastKeyAt.current = now;

      if (event.key === SEQUENCE[progress.current]) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          progress.current = 0;
          trigger();
        }
      } else {
        // A wrong key resets, but the key may itself be the start of the sequence.
        progress.current = event.key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, trigger]);

  useEffect(() => {
    if (!active) return;
    router.prefetch('/42');
    const timer = window.setTimeout(() => router.push('/42'), REDIRECT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, router]);

  return (
    <>
      {/* Barely visible on purpose: the touch-friendly way in for people who
          can't type the key sequence. */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: { xs: 2, md: 3 }, pb: 2 }}>
        <ButtonBase
          onClick={trigger}
          aria-label={t('buttonLabel')}
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.7rem',
            fontFamily: 'monospace',
            color: 'text.disabled',
            opacity: 0.25,
            transition: 'opacity 200ms',
            '&:hover, &:focus-visible': { opacity: 1 },
          }}
        >
          42
        </ButtonBase>
      </Box>

      <Backdrop
        open={active}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 1,
          flexDirection: 'column',
          gap: 3,
          px: 3,
          bgcolor: 'rgba(0, 0, 0, 0.92)',
          color: '#fff',
          textAlign: 'center',
          overflow: 'hidden',
        }}
        role="status"
        aria-live="polite"
      >
        {active && (
          <>
            {Array.from({ length: DOLPHIN_COUNT }, (_, i) => (
              <Box
                key={i}
                aria-hidden
                sx={{
                  position: 'absolute',
                  top: { xs: '18%', md: '22%' },
                  left: 0,
                  animation: `${drift} ${DOLPHIN_TRAVEL_MS}ms ease-in-out ${i * DOLPHIN_STAGGER_MS}ms both`,
                  '@media (prefers-reduced-motion: reduce)': { display: 'none' },
                }}
              >
                <Box
                  component="img"
                  src="/dolphin.webp"
                  alt=""
                  sx={{
                    display: 'block',
                    width: { xs: 90, md: 150 },
                    // The source art faces left; flip it to swim with the drift.
                    scale: '-1 1',
                    animation: `${bounce} 550ms ease-in-out ${i * DOLPHIN_STAGGER_MS}ms infinite`,
                  }}
                />
              </Box>
            ))}
            <Typography
              component="div"
              sx={{
                fontSize: { xs: '6rem', md: '10rem' },
                fontWeight: 800,
                lineHeight: 1,
                fontFamily: 'monospace',
                animation: `${pop} 700ms cubic-bezier(0.34, 1.56, 0.64, 1) both`,
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
              }}
            >
              42
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{
                maxWidth: 560,
                animation: `${rise} 600ms ease-out 500ms both`,
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
              }}
            >
              {t('farewell')}
            </Typography>
          </>
        )}
      </Backdrop>
    </>
  );
}
