import React from "react";
import "./style.css";
import LocationIcon from "../../resources/icons/IconLocation";
import TwitterIcon from "../../resources/icons/IconTwitter";
import WebIcon from "../../resources/icons/IconWebsite";
import CompanyIcon from "../../resources/icons/IconCompany";

const dateFormatter = (date) => {
  return new Date(date)
    .toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    .replace(/,/g, "");
};

export const Main = ({ data,displayMode, setDisplayMode}) => {  
  return (
    <div className={`${displayMode === "Dark" ? "main-container" : "main-containerlight"}`}>   
      {data ? (
        <React.Fragment>
          <img src={data.avatar_url} alt="" className="logo" />
          <div className="main-data">
            <div className="data-header">
              <p className="title">{data.name ? data.name : data.login}</p>
              <p className="data-time">
                Joined {dateFormatter(data.created_at)}
              </p>
            </div>
            <p className="title1">@octocat</p>
            <p className="title2">
              {data.bio ? data.bio : "This profile has no bio"}
            </p>
            <div className={`${displayMode === "Dark" ? "data-body" : "data-bodylight"}`}>
              <span>Repos</span>
              <span>Followers</span>
              <span>Following</span>
              <p className="calculated-data">{data.public_repos}</p>
              <p className="calculated-data">{data.followers}</p>
              <p className="calculated-data">{data.following}</p>
            </div>
            <div className={`${displayMode === "Dark" ? "data-footer" : "data-footerlight"}`}>
              <span className="footer">
                <LocationIcon className="icons" />
                {data.location}
              </span>
              <a className="footer">
                <TwitterIcon
                  className="icons"
                  href={data.twitter_username}
                  target="_blank"
                />
                {data.twitter_username
                  ? data.twitter_username
                  : "Not available"}
              </a>
              <a className="footer" href={data.blog} target="_blank">
                <WebIcon className="icons" />
                {data.blog}
              </a>
              <a className="footer" href={data.company} target="_blank">
                <CompanyIcon className="icons" />
                {data.company}
              </a>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  
  );
};
