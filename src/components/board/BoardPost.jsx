import React, { useState, useEffect } from "react";
import "./style/BoardPost.scss";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const BoardPost = ({ lcategory, mcategory }) => {
  const [subject, setSubject] = useState("");
  const [author, setAuthor] = useState("");
  const [lonned, setLonned] = useState(false);
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  const post = async () => {
    try {
      const data = await axios({
        url:
          "http://localhost:7999/board/" +
          lcategory +
          "/" +
          mcategory +
          "/post",
        method: "POST",
        data: {
          subject: subject,
          contents: contents,
          author: author,
        },
      });
      if (data.data === true) {
        alert("작성완료");
        navigate(-1);
      } else if (data.data === false) {
        alert("실패");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const check = sessionStorage.getItem("logined") || false;
  useEffect(() => {
    if (check) {
      setLonned(sessionStorage.getItem("user"));
    }
    setAuthor(lonned);
  }, []);
  return (
    <div className="select-MainDiv">
      <div class="con">
        <h1>게시글 작성</h1>
        <div class="article-write">
          <form>
            <div></div>
            <div>
              <input
                className="write-title"
                type="text"
                placeholder="제목을 입력해주세요"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>

            <div className="write-mimee-div">
              <textarea
                className="write-mimee"
                type="text"
                value={contents}
                onChange={(e) => {
                  setContents(e.target.value);
                }}
              />
            </div>
          </form>
          <div className="Write_button">
            <button
              className="Write_button1"
              onClick={() => {
                post();
              }}
            >
              작성 하기
            </button>
            <button
              className="Write_button2"
              type="button"
              onclick={() => {
                navigate(-1);
              }}
            >
              돌아기기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPost;
