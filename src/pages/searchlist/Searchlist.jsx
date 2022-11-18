import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Searchlist.scss";
import axios from "axios";

const Searchlist = () => {
  const location = useLocation();
  return (
    <div className="Searchlist">
      <div className="Searchlist_Div">
        <div className="Searchlist_Div1">
          {location.state.test.map((hhh) => (
            <div className="earchlistMain" key={hhh}>
              <div>
                {" "}
                <Link to={`../detailPage/${hhh.id}`} state={{ number: hhh.id }}>
                  {hhh.subject}
                </Link>
              </div>
              <div className="Searchlist_List">
                <div>{hhh.lcategory} 게시판</div>
                <div> | </div>
                <div>{hhh.author}</div>
                <div> | </div>
                <div>{hhh.date}</div>
                <div> | </div>
                <div>조회 {hhh.views}</div>
              </div>
              <div className="Searchlist_Link">
                <Link to={`../detailPage/${hhh.id}`} state={{ number: hhh.id }}>
                  {hhh.contents}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Searchlist;
