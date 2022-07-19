import React from "react";
import "./style.css";
import LocationIcon from "../../resources/icons/IconLocation";
import TwitterIcon from "../../resources/icons/IconTwitter";
import WebIcon from "../../resources/icons/IconWebsite";
import CompanyIcon from "../../resources/icons/IconCompany";




const dateFormatter = (date) => {
  return new Date(date).toDateString()
}


export const Main = ({ data }) => {
  return <div className="main-container">
    
    {data ? (
    
      <React.Fragment>
        
        <img src={data.avatar_url} alt="" className="logo" />
        <div className="main-data">
          <div className="data-header">
            <p className="title">{data.name}</p>
            <p className="data-time">Joined {dateFormatter(data.created_at)}</p>

          </div>
          <p className="title1">@octocat</p>
          <p className="title2">{data.bio? data.bio : "This profile has no bio"}</p>
          <div className="data-body">
            <span>Repos</span>
            <span>Followers</span>
            <span>Following</span>
            <span className="calculated-data">{data.public_repos}</span>
            <span className="calculated-data">{data.followers}</span>
            <span className="calculated-data">{data.following}</span>
          </div>
          <div className="data-footer">
            <span className="footer"><LocationIcon className="icons" />{data.location}</span>
            <span className="footer"><TwitterIcon className="icons" />{data.twitter_username ? data.twitter_username : 'Not available'}</span>
            <span className="footer"><WebIcon className="icons" />{data.blog}</span>
            <span className="footer"><CompanyIcon className="icons" />{data.company}</span>
          </div>
        </div>
      </React.Fragment>
    ) : null}
  </div>
};
