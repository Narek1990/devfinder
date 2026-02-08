import React from "react";
import "./style.css";
import LightMode from "../../resources/icons/IconSun";
import DarkMode from "../../resources/icons/IconMoon";
export const Header = ({ displayMode, setDisplayMode }) => {
  return (
    <div className="header">
      <p className={`${displayMode === "Dark" ? "hleft" : "hleftlight"}`}>
        bathroom materials
      </p>
      {displayMode === "Dark" ? (
        <div
          className={`${displayMode === "Dark" ? "hright" : "hrightlight"}`}
          onClick={() => setDisplayMode("Light")}
        >
          <p>LIGHT</p>

          <LightMode />
        </div>
      ) : (
        <div
          className={`${displayMode === "Dark" ? "hright" : "hrightlight"}`}
          onClick={() => setDisplayMode("Dark")}>
          <p>DARK</p>

          <DarkMode />
        </div>
      )}
    </div>
  );
};
