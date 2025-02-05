import * as React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { name: 'Home', href: '/' },
  { name: '210-CHANCADO', href: '/management/area/210' },
  { name: '220-DOMO', href: '/management/area/220' },
  { name: '230-MOLIENDA', href: '/management/area/230' },
  { name: '240-FLOTACION PLOMO', href: '/management/area/240' },
  { name: '250-FLOTACION ZINC', href: '/management/area/250' },
  { name: '270-REACTIVOS', href: '/management/area/270' },
  { name: '310-ESPESADORES', href: '/management/area/310' },
  { name: '320-FILTROS', href: '/management/area/320' },
  { name: '330-CARGUIO', href: '/management/area/330' },
  { name: 'Sign In', href: '/auth', isButton: true }, // "Sign In" será un botón
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" color="primary" sx={{ my: 3 }}>
        Minera San Cristobal S.A.
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            {item.isButton ? (
              <Button
                variant="contained"
                color="primary"
                href={item.href}
                sx={{ width: '100%', borderRadius: 0 }}
              >
                {item.name}
              </Button>
            ) : (
              <ListItemButton
                component="a"
                href={item.href}
                
              >
                <ListItemText primary={item.name} sx={{ color: 'primary' }} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: 'transparent', // Fondo transparente
          boxShadow: 'none', // Elimina la sombra
          paddingLeft: '3em',
          paddingRight: '3em',
          paddingTop: '2em',
        }}
      >
        <Toolbar>
          <IconButton
            color="primary" // Ícono en color primary
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            color='primary'
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              color: 'primary', // Texto en color primary
            }}
          >
            Minera San Cristobal S.A.
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) =>
              item.isButton ? (
                <Button
                  key={item.name}
                  variant="contained"
                  color="primary"
                  href={item.href}
                  sx={{ ml: 2 }}
                >
                  {item.name}
                </Button>
              ) : (
                <Button
                  key={item.name}
                  component="a"
                  href={item.href}
                  sx={{ color: 'primary', ml: 2 }} // Enlaces en color primary
                >
                  {item.name}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejora el rendimiento en móviles
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar /> {/* Espacio para el toolbar */}
      </Box>
    </Box>
  );
}