import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Searchlist.scss";
import axios from "axios";
import ArticleIcon from "@mui/icons-material/Article";
import ForumIcon from "@mui/icons-material/Forum";
import Pagination from "react-js-pagination";
import SearchBoard from "./SearchBoard";
import SearchComment from "./SearchComment";

const Searchlist = () => {
  const location = useLocation();

  const [lonned, setLonned] = useState(false);
  const [userId, setUserId] = useState();

  const [gggg, setGggg] = useState("");
  const [BoardText, setBoardText] = useState("");
  const [serComment, setSerComment] = useState("");
  const [deleteListsd, setDeleteListsd] = useState();
  const navigate = useNavigate();
  const [postPerPage] = useState(5); // 한 페이지당 보여줄 리스트
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [currentPage2, setCurrentPage2] = useState(1); // 댓글 현재 페이지

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }; // 페이지 변경 감지

  const handlePageChange2 = (page) => {
    setCurrentPage2(page);
  }; //페

  const deleteList = async () => {
    const response = await axios.get(
      `http://localhost:7999/board/1/2/searchAll?value=${gggg}`
    );
    const response2 = await axios.get(
      `http://localhost:7999/board/1/2/searchAll/comment?value=${gggg}`
    );
    // console.log(response.data);
    setBoardText(response.data);
    setSerComment(response2.data);
    console.log(BoardText);
    console.log(response2.data);
    if (response.data != false || response2.data != false) {
      navigate("/searchlist", {
        state: {
          test: response.data,
          test2: response2.data,
        },
      });
    } else if (response.data == false && response2.data == false) {
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
  location.state.test2.sort(function (a, b) {
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
          }}
        >
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
      {/* <div className="Searchlisttitllelist">
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
        ))} */}
      {/* </div> */}
      <SearchBoard
        boardList={location.state.test}
        postPerPage={postPerPage}
        currentPage={currentPage}
      />
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={5}
        totalItemsCount={location.state.test.length}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={handlePageChange}
      />
      <div className="Searchlistmide">
        <div className="Searchlistmide_Div">
          <ForumIcon />
          댓글
        </div>
        {/* <div className="Searchlistmidelist">
          <div>제목</div>
          <span>김강수</span>
          <span>2022.02.18</span>
        </div> */}
        <SearchComment
          commentList={location.state.test2}
          category={location.state.test}
          postPerPage={postPerPage}
          currentPage2={currentPage2}
        />
        <hr className="SearchlistmideHr" />
      </div>
      {/* <Posts boardList={location.state.test} limit={limit} page={page} />
      <Pagination
        total={location.state.test.length}
        limit={limit}
        page={page}
        setPage={setPage}
      /> */}
      <Pagination
        activePage={currentPage2}
        itemsCountPerPage={5}
        totalItemsCount={location.state.test2.length}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={handlePageChange2}
      />
    </div>
  );
};

export default Searchlist;

// 검색 글 불러오기
