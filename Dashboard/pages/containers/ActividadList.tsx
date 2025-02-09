import React, { useEffect, useState } from "react";
import ActividadService from "../../src/services/ActividadService";
import { Actividad } from "../../src/models/ActividadModel";

const ActividadList: React.FC = () => {
    const [actividades, setActividades] = useState<Actividad[]>([]);

    useEffect(() => {
        ActividadService.getAll().then(setActividades);
    }, []);

    return (
        <div>
            <h2>Lista de Actividades</h2>
            <ul>
                {actividades.map((actividad) => (
                    <li key={actividad.id}>
                        <strong>{actividad.nombre}</strong> - {actividad.descripcion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActividadList;
