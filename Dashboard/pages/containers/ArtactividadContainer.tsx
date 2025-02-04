import React, { useEffect, useState } from 'react';
import ArtactividadService, { Artactividad } from '../services/ArtactividadService';
import ArtactividadList from '../components/ArtactividadList';
import ArtactividadForm from '../components/ArtactividadForm';

const ArtactividadContainer: React.FC = () => {
  const [artactividades, setArtactividades] = useState<Artactividad[]>([]);
  const [selectedArtactividad, setSelectedArtactividad] = useState<Artactividad | null>(null);

  useEffect(() => {
    cargarArtactividades();
  }, []);

  const cargarArtactividades = async () => {
    try {
      const data = await ArtactividadService.listarTodos();
      // Aseguramos que siempre sea un arreglo, incluso si la respuesta es vacía o no es un arreglo
      setArtactividades(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al cargar las actividades:', error);
    }
  };

  const manejarCrear = async (nuevoArtactividad: Artactividad) => {
    await ArtactividadService.crearArtactividad(nuevoArtactividad);
    cargarArtactividades();
  };

  const manejarActualizar = async (id: number, datosActualizados: Artactividad) => {
    await ArtactividadService.actualizarArtactividad(id, datosActualizados);
    cargarArtactividades();
    setSelectedArtactividad(null);
  };

  const manejarEliminar = async (id: number) => {
    await ArtactividadService.eliminarArtactividad(id);
    cargarArtactividades();
  };

  return (
    <div className="p-4">
      <h1 style={{ paddingBottom: '2rem' }} className="text-2xl font-bold mb-4">
        ANALISIS DE RIEGO EN EL TRABAJO (ART)
      </h1>
      <ArtactividadForm
        onSubmit={manejarCrear}
        artactividadSeleccionada={selectedArtactividad}
        onUpdate={manejarActualizar}
        resetSeleccion={() => setSelectedArtactividad(null)}
      />
      {/* Verificamos que artactividades sea un arreglo antes de hacer map */}
      <ArtactividadList
        artactividades={Array.isArray(artactividades) ? artactividades : []}
        onEliminar={manejarEliminar}
        onEditar={setSelectedArtactividad}
      />
    </div>
  );
};

export default ArtactividadContainer;

