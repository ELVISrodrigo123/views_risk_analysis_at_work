import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Actividad210Service from "../../services/Actividad210Service";
import { Actividad } from "../../models/ActividadModel";
import {
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Grid,
    IconButton,
    Skeleton
} from "@mui/material";
import { VolumeUp } from "@mui/icons-material";

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
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const artactividadId = Number(id);
            loadActividades(artactividadId);
        }
    }, [id]);

    const loadActividades = async (artactividadId: number) => {
        setLoading(true);
        try {
            const data = await Actividad210Service.getByArtactividadId(artactividadId);
            setActividades(data);

            const [peligrosData, riesgosData, medidasData] = await Promise.all([
                Promise.all(data.map(a => Actividad210Service.getPeligrosByActividadId(a.id))),
                Promise.all(data.map(a => Actividad210Service.getRiesgosByActividadId(a.id))),
                Promise.all(data.map(a => Actividad210Service.getMedidasByActividadId(a.id)))
            ]);

            const peligrosMap: { [key: number]: Peligro[] } = {};
            const riesgosMap: { [key: number]: Riesgo[] } = {};
            const medidasMap: { [key: number]: MedidaControl[] } = {};

            data.forEach((actividad, index) => {
                peligrosMap[actividad.id] = peligrosData[index] || [];
                riesgosMap[actividad.id] = riesgosData[index] || [];
                medidasMap[actividad.id] = medidasData[index] || [];
            });

            setPeligros(peligrosMap);
            setRiesgos(riesgosMap);
            setMedidas(medidasMap);
        } catch (error) {
            console.error("Error cargando actividades:", error);
            setActividades([]);
        }
        setLoading(false);
    };

    const leerTexto = (actividad: Actividad) => {
        if (!window.speechSynthesis) {
            alert("Tu navegador no soporta la síntesis de voz.");
            return;
        }

        window.speechSynthesis.cancel(); // Detener cualquier síntesis en curso
        const mensaje = new SpeechSynthesisUtterance();
        const voces = window.speechSynthesis.getVoices();
        mensaje.voice = voces.find(v => v.name.includes("Google español")) || null;
        mensaje.lang = "es-ES";
        mensaje.rate = 0.9;
        
        mensaje.text = `Actividad: ${actividad.nombre}. Peligros: ${peligros[actividad.id]?.map(p => p.descripcion).join(", ") || "No hay peligros"}. ` +
            `Riesgos: ${riesgos[actividad.id]?.map(r => r.descripcion).join(", ") || "No hay riesgos"}. ` +
            `Medidas de Control: ${medidas[actividad.id]?.map(m => m.descripcion).join(", ") || "No hay medidas de control"}.`;
        
        window.speechSynthesis.speak(mensaje);
    };

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>Actividades del ART #{id}</Typography>
            {loading ? (
                <CircularProgress />
            ) : actividades.length > 0 ? (
                <Grid container spacing={3}>
                    {actividades.map((actividad) => (
                        <Grid item xs={12} md={6} key={actividad.id}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Typography variant="h6">{actividad.nombre}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {actividad.descripcion}
                                    </Typography>
                                    <IconButton color="primary" onClick={() => leerTexto(actividad)}>
                                        <VolumeUp />
                                    </IconButton>
                                    <Box mt={2}>
                                        <Typography color="error"><strong>Peligros:</strong></Typography>
                                        {peligros[actividad.id]?.length ? (
                                            <ul style={{color:"#FF1943"}}>{peligros[actividad.id].map(p => <li key={p.id}>{p.descripcion}</li>)}</ul>
                                        ) : (<Skeleton width={100} />)}
                                        
                                        <Typography color="success.main"><strong>Riesgos:</strong></Typography>
                                        {riesgos[actividad.id]?.length ? (
                                            <ul style={{color:"#57CA22"}}>{riesgos[actividad.id].map(r => <li key={r.id}>{r.descripcion}</li>)}</ul>
                                        ) : (<Skeleton width={100} />)}
                                        
                                        <Typography color="primary"><strong>Medidas de Control:</strong></Typography>
                                        {medidas[actividad.id]?.length ? (
                                            <ul style={{color:"#5569ff"}}>{medidas[actividad.id].map(m => <li key={m.id}>{m.descripcion}</li>)}</ul>
                                        ) : (<Skeleton width={100} />)}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>No hay actividades registradas para este ART.</Typography>
            )}
        </Box>
    );
};

export default Actividad210index;