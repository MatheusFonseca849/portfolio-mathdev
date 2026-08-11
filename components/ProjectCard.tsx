'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Card,
  CardMedia,
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
const COLLAPSED_TEXT_HEIGHT = 60;

export default function ProjectCard({
  title,
  thumbnail,
  name,
  url,
  publicUrl,
  info,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
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
        width: 400,
        maxWidth: '100%',
        height: expanded ? 'auto' : CARD_HEIGHT,
        minHeight: CARD_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        transition: 'height 0.3s ease',
      }}
    >
      {thumbnail ? (
        <CardMedia
          component="img"
          height="180"
          image={thumbnail}
          alt={title}
          sx={{ objectFit: 'cover', flexShrink: 0 }}
        />
      ) : (
        <Box
          sx={{
            height: 180,
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
        <Typography variant="h6" component="h3" gutterBottom>
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
        {isOverflowing && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => setExpanded((prev) => !prev)}
              aria-label={expanded ? 'Show less' : 'Show more'}
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
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
            Repo
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
            Live
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
