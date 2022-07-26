import React from "react";
import "./style.css";
import LightMode from "../../resources/icons/IconSun";
import DarkMode from "../../resources/icons/IconMoon";
export const Header = ({ displayMode, setDisplayMode }) => {
  return (
    <div className="header">
      <p className={`${displayMode === "Dark" ? "hleft" : "hleftlight"}`}>
        devfinder
      </p>
      {displayMode === "Dark" ? (
        <div
          className={`${displayMode === "Dark" ? "hright" : "hrightlight"}`}
          onClick={() => setDisplayMode("Light")}
        >
          <p>Dark</p>

          <LightMode />
        </div>
      ) : (
        <div
          className={`${displayMode === "Dark" ? "hright" : "hrightlight"}`}
          onClick={() => setDisplayMode("Dark")}
        >
          <p>LIGHT</p>

          <DarkMode />
        </div>
      )}
    </div>
  );
};
