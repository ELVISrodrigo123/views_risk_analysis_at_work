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

            // Obtener datos de peligros, riesgos y medidas en paralelo
            const peligrosPromises = data.map((actividad) => Actividad210Service.getPeligrosByActividadId(actividad.id));
            const riesgosPromises = data.map((actividad) => Actividad210Service.getRiesgosByActividadId(actividad.id));
            const medidasPromises = data.map((actividad) => Actividad210Service.getMedidasByActividadId(actividad.id));

            const [peligrosData, riesgosData, medidasData] = await Promise.all([
                Promise.all(peligrosPromises),
                Promise.all(riesgosPromises),
                Promise.all(medidasPromises)
            ]);

            // Construir objetos para actualizar el estado correctamente
            const peligrosMap: { [key: number]: Peligro[] } = {};
            const riesgosMap: { [key: number]: Riesgo[] } = {};
            const medidasMap: { [key: number]: MedidaControl[] } = {};

            data.forEach((actividad, index) => {
                peligrosMap[actividad.id] = peligrosData[index] || [];
                riesgosMap[actividad.id] = riesgosData[index] || [];
                medidasMap[actividad.id] = medidasData[index] || [];
            });

            // Actualizar el estado en un solo paso
            setPeligros(peligrosMap);
            setRiesgos(riesgosMap);
            setMedidas(medidasMap);
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
                                    <strong>Peligros:</strong>
                                    <ul>
                                        {peligros[actividad.id]?.length > 0
                                            ? peligros[actividad.id].map((p) => <li key={p.id}>{p.descripcion}</li>)
                                            : <li>No hay peligros</li>
                                        }
                                    </ul>
                                </p>
                                <p style={{ color: "green" }}>
                                    <strong>Riesgos:</strong>
                                    <ul>
                                        {riesgos[actividad.id]?.length > 0
                                            ? riesgos[actividad.id].map((r) => <li key={r.id}>{r.descripcion}</li>)
                                            : <li>No hay riesgos</li>
                                        }
                                    </ul>
                                </p>
                                <p style={{ color: "blue" }}>
                                    <strong>Medidas de Control:</strong>
                                    <ul>
                                        {medidas[actividad.id]?.length > 0
                                            ? medidas[actividad.id].map((m) => <li key={m.id}>{m.descripcion}</li>)
                                            : <li>No hay medidas de control</li>
                                        }
                                    </ul>
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
