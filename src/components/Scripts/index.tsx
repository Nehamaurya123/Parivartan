import React, { FC, useEffect } from "react";
import { Config } from "../../Config";

const ScriptsComponent: FC<any> = ({ onLoad }) => {
  useEffect(() => {
    const scriptElem = document.createElement("script");
    scriptElem.src = `https://maps.googleapis.com/maps/api/js`;
    // scriptElem.src = `https://maps.googleapis.com/maps/api/js?key=${Config.MAP_API_KEY}`;
    scriptElem.addEventListener("load", () => {});
    scriptElem.addEventListener("error", () => {});
    document.body.appendChild(scriptElem);
  }, []);

  return <div></div>;
};

export default ScriptsComponent;