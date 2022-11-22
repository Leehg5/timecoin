import React from "react";

const SearchBoard = ({ boardList, postPerPage, currentPage }) => {
  const offset = (currentPage - 1) * postPerPage;
  return (
    <>
      <tbody className="BoardTbody">
        {boardList.slice(offset, offset + postPerPage).map(
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
          )
        )}
      </tbody>
    </>
  );
};

export default SearchBoard;
