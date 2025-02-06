import { useState, useEffect } from "react";
import * as React from 'react';
import Principal from "@/content/principal/Principal";
import WelcomeText from "../Login";
function Hero() {
  const [showComponet, setShowComponet] = useState(false);

  useEffect(() => {

    const duration = 3000;

    window.setTimeout(() => {
      setShowComponet(true);
    }, duration);
  });

  return (
    <>
      {!showComponet ? (
        <Load />
      ) : (
        <div>
          <Principal />
        </div>
      )}
    </>
  );
}
function Load() {
  return (
    <>
    <WelcomeText/>
    </>
  );
}
export default Hero;

