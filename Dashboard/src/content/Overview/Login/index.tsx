import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const WelcomeText = () => {
    const text = "BIENVENIDO A MINERA SAN CRISTOBAL S.A.";
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 70);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            textAlign="center"
        >
            <Typography variant="h3" color="primary" fontWeight="bold">
                {displayedText}
            </Typography>
        </Box>
    );
};

export default WelcomeText;
