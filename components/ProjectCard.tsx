'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  Collapse,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';

export interface ProjectCardProps {
  title: string;
  thumbnail: string;
  name: string;
  url: string;
  publicUrl: string;
  info: string;
  customConfig?: Record<string, unknown>;
}

const CARD_HEIGHT = 420;
const CARD_WIDTH = 400;
const THUMBNAIL_HEIGHT = 180;
const COLLAPSED_TEXT_HEIGHT = 60;

/** Always reserved, so revealing the expand button can't shift the layout. */
const EXPAND_ROW_HEIGHT = 34;

export default function ProjectCard({
  title,
  thumbnail,
  name,
  url,
  publicUrl,
  info,
}: ProjectCardProps) {
  const t = useTranslations('projects');
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const checkOverflow = useCallback(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > COLLAPSED_TEXT_HEIGHT);
    }
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [checkOverflow, info]);

  return (
    <Card
      sx={{
        width: CARD_WIDTH,
        maxWidth: '100%',
        height: expanded ? 'auto' : CARD_HEIGHT,
        minHeight: CARD_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        transition: 'height 0.3s ease',
      }}
    >
      {thumbnail && !thumbnailFailed ? (
        <Box sx={{ position: 'relative', height: THUMBNAIL_HEIGHT, flexShrink: 0 }}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes={`${CARD_WIDTH}px`}
            style={{ objectFit: 'cover' }}
            onError={() => setThumbnailFailed(true)}
          />
        </Box>
      ) : (
        <Box
          sx={{
            height: THUMBNAIL_HEIGHT,
            flexShrink: 0,
            bgcolor: 'grey.300',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ImageIcon sx={{ fontSize: 64, color: 'grey.500' }} />
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden', pb: 0 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }} gutterBottom>
          {name}
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <Collapse in={expanded} collapsedSize={COLLAPSED_TEXT_HEIGHT}>
            <Typography ref={textRef} variant="body2" color="text.secondary">
              {info}
            </Typography>
          </Collapse>
          {isOverflowing && !expanded && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 32,
                background: (theme) =>
                  `linear-gradient(to bottom, transparent, ${theme.palette.background.paper})`,
                pointerEvents: 'none',
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 0.5,
            height: EXPAND_ROW_HEIGHT,
          }}
        >
          {isOverflowing && (
            <IconButton
              size="small"
              onClick={() => setExpanded((prev) => !prev)}
              aria-label={expanded ? t('showLess') : t('showMore')}
              aria-expanded={expanded}
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, mt: 'auto' }}>
        {url && (
          <Button
            size="small"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
          >
            {t('viewRepo')}
          </Button>
        )}
        {publicUrl && (
          <Button
            size="small"
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<LaunchIcon />}
          >
            {t('viewLive')}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
