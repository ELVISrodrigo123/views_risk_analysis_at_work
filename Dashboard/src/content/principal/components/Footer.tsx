import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 4,
        textAlign: "center",
      }}
    >
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={12}>
            <Typography variant="h6">Minera San Cristóbal</Typography>
            <Typography variant="body2">Liderando la minería con innovación y responsabilidad.</Typography>
          </Grid>
        </Grid>
        <Box mt={2} py={2} sx={{ backgroundColor: "primary.dark" }}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                Copyright {new Date().getFullYear()} - Todos los derechos reservados Minera San Cristóbal S.A.
              </Typography>
              <Typography variant="body2">
                Sitio web diseñado por Developer por Elvis Rodrigo
              </Typography>
              <Typography variant="body2">
                <a href="#" style={{ color: "white", textDecoration: "none" }}>Términos y Condiciones</a> -
                <a href="#" style={{ color: "white", textDecoration: "none" }}>Política de Privacidad</a>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <IconButton href="https://x.com/MinSanCristobal" target="_blank" sx={{ color: "white" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://www.facebook.com/minerasancristobal/" target="_blank" sx={{ color: "white" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://www.linkedin.com/company/minerasancristobal/posts/?feedView=all" target="_blank" sx={{ color: "white" }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton href="https://www.youtube.com/channel/UCOWuXIO5bawVPBhkd2vNEOg" target="_blank" sx={{ color: "white" }}>
                <YouTubeIcon />
              </IconButton>
              <IconButton href="https://wa.me/+59171425703" target="_blank" sx={{ color: "white" }}>
                <WhatsAppIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
