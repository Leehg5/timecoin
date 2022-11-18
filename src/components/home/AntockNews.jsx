import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const AntockNews = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: "http://localhost:7999/board/community/pro/get3",
          method: "GET",
        });
        setBoardList(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  return (
    <>
      {/* 전문가 리포트 5개*5 */}
      {boardList.map((data) => (
        <div className="Newsimg">
          <a href={"/Board/community/pro/detail/" + data.id}>
            <img
              src="http://cdn.edujin.co.kr/news/photo/202105/35768_68227_247.jpg"
              alt=""
            />
          </a>
          <a href={"/Board/community/pro/detail/" + data.id}>{data.subject}</a>
        </div>
      ))}
    </>
  );
};

export default AntockNews;
