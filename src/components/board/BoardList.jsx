import axios from "axios";
import "./style/Board.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "./posts/Posts";
import Pagination from "./posts/Pagination";
import { BACK_URL } from "../../config";

const BoardList = ({ lcategory, mcategory, boardList, setBoardList }) => {
  const [limit, setLimit] = useState(20); // 한 페이지당 보여줄 리스트
  const [page, setPage] = useState(1); // 현재 페이지
  const navigate = useNavigate();
  boardList.sort(function (a, b) {
    return b.id - a.id;
  });
  const boardTitle = {
    "stock/dsi": "한국 증시",
    "stock/osi": "미국 증시",
    "coin/ci": "암호화폐",
    "coin/b": "코인 게시판",
    "community/fb": "유머&잡담",
    "community/hot": "인기글",
    "community/pro": "전문가의 방",
  };
  const registerd = () => {
    if (sessionStorage.getItem("logined") || false) {
      navigate("/Board/" + lcategory + "/" + mcategory + "/post/");
    } else if (sessionStorage.getItem("logined") || true) {
      alert("로그인 해주세요");
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `${BACK_URL}` + lcategory + "/" + mcategory + "/get",
          method: "GET",
        });
        setBoardList(data.data);
        console.log(boardList);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <div class="Board">
      <div className="BoardDiv">
        <h1> {boardTitle[lcategory + "/" + mcategory]}</h1>
        <button
          className="BoardListbutton"
          onClick={() => {
            registerd();
          }}
        >
          + 글 쓰기
        </button>
      </div>
      <div className="BoardTitel">
        <table class="tbl_type">
          <thead>
            <tr className="BoardTr">
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">글쓴이</th>
              <th scope="col">날짜</th>
              <th scope="col">조회수</th>
            </tr>
          </thead>
          {/* <tbody className="BoardTbody">
            {boardList.map((data) => (
              <tr key={data.id}>
                <td> {data.id}</td>
                <td>
                  <a
                    href={
                      "/Board/" +
                      lcategory +
                      "/" +
                      mcategory +
                      "/detail/" +
                      data.id
                    }
                  >
                    {data.subject}
                  </a>
                </td>
                <td> {data.author}</td>
                <td> {data.date}</td>
                <td> {data.views}</td>
              </tr>
            ))}
          </tbody> */}
          <Posts
            boardList={boardList}
            lcategory={lcategory}
            mcategory={mcategory}
            limit={limit}
            page={page}
          />
        </table>
      </div>
      <Pagination
        total={boardList.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default BoardList;
