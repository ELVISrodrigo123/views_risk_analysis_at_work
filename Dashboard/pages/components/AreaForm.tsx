import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { Area } from "../models/Area";
import ArtactividadService from "../services/ArtactividadService";

interface Artactividad {
    id: number;
    nombre: string;
}

interface Props {
    onSubmit: (area: Omit<Area, "id">) => void;
    areaSeleccionada?: Area | null;
    resetSeleccion: () => void;
}

const opciones = [
    { value: "210", label: "210-CHANCADO" },
    { value: "220", label: "220-DOMO" },
    { value: "230", label: "230-MOLIENDA" },
    { value: "240", label: "240-FLOTACION PLOMO" },
    { value: "250", label: "250-FLOTACION ZINC" },
    { value: "270", label: "270-REACTIVOS" },
    { value: "310", label: "310-ESPESADORES" },
    { value: "320", label: "320-FILTROS" },
    { value: "330", label: "330-CARGUIO" },
];

const AreaForm: React.FC<Props> = ({ onSubmit, areaSeleccionada, resetSeleccion }) => {
    const [area, setArea] = useState<Omit<Area, "id">>({
        artactividad: { id: 0, nombre: "" },
        opcion: "",
    });

    const [artactividades, setArtactividades] = useState<Artactividad[]>([]);

    useEffect(() => {
        ArtactividadService.listarTodos()
            .then((data: Artactividad[]) => {
                if (Array.isArray(data)) {
                    setArtactividades(data);
                } else {
                    console.error("Error: La API no devolvió un array de actividades.");
                }
            })
            .catch((err) => console.error("Error al listar actividades:", err));
    }, []);

    useEffect(() => {
        if (areaSeleccionada) {
            setArea({
                artactividad: areaSeleccionada.artactividad,
                opcion: areaSeleccionada.opcion || "",
            });
        } else {
            setArea({ artactividad: { id: 0, nombre: "" }, opcion: "" });
        }
    }, [areaSeleccionada]);

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setArea((prev) => ({
            ...prev,
            [name]:
                name === "artactividad"
                    ? { ...prev.artactividad, id: Number(value) }
                    : value,
        }));
    };

    const manejarEnvio = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(area);
        resetSeleccion();
        setArea({ artactividad: { id: 0, nombre: "" }, opcion: "" });
    };

    return (
        <form onSubmit={manejarEnvio} style={{ display: "flex", flexDirection: "column", gap: "10px", paddingBottom:"2em" }}>
            <TextField
                select
                label="Actividad"
                name="artactividad"
                value={area.artactividad.id}
                onChange={manejarCambio}
                required
            >
                {artactividades.map((art) => (
                    <MenuItem key={art.id} value={art.id}>
                        {art.nombre}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Área"
                name="opcion"
                value={area.opcion}
                onChange={manejarCambio}
                required
            >
                {opciones.map((op) => (
                    <MenuItem key={op.value} value={op.value}>
                        {op.label}
                    </MenuItem>
                ))}
            </TextField>

            <Button type="submit" variant="contained" color="primary">
                {areaSeleccionada ? "Actualizar" : "Crear"}
            </Button>
        </form>
    );
};

export default AreaForm;
