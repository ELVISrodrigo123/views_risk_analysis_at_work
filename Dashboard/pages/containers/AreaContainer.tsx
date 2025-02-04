import React, { useEffect, useState } from "react";
import AreaService from "../services/AreaService";
import { Area } from "../models/Area";
import AreaList from "../components/AreaList";
import AreaForm from "../components/AreaForm";

const AreaContainer: React.FC = () => {
    const [areas, setAreas] = useState<Area[]>([]);
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);

    useEffect(() => {
        cargarAreas();
    }, []);

    const cargarAreas = async () => {
        const data = await AreaService.listarTodos();
        setAreas(data);
    };

    const manejarCrear = async (nuevaArea: Omit<Area, "id">) => {
        await AreaService.crearArea(nuevaArea);
        cargarAreas();
    };

    const manejarEliminar = async (id: number) => {
        await AreaService.eliminarArea(id);
        cargarAreas();
    };

    return (
        <div>
            <h1>Área Chancado 210</h1>
            <AreaForm onSubmit={manejarCrear} areaSeleccionada={selectedArea} resetSeleccion={() => setSelectedArea(null)} />
            <AreaList areas={areas} onEliminar={manejarEliminar} onEditar={setSelectedArea} />
        </div>
    );
};

export default AreaContainer;
