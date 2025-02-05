import React from "react";
import DrawerAppBar from "@/content/principal/components/navbar";
import ReactivosContainer from "pages/containers/ReactivosContainer";

interface Props {
    areas: any[]; 
}

const Reactivos: React.FC<Props> = () => {
    return (
        <>
            <DrawerAppBar />
            <div style={{ marginTop: "3em", padding: "3em" }}>
                <ReactivosContainer />
            </div>
        </>
    );
};

export default Reactivos;
