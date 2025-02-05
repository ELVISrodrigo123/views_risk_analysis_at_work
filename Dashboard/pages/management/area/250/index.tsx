import React from "react";
import DrawerAppBar from "@/content/principal/components/navbar";
import FlotacionZincContainer from "pages/containers/FlotacionZincContainer";

interface Props {
    areas: any[]; // Ajusta el tipo según sea necesario
}

const FlotacionZinc: React.FC<Props> = () => {
    return (
        <>
            <DrawerAppBar />
            <div style={{ marginTop: "3em", padding: "3em" }}>
                <FlotacionZincContainer />
            </div>
        </>
    );
};

export default FlotacionZinc;
