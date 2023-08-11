import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./css/AllQuestions.css";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { stringAvatar } from "../../utils/Avatar";

function AllQuestions({ data }) {
  let tags = JSON.parse(data?.tags[0]);
  // console.log(data?.tags[0]);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  //  const tags=[];
  
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>votes</span>
            </div>
            <div className="all-option">
              <p>{data?.answerDetails?.length}</p>
              <span>answers</span>
            </div>
            <div className="all-option">
              <small>2 views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/question?q=${data?._id}`}>{data?.title}</Link>

          {/* <a href=>{data.title}</a> */}

          <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div>{ReactHtmlParser(truncate(data.body, 200))}</div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            {tags.map((_tag) => (
              <p
                style={{
                  margin: "10px 5px",
                  padding: "5px 10px",
                  backgroundColor: "#007cd446",
                  borderRadius: "3px",
                }}
              >
                {_tag}
              </p>
            ))}
          </div>
          <div className="author">
            <small>{new Date(data?.created_at).toLocaleString()}</small>
            <div className="auth-details">
               {/* i have to src={data?user?.photo} */}
              <Avatar src= {(data?.user?.photo)} />
              <p>
                {data?.user?.displayName? data?.user?.displayName: String 
                (data?.user?.email).split('@')[0]} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;