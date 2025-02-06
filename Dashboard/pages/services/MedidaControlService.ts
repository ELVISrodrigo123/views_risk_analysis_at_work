import axios from "axios";
import { MedidaControl } from "../models/MedidaControl";

const API_URL = "http://msc.sa.elvisrodrigo.com:8000/api/";

export const getMedidasControlPorActividad = async (actividadId: number): Promise<MedidaControl[]> => {
    try {
        const response = await axios.get(`${API_URL}/actividad/${actividadId}/medidascontrol/`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener las medidas de control:", error);
        return [];
    }
};
