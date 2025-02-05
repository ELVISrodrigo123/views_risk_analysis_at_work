import React from "react";
import DrawerAppBar from "@/content/principal/components/navbar";
import ChancadoContainer from "pages/containers/ChancadoContainer";

interface Props {
    areas: any[]; // Ajusta el tipo según sea necesario
}

const Chancado: React.FC<Props> = () => {
    return (
        <>
            <DrawerAppBar />
            <div style={{ marginTop: "3em", padding: "3em" }}>
                <ChancadoContainer />
            </div>
        </>
    );
};

export default Chancado;
