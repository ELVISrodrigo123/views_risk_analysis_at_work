import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Actividad210Service from "../../services/Actividad210Service";
import { Actividad } from "../../models/ActividadModel";
import Box from "@mui/material/Box";

interface Peligro {
    id: number;
    descripcion: string;
}

interface Riesgo {
    id: number;
    descripcion: string;
}

interface MedidaControl {
    id: number;
    descripcion: string;
}

const Actividad210index = () => {
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [peligros, setPeligros] = useState<{ [key: number]: Peligro[] }>({});
    const [riesgos, setRiesgos] = useState<{ [key: number]: Riesgo[] }>({});
    const [medidas, setMedidas] = useState<{ [key: number]: MedidaControl[] }>({});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const artactividadId = Number(id);
            loadActividades(artactividadId);
        }
    }, [id]);

    const loadActividades = async (artactividadId: number) => {
        try {
            const data = await Actividad210Service.getByArtactividadId(artactividadId);
            setActividades(data);
            data.forEach(async (actividad) => {
                const peligrosData = await Actividad210Service.getPeligrosByActividadId(actividad.id);
                const riesgosData = await Actividad210Service.getRiesgosByActividadId(actividad.id);
                const medidasData = await Actividad210Service.getMedidasByActividadId(actividad.id);
                setPeligros((prev) => ({ ...prev, [actividad.id]: peligrosData }));
                setRiesgos((prev) => ({ ...prev, [actividad.id]: riesgosData }));
                setMedidas((prev) => ({ ...prev, [actividad.id]: medidasData }));
            });
        } catch (error) {
            console.error("Error cargando actividades:", error);
            setActividades([]);
        }
    };

    return (
        <div style={{ padding: "3em" }}>
            <h1>Actividades del ART #{id}</h1>
            {actividades.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {actividades.map((actividad) => (
                        <li key={actividad.id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                            <strong>{actividad.nombre} - {actividad.descripcion}</strong>
                            <Box>
                                <p style={{ color: "red" }}>
                                    <strong>Peligros:</strong> {peligros[actividad.id]?.map((p) => p.descripcion).join(", ") || "No hay peligros"}
                                </p>
                                <p style={{ color: "green" }}>
                                    <strong>Riesgos:</strong> {riesgos[actividad.id]?.map((r) => r.descripcion).join(", ") || "No hay riesgos"}
                                </p>
                                <p style={{ color: "blue" }}>
                                    <strong>Medidas de Control:</strong> {medidas[actividad.id]?.map((m) => m.descripcion).join(", ") || "No hay medidas de control"}
                                </p>
                            </Box>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay actividades registradas para este ART.</p>
            )}
        </div>
    );
};

export default Actividad210index;
