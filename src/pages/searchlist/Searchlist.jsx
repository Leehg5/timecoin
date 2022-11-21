import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Searchlist.scss";
import axios from "axios";
import ArticleIcon from "@mui/icons-material/Article";
import ForumIcon from "@mui/icons-material/Forum";
import Posts from "../../components/board/posts/Posts";
import Pagination from "../../components/board/posts/Pagination";

const Searchlist = () => {
  const location = useLocation();
  const [limit, setLimit] = useState(20); // 한 페이지당 보여줄 리스트
  const [page, setPage] = useState(1); // 현재 페이지

  const [lonned, setLonned] = useState(false);
  const [userId, setUserId] = useState();

  const [gggg, setGggg] = useState("");
  const [BoardText, setBoardText] = useState("");
  const [deleteListsd, setDeleteListsd] = useState();
  const navigate = useNavigate();

  const deleteList = async () => {
    const response = await axios.get(
      `http://localhost:7999/board/1/2/searchAll?value=${gggg}`
    );
    // console.log(response.data);
    setBoardText(response.data);
    console.log(BoardText);
    if (response.data != false) {
      navigate("/searchlist", {
        state: {
          test: response.data,
        },
      });
    } else if (response.data == false) {
      alert("입력하신 정보가 없습니다");
    }
  };

  const check = sessionStorage.getItem("logined") || false;
  useEffect(() => {
    if (check) {
      setLonned(sessionStorage.getItem("user"));
      setUserId(sessionStorage.getItem("userid"));
    }
  }, []);
  location.state.test.sort(function (a, b) {
    return b.id - a.id;
  });
  return (
    <div className="Searchlist">
      <div className="Searchlist_div">
        <input
          placeholder="검색어를 입력해주세요"
          type="value"
          onChange={(e) => {
            setGggg(e.target.value);
          }}
        />

        <button
          onClick={() => {
            deleteList();
            setDeleteListsd();
            deleteList = { deleteList };
          }}>
          검색
        </button>
        <div className="Searchlistssds3">통합 검색</div>
      </div>
      <div className="Searchlisttitlle">
        <div>
          <ArticleIcon />
          문서
        </div>
      </div>
      <div className="Searchlisttitllelist">
        {location.state.test.map((hhh) => (
          <div className="earchlistMain" key={hhh}>
            <div>
              {" "}
              <Link to={`../detailPage/${hhh.id}`} state={{ number: hhh.id }}>
                {hhh.subject}
              </Link>
            </div>
            <div className="Searchlist_List">
              <span>{hhh.author}</span>

              <span>{hhh.date}</span>

              <span>조회수 : {hhh.views}</span>
            </div>
            <div className="Searchlist_Link">
              <Link to={`../detailPage/${hhh.id}`} state={{ number: hhh.id }}>
                {hhh.contents}
              </Link>
            </div>
            <hr className="SearchlistHr" />
          </div>
        ))}
      </div>
      <div className="Searchlistmide">
        <div className="Searchlistmide_Div">
          <ForumIcon />
          댓글
        </div>
        <div className="Searchlistmidelist">
          <div>제목</div>
          <span>김강수</span>
          <span>2022.02.18</span>
        </div>
        <hr className="SearchlistmideHr" />
      </div>
      <Posts boardList={location.state.test} limit={limit} page={page} />
      <Pagination
        total={location.state.test.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Searchlist;

// 검색 글 불러오기
