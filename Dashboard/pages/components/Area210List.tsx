import { useRouter } from "next/router";
import React from "react";
import { Artactividad } from "../../src/services/ArtactividadService";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ArtactividadListProps {
    artactividades: Artactividad[];
    onEliminar?: (id: number) => void; // Opcional, si no lo usas, puedes eliminarlo
    onEditar?: (artactividad: Artactividad) => void; // Opcional, si no lo usas, puedes eliminarlo
}

const Area210List: React.FC<ArtactividadListProps> = ({ artactividades }) => {
    const router = useRouter();

    const handleMostrarActividades = (artactividadId: number) => {
        if (!artactividadId) {
            console.error("ID de actividad no válido");
            return;
        }
        // Navegar a la página de detalles de la actividad
        router.push(`/management/actividad210/${artactividadId}`);
    };

    return (
        <div>
            {artactividades.map((artactividad) => {
                if (!artactividad.id) {
                    console.error("Actividad sin ID válido", artactividad);
                    return null; // Omitir actividades sin ID
                }

                return (
                    <div key={artactividad.id} className="border p-4 mb-2 rounded shadow">
                        <h4 className="font-bold">{artactividad.nombre}</h4>

                        <div className="mt-2">
                            <div style={{ width: "100%", paddingBottom: "1em", paddingTop: "1em", display: "flex", justifyContent: "flex-start" }}>
                                <Button
                                    style={{ marginRight: "2em" }}
                                    variant="contained"
                                    startIcon={<VisibilityIcon />}
                                    onClick={() => handleMostrarActividades(artactividad.id)}
                                    aria-label={`Mostrar actividades de ${artactividad.nombre}`}
                                >
                                    Mostrar Actividades
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(Area210List); // Optimización para evitar renderizados innecesarios