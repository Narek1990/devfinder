import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { Header } from "../Components/Header/Header";
import { Main } from "../Components/Main/Main";
import { Searchbar } from "../Components/SearchBar/Searchbar";

const ApiUrl = "https://api.github.com/users/";

const Layout = () => {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("octocat");
  const [displayMode, setDisplayMode] = useState("Dark");

  const getUserInfo = async () => {
    const res = await axios.get(`${ApiUrl}${userName}`);
    setUserData(res.data);
  };

  useEffect(() => {
    getUserInfo();
  }, [userName]);

  return (
    <div className={`${displayMode === "Dark" ? "Layout" : "Layoutlight"}`}>
      <div className="wrapper">
        <Header displayMode={displayMode} setDisplayMode={setDisplayMode} />
        <Searchbar setUserName={setUserName} displayMode={displayMode} setDisplayMode={setDisplayMode} />
        <Main data={userData} displayMode={displayMode} setDisplayMode={setDisplayMode}/>
      </div>
    </div>
  );
};

export default Layout;
