import React from "react";
import "./style.css";
import LocationIcon from "../../resources/icons/IconLocation";
import TwitterIcon from "../../resources/icons/IconTwitter";
import WebIcon from "../../resources/icons/IconWebsite";
import CompanyIcon from "../../resources/icons/IconCompany";


export const Main = () => {
  return <div className="main-container">
<img src="" alt="" className="logo"/>
<div className="main-data">
  
  <div className="data-header">
    <p className="title">The Octocat</p>
  <p className="data-time">Joined 25 Jan 2011</p>

</div>
<p className="title1">@octocat</p>
<p className="title2">This profile has no bio</p>
<div className="data-body">
<span>Repos</span>
<span>Followers</span>
<span>Following</span>
<span className="calculated-data">8</span>
<span className="calculated-data">3938</span>
<span className="calculated-data"></span>
  </div>
  <div className="data-footer">
 <span className="footer"><LocationIcon className="icons"/> Francisco</span>
 <span className="footer"><TwitterIcon className="icons"/>Not available</span>
 <span className="footer"><WebIcon className="icons"/>https://github.blog</span>
 <span className="footer"><CompanyIcon className="icons"/>@github</span>
  </div>
  </div>
  </div>
};
