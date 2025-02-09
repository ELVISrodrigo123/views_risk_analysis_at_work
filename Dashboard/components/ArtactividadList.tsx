import { useRouter } from "next/router";
import React from "react";
import { Artactividad } from "../src/services/ArtactividadService";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ArtactividadListProps {
  artactividades: Artactividad[];
  onEliminar: (id: number) => void;
  onEditar: (artactividad: Artactividad) => void;
}

const ArtactividadList: React.FC<ArtactividadListProps> = ({ artactividades, onEliminar, onEditar }) => {
  const router = useRouter();

  const handleMostrarActividades = (artactividadId: number) => {
    router.push(`/management/actividades/${artactividadId}`);
  };

  return (
    <div>
      {artactividades.map((artactividad) => (
        <div key={artactividad.id} className="border p-4 mb-2 rounded shadow">
          <h4 className="font-bold">{artactividad.nombre}</h4>

          <div className="mt-2">
            <div style={{ width: "100%", paddingBottom: "1em", paddingTop: "1em", display: "flex", justifyContent: "flex-start" }}>
              <Button
                style={{ marginRight: "2em" }}
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => onEditar(artactividad)}
                className="bg-yellow-500 text-white px-4 py-5 rounded mr-2 art-button"
              >
                Editar
              </Button>
              <Button
                style={{ marginRight: "2em" }}
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => onEliminar(artactividad.id!)}
                className="bg-red-500 text-white px-4 py-2 rounded art-button"
              >
                Eliminar
              </Button>
              <Button
                style={{ marginRight: "2em" }}
                variant="contained"
                startIcon={<VisibilityIcon />}
                onClick={() => handleMostrarActividades(artactividad.id!)}
              >
                Mostrar Actividades
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtactividadList;
