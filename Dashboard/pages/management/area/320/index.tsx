import React from "react";
import DrawerAppBar from "@/content/principal/components/navbar";
import FiltrosContainer from "pages/containers/FiltrosContainer";

interface Props {
    areas: any[];
}

const Filtros: React.FC<Props> = () => {
    return (
        <>
            <DrawerAppBar />
            <div style={{ marginTop: "3em", padding: "3em" }}>
                <FiltrosContainer />
            </div>
        </>
    );
};

export default Filtros;
