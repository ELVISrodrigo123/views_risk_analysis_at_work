import * as React from 'react';
import { Box, Button, Typography, TextField, IconButton, Alert } from '@mui/material';
import { Person, Lock, HelpOutline, Login } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { login } from '../services/auth';

const SignIn = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    try {
      const response = await login(username, password);
      if (response.access) {
        router.push('/dashboards/minera');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error de autenticación. Verifica tus credenciales.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'primary.main',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <IconButton sx={{ mb: 2, color: 'primary.main' }}>
          <Person fontSize="large" />
        </IconButton>
        <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
          Industrial Portal
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <TextField
          fullWidth
          name="username"
          label="Username"
          variant="outlined"
          margin="normal"
          required
          InputProps={{
            startAdornment: <Person sx={{ mr: 1, color: 'primary.main' }} />,
          }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          margin="normal"
          required
          InputProps={{
            startAdornment: <Lock sx={{ mr: 1, color: 'primary.main' }} />,
          }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" startIcon={<HelpOutline />} sx={{ color: 'primary.main', borderColor: 'primary.main' }}>
            Help
          </Button>
          <Button type="submit" variant="contained" startIcon={<Login />} sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;