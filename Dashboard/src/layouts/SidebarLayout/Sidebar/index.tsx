import { useContext } from 'react';
import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken
} from '@mui/material';

import SidebarMenu from './SidebarMenu';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <div className='fondologin'>
        <SidebarWrapper
          /* style={{ "background": "linear-gradient(to right, #cc5333, #23074d)" }} */
          style={{backgroundImage: 'linear-gradient(rgba(0, 0, 255, 0.5), rgba(0, 0, 255, 0.5)), url("/img/minera.png")',backgroundSize:"cover",backgroundRepeat:"no-repeat"}}
          sx={{
            display: {
              xs: 'none',
              lg: 'inline-block'
            },
            position: 'fixed',
            left: 0,
            top: 0,
            background:
              theme.palette.mode === 'dark'
                ? alpha(lighten(theme.header.background, 0.1), 0.5)
                : darken(theme.colors.alpha.black[100], 0.5),
            boxShadow:
              theme.palette.mode === 'dark' ? theme.sidebar.boxShadow : 'none'
          }}
        >
          <Scrollbar >
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 130
                }}
              >
                {/* <Logo /> */}
                <h3>Minera San Cristobal S.A.</h3>
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            />
            <SidebarMenu />
          </Scrollbar>
          <Divider
            sx={{
              background: theme.colors.alpha.trueWhite[10]
            }}
          />
          <Box p={2}>
            {/* <Button
              className='button-header'
              href="https://estudiantes.uatf.edu.bo/login"

              size="small"
              fullWidth
            >
              <span>LOGIN UATF</span>
            </Button> */}
          </Box>
        </SidebarWrapper>
      </div>
      <Drawer
        style={{ backgroundColor: "white" }}
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          /* style={{ "background": "linear-gradient(to right, #cc5333, #23074d)" }} */
          style={{backgroundImage: 'linear-gradient(rgba(0, 0, 255, 0.5), rgba(0, 0, 255, 0.5)), url("/img/minera.png")',backgroundSize:"cover",backgroundRepeat:"no-repeat"}}
          sx={{
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5)
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 150
                }}
              >
                {/* <Logo /> */}
                <h3>Minera San Cristobal S.A.</h3>
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10]
              }}
            />
            <SidebarMenu />

          </Scrollbar>
        </SidebarWrapper>

      </Drawer>
    </>
  );
}

export default Sidebar;
