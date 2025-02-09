import React from "react";
import { Area } from "../../src/models/Area";
import { Button, Card, CardContent, Typography } from "@mui/material";

interface Props {
    areas: Area[];
    onEliminar?: (id: number) => void; // Opcional
    onEditar?: (area: Area) => void; // Opcional
}

const AreaList: React.FC<Props> = ({ areas, onEliminar, onEditar }) => {
    if (!areas || areas.length === 0) {
        return <p>No hay áreas disponibles.</p>;
    }

    return (
        <div>
            {areas.map((area) => (
                <Card key={area.id} style={{ marginBottom: "10px" }}>
                    <CardContent>
                        <Typography variant="h6">
                            {area.artactividad?.nombre} - {area.opcion_display || "Sin opción"}
                        </Typography>
                        {onEliminar && (
                            <Button variant="contained" color="secondary" onClick={() => onEliminar(area.id)} style={{ marginRight: "2em" }}>
                                Eliminar
                            </Button>
                        )}
                        {onEditar && (
                            <Button variant="contained" color="primary" onClick={() => onEditar(area)}>
                                Editar
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AreaList;