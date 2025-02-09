import SidebarLayout from '@/layouts/SidebarLayout';
import * as React from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../../src/services/auth';  // Importa la función de autenticación

function DashboardCrypto() {
  const router = useRouter();

  React.useEffect(() => {
    // Verifica si el usuario está autenticado
    if (!isAuthenticated()) {
      router.push('/signin');  // Redirige al login si no está autenticado
    }
  }, []);

  return (
    <div className='conatainer-art'>
      <h1>Hola, bienvenido al dashboard de Minería</h1>
    </div>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;