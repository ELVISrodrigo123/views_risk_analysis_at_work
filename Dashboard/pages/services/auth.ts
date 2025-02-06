import axios from 'axios';

const API_URL = 'http://backend:8000/api/'; // URL de tu backend Django

// Interfaz para la respuesta de autenticación
interface AuthResponse {
  access: string;
  refresh: string;
}

// Interfaz para los errores de autenticación
interface AuthError {
  message: string;
}

// Función para iniciar sesión
export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}login/`, {
      username,
      password,
    });
    if (response.data.access) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
    }
    return response.data;
  } catch (error) {
    console.error('Error durante el login:', error); // Imprime el error completo en la consola
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'USUARIO INCORRECTO O CONTRASEÑA INCORRESTA ';
      throw new Error(errorMessage);
    }
    throw new Error('Error desconocido durante el login');
  }
};

// Función para cerrar sesión
export const logout = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Función para refrescar el token
export const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No hay token de refresh disponible');
  }

  try {
    const response = await axios.post<{ access: string }>(`${API_URL}token/refresh/`, {
      refresh: refreshToken,
    });
    localStorage.setItem('accessToken', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Error al refrescar el token:', error); // Imprime el error completo en la consola
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Error al refrescar el token';
      throw new Error(errorMessage);
    }
    throw new Error('Error desconocido al refrescar el token');
  }
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
};
