import React from "react";
import "./style.css";
import DisplayMode from "../../resources/icons/IconSun";
export const Header = () => {
  return (
    <div className="header">
      <p className="hleft">devfinder</p>
      <div className="hright">
        <p className="hright">LIGHT</p>
        <p>
          <DisplayMode />
        </p>
      </div>
    </div>
  );
};
