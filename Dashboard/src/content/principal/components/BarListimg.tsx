import * as React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

export default function VisionSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '2rem 1rem' : '4rem 2rem',
        marginTop: '4rem',
        height: isMobile ? 'auto' : '80vh',
      }}
    >
      <Box
        sx={{
          width: isMobile ? '100%' : '50%',
          height: isMobile ? '300px' : '100%',
          backgroundImage: 'url(/img/homepage.png)',
          backgroundSize: 'cover',
        }}
      />
      <Box
        sx={{
          width: isMobile ? '100%' : '50%',
          padding: isMobile ? '2rem 0' : '0 4rem',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 5,
            fontSize: '2em',
          }}
        >
          PROPÓSITO
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            fontSize: '1.5em',
          }}
        >
          Innovar en la minería en Bolivia y el mundo para generar oportunidades y bienestar sostenible, convirtiéndonos en la minera número uno de plata globalmente
        </Typography>
      </Box>
    </Box>
  );
}