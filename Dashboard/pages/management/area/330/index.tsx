import React from "react";
import DrawerAppBar from "@/content/principal/components/navbar";
import CarguioContainer from "pages/containers/CarguioContainer";

interface Props {
    areas: any[];
}

const Carguio: React.FC<Props> = () => {
    return (
        <>
            <DrawerAppBar />
            <div style={{ marginTop: "3em", padding: "3em" }}>
                <CarguioContainer />
            </div>
        </>
    );
};

export default Carguio;
