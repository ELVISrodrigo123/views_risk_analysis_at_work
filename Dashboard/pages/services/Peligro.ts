import axios from "axios";

const API_URL = "http://localhost:8000/api/actividad";

interface Actividad {
    id: number;
    nombre: string;
}

interface Peligro {
    id: number;
    descripcion: string;
    actividad: Actividad;
}

export const getPeligrosByActividad = async (actividadId: number): Promise<Peligro[]> => {
    try {
        const response = await axios.get<Peligro[]>(`${API_URL}/${actividadId}/peligros/`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los peligros:", error);
        return [];
    }
};
