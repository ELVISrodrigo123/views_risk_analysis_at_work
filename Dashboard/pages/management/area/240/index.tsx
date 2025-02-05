import React from "react";
import DrawerAppBar from "@/content/principal/components/navbar";
import FlotacionPlomoContainer from "pages/containers/FlotacionPlomoContainer";

interface Props {
    areas: any[];
}

const FlotacionPlomo: React.FC<Props> = () => {
    return (
        <>
            <DrawerAppBar />
            <div style={{ marginTop: "3em", padding: "3em" }}>
                <FlotacionPlomoContainer />
            </div>
        </>
    );
};

export default FlotacionPlomo;
