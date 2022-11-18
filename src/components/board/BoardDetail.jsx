import React, { useEffect, useState } from "react";
import "./style/BoardDetail.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BoardDetail = ({ lcategory, mcategory, boardList }) => {
  const { boardid } = useParams();
  const navigate = useNavigate();
  // 게시글 상세내용
  const [boardDetail, setboardDetail] = useState([]);
  // 댓글 작성
  const [comment, setComment] = useState("");
  // 댓글 리스트
  const [comList, setComList] = useState([]);
  boardList.sort(function (a, b) {
    return b.id - a.id;
  });
  useEffect(() => {
    const getBoardData = async () => {
      try {
        const data = await axios({
          url:
            "http://localhost:7999/board/" +
            lcategory +
            "/" +
            mcategory +
            "/getid",
          method: "GET",
          params: {
            id: boardid,
          },
        });
        setboardDetail(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getBoardData();
    const getCommentData = async () => {
      try {
        const data = await axios({
          url:
            "http://localhost:7999/board/" +
            lcategory +
            "/" +
            mcategory +
            "/getid/comment",
          method: "GET",
          params: {
            id: boardid,
          },
        });
        setComList(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getCommentData();
  }, []);

  const aaa = sessionStorage.getItem("logined") === boardDetail.author;

  const bbb = (ccc) => sessionStorage.getItem("logined") === ccc;

  const deleteList = async () => {
    try {
      const data = await axios({
        url:
          "http://localhost:7999/board/" +
          lcategory +
          "/" +
          mcategory +
          "/delete",
        method: "DELETE",
        data: {
          id: boardid,
          author: sessionStorage.getItem("logined"),
        },
      });
      if (data.data === true) {
        alert("삭제완료");
        navigate(-1);
      } else if (data.data === false) {
        alert("삭제실패");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const compost = async () => {
    if (sessionStorage.getItem("logined") || false) {
      try {
        const data = await axios({
          url:
            "http://localhost:7999/board/" +
            lcategory +
            "/" +
            mcategory +
            "/post/comment",
          method: "POST",
          data: {
            contents: comment,
            author: sessionStorage.getItem("logined"),
            id: boardid,
          },
        });

        if (data.data === true) {
          alert("댓글 작성 완료");
          window.location.reload();
        } else if (data.data === false) {
          alert("댓글 작성 실패");
        }
      } catch (e) {
        console.log(e);
      }
    } else if (sessionStorage.getItem("logined") || true) {
      alert("로그인 해주세요");
    }
  };
  const comdelete = (x) => {
    axios.delete(
      "http://localhost:7999/board/" +
        lcategory +
        "/" +
        mcategory +
        "/delete/comment",
      {
        data: {
          id: x,
          author: sessionStorage.getItem("logined"),
        },
      }
    );
    window.location.reload();
  };

  return (
    <div className="DetailPage">
      <div className="DetailPageMain">
        <span className="DetailPageTitle">{boardDetail.subject} </span>
      </div>
      <div className="DetailPagelist">
        <div className="DetailPagelistdiv">
          <span>작성자:</span>
          <span>{boardDetail.author}</span>
          <span>날짜:</span>
          <span>{boardDetail.date}</span>
          <div className="asddgiuhi23">
            {aaa ? (
              <>
                <a
                  href={
                    "/Board/" +
                    lcategory +
                    "/" +
                    mcategory +
                    "/update/" +
                    boardDetail.id
                  }
                >
                  수정
                </a>
                <button
                  className="DetailPageButton2"
                  onClick={() => {
                    deleteList();
                  }}
                >
                  삭제
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <hr className="DetailPageHr" />
      <div className="DetailPage_List_cjah_div">
        <div className="DetailPage_List_cjah">{boardDetail.contents}</div>
      </div>
      <div className="DetailPageButton"></div>

      <div className="DetailPage_Booot">
        <div className="DetailPage_BoootMaindiv">
          <div>댓글</div>
        </div>
        <hr className="DetailPageHr" />
        <tbody className="DetailPage_BoootList">
          {comList.map((list) => (
            <tr className="DetailPageTd" key={list.id}>
              <td className="trdiv1">{list.author}</td>

              <td className="trdiv2">{list.date}</td>

              <td className="trdiv3">{list.contents} </td>
              <td className="trdiv4">
                {bbb(list.author) ? (
                  <>
                    <button
                      onClick={() => {
                        comdelete(list.id);
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; X
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </div>
      <hr className="DetailPageHr" />
      <div className="DetailPage-div">
        <input
          className="DetailPage-mimee"
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

        <button
          className="DetailPage_button1"
          onClick={() => {
            compost();
          }}
        >
          작성 하기
        </button>
      </div>
    </div>
  );
};

export default BoardDetail;
