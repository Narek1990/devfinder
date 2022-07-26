import React from "react";
import "./style.css";
import LightMode from "../../resources/icons/IconSun";
import DarkMode from "../../resources/icons/IconMoon";
export const Header = () => {
  return (
    <div className="header">
      <p className="hleft">devfinder</p>
      <div className="hright">
        <p >LIGHT</p>
        <p >
          <LightMode/>
         
        </p>
      </div>
    </div>
  );
};
