import * as React from 'react';
import { Box, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';

export default function RiskAnalysis() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4 }}>
        Análisis de Riesgo en el Trabajo
      </Typography>

      <Box
        sx={{
          maxWidth: isMobile ? '90%' : '50%',
          margin: '0 auto',
          mb: 6,
        }}
      >
        <Typography variant="body1">
          En Minera San Cristóbal, nos comprometemos con la seguridad de nuestros trabajadores.
          Este análisis de riesgo identifica los peligros potenciales en las operaciones de la planta minera
          y establece medidas de control para garantizar un ambiente de trabajo seguro y eficiente.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              padding: '2rem',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '310px',
                borderRadius: '8px',
                overflow: 'hidden',
                mb: 2,
              }}
            >
              <img
                src="/img/riesgoh.png"
                alt="Riesgo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Riesgo
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Identificación de riesgos asociados a las operaciones en la planta minera.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              padding: '2rem',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '310px',
                borderRadius: '8px',
                overflow: 'hidden',
                mb: 2,
              }}
            >
              <img
                src="/img/peligroh.png"
                alt="Peligro"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Peligro
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Evaluación de peligros potenciales y su impacto en la seguridad de los trabajadores.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              padding: '2rem',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '310px',
                borderRadius: '8px',
                overflow: 'hidden',
                mb: 2,
              }}
            >
              <img
                src="/img/epp.png"
                alt="Medidas de Control"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Medidas de Control
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Implementación de medidas para mitigar riesgos y garantizar un entorno seguro.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}