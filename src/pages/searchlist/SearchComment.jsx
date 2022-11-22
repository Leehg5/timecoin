import React from "react";

const SearchComment = ({ commentList, postPerPage, currentPage2 }) => {
  const offset = (currentPage2 - 1) * postPerPage;
  return (
    <>
      <tbody className="BoardTbody">
        {commentList.slice(offset, offset + postPerPage).map(
          (
            data // 각 페이지 첫 게시글 부터 마지막 게시글
          ) => (
            <tr key={data.id}>
              <td> {data.id}</td>
              <td>
                <a
                  href={
                    "/Board/" +
                    data.lcategory +
                    "/" +
                    data.mcategory +
                    "/detail/" +
                    data.boardIndex
                  }
                >
                  {data.contents}
                </a>
              </td>
              <td> {data.author}</td>
              <td> {data.date}</td>
            </tr>
          )
        )}
      </tbody>
    </>
  );
};

export default SearchComment;
