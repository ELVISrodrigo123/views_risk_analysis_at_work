import React from "react";
import DrawerAppBar from "@/content/principal/components/navbar";
import MoliendaContainer from "pages/containers/MoliendaContainer";

interface Props {
    areas: any[];
}

const Molienda: React.FC<Props> = () => {
    return (
        <>
            <DrawerAppBar />
            <div style={{ marginTop: "3em", padding: "3em" }}>
            <MoliendaContainer/>
            </div>
        </>
    );
};

export default Molienda;
