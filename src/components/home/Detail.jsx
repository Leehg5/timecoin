import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        method: "GET",
        url: `http://localhost:3999/api/v1/article/${id}`,
      });
      setArticle(data.data);
      setLoading(false);
    };
    getData();
  }, []);
  if (loading) return <div>loading...</div>;

  return (
    <div className="flex flex-col max-w-5xl m-auto">
      <button
        className="btn btn-outline btn-info ml-auto mr-0 mt-4 w-24"
        onClick={() => {
          navigate("/");
        }}>
        메인으로
      </button>
      <div className="ml-auto mr-0 mt-4">{article?.createDate}</div>
      <div className="form-control w-full mt-8">제목 : {article?.title}</div>
      <div className="form-control w-full mt-6">내용 : {article?.body}</div>
      <div className="form-control w-full mt-6">조회수 : {article?.views}</div>
      <div className="flex w-full mt-4">
        {article.imageList.map((image, index) => {
          return (
            <div key={index} className="w-36">
              <img src={image.imgUrl} alt="article image" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Detail;
