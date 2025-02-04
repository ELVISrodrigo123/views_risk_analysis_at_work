import { Box, Container, Grid, Typography, Button } from "@mui/material";

const IndustrialSafety = () => {
  return (
    <Container sx={{ width: "70%", marginTop: 4, marginBottom: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Seguridad Industrial
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={4}>
          <Box component="img" src="/img/seccionthree.jpeg" alt="Seguridad Industrial" sx={{ width: "100%", height: "auto" }} />
        </Grid>
        <Grid item xs={12} md={4} textAlign="left">
          <Typography sx={{ paddingTop: 3,}} variant="h5">Importancia de la Seguridad Industrial</Typography>
          <Typography sx={{ paddingTop: 3,}} variant="body1" gutterBottom>
            La seguridad industrial es fundamental para proteger la integridad de los trabajadores y prevenir accidentes. 
            Implementar normas de seguridad reduce riesgos y mejora el ambiente laboral, asegurando el cumplimiento de 
            las normativas vigentes.
          </Typography>
          <Button sx={{ marginTop: 3,}} variant="contained" color="primary">
            Más información
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box component="img" src="/img/secciontwo.jpg" alt="Medidas de Seguridad" sx={{ width: "100%", height: "auto" }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default IndustrialSafety;