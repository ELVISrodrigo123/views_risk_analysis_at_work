import React from "react";
import DrawerAppBar from "@/content/principal/components/navbar";
import DomoContainer from "pages/containers/DomoContainer";

interface Props {
    areas: any[]; // Ajusta el tipo según sea necesario
}

const Domo: React.FC<Props> = () => {
    return (
        <>
            <DrawerAppBar />
            <div style={{ marginTop: "3em", padding: "3em" }}>
                <DomoContainer />
            </div>
        </>
    );
};

export default Domo;
