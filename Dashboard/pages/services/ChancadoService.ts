import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/artactividad/';

const ChancadoServices = {
    listarTodos: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },
    listarPorArea: async (area: string) => {
        const response = await axios.get(`${API_URL}?area=${area}`);
        return response.data;
    },
    eliminarArtactividad: async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
    },
};

export default ChancadoServices;