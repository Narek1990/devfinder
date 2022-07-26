import React from "react";
import "./style.css";
import LightMode from "../../resources/icons/IconSun";
import DarkMode from "../../resources/icons/IconMoon";
export const Header = ({ displayMode, setDisplayMode }) => {
  return (
    <div className="header">
      <p className="hleft">devfinder</p>
      {displayMode === "Dark" ? (
        <div className="hright" onClick={() => setDisplayMode("Light")}>
          <p>LIGHT</p>

          <LightMode />
        </div>
      ) : (
        <div className="hright" onClick={() => setDisplayMode("Dark")}>
          <p>Dark</p>

          <DarkMode />
        </div>
      )}
    </div>
  );
};
