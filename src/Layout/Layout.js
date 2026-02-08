import React, { useState } from "react";
import "./style.css";
import { Header } from "../Components/Header/Header";
import { Bathroom } from "../Components/Bathroom/Bathroom";

const Layout = () => {
  const [displayMode, setDisplayMode] = useState("Dark");

  return (
    <div className={`${displayMode === "Dark" ? "Layout" : "Layoutlight"}`}>
      <div className="wrapper">
        <Header displayMode={displayMode} setDisplayMode={setDisplayMode} />
        <Bathroom displayMode={displayMode} />
      </div>
    </div>
  );
};

export default Layout;
