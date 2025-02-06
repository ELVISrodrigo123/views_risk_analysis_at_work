import axios from "axios";
import { Riesgo } from "../models/Riesgo";

const API_URL = "http://msc.sa.elvisrodrigo.com:8000/api/"; // Ajusta según tu configuración

export const getRiesgosPorActividad = async (actividadId: number): Promise<Riesgo[]> => {
    try {
        const response = await axios.get(`${API_URL}/actividad/${actividadId}/riesgos/`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los riesgos:", error);
        return [];
    }
};
