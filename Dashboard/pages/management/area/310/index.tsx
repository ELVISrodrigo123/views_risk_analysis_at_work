import React from "react";
import DrawerAppBar from "@/content/principal/components/navbar";
import EspesadoresContainer from "pages/containers/EspesadoresContainer";

interface Props {
    areas: any[];
}

const Espesadores: React.FC<Props> = () => {
    return (
        <>
            <DrawerAppBar />
            <div style={{ marginTop: "3em", padding: "3em" }}>
                <EspesadoresContainer />
            </div>
        </>
    );
};

export default Espesadores;
