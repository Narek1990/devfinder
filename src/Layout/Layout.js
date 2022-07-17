import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { Header } from "../Components/Header/Header";
import { Main } from "../Components/Main/Main";
import { Searchbar } from "../Components/SearchBar/Searchbar";

const ApiUrl = "https://api.github.com/users/";

const Layout = () => {
  const [userName, setUserName] = useState("octocat");

  const getUserInfo = async () => {
    const res = await axios.get(`${ApiUrl}${userName}`);
    const { data } = res;
  };

  useEffect(() => {
    getUserInfo();
  }, [userName]);

  return (
    <div className="Layout">
      <Header />
      <Searchbar />
      <Main />
    </div>
  );
};

export default Layout;
