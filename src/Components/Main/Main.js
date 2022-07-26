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

export const Main = ({ data }) => {
  return (
    <div className="main-container">
      {data ? (
        <React.Fragment>
          <img src={data.avatar_url} alt="" className="logo" />
          <div className="main-data">
            <div className="data-header">
              <p className="title">{data.name?data.name : data.login}</p>
              <p className="data-time">
                Joined {dateFormatter(data.created_at)}
              </p>
            </div>
            <p className="title1">@octocat</p>
            <p className="title2">
              {data.bio ? data.bio : "This profile has no bio"}
            </p>
            <div className="data-body">
              <span>Repos</span>
              <span>Followers</span>
              <span>Following</span>
              <a className="calculated-data" href={data.repos_url} target="_blank">{data.public_repos}</a>
              <a className="calculated-data" href={data.followers_url} target="_blank">{data.followers}</a>
              <a className="calculated-data" href={data.following_url} target="_blank">{data.following}</a>
            </div>
            <div className="data-footer">
              <span className="footer">
                <LocationIcon className="icons" />
                {data.location}
              </span>
              <a className="footer">
                <TwitterIcon className="icons"  href={data.twitter_username} target="_blank" />
                {data.twitter_username
                  ? data.twitter_username
                  : "Not available"}
              </a>
              <a className="footer" href={data.blog} target="_blank">
                <WebIcon className="icons" />
                {data.blog}
              </a>
              <a className="footer"  href={data.company} target="_blank">
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
