import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { Header } from "../Components/Header/Header";
import { Main } from "../Components/Main/Main";
import { Searchbar } from "../Components/SearchBar/Searchbar";

const ApiUrl = "https://api.github.com/users/octocat";

const Layout = () => {
  const [userData, setUserData] = useState(null);

  const getUserInfo = async () => {
    const res = await axios.get(`${ApiUrl}`);
    setUserData(res.data)
  };

  useEffect(() => {
    getUserInfo();
  }, [])

  return (
    <div className="Layout">
      <Header />
      <Searchbar />
      <Main data={userData} />
    </div>
  );
};

export default Layout;
