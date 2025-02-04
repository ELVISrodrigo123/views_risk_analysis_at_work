import React, { useEffect, useState } from "react";
import { getRiesgosPorActividad } from "../services/RiesgoService";
import { Riesgo, Actividad } from "../models/Riesgo";

interface Props {
    actividadId: number;
}

const RiesgosContainer: React.FC<Props> = ({ actividadId }) => {
    const [riesgos, setRiesgos] = useState<Riesgo[]>([]);
    const [actividad, setActividad] = useState<Actividad | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRiesgos = async () => {
            try {
                const data = await getRiesgosPorActividad(actividadId);
                if (data.length > 0) {
                    setActividad(data[0].actividad);
                }
                setRiesgos(data);
            } catch (err) {
                setError("Hubo un error al cargar los riesgos.");
            } finally {
                setLoading(false);
            }
        };

        fetchRiesgos();
    }, [actividadId]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {actividad && <h2>Actividad: {actividad.nombre}</h2>}
            <ul>
                {riesgos.map((riesgo) => (
                    <li key={riesgo.id}>{riesgo.descripcion}</li>
                ))}
            </ul>
        </div>
    );
};

export default RiesgosContainer;
