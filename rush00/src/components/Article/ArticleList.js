import React, { useEffect } from "react";
import ArticleItem from "./ArticleItem";
import ArticleListStyled from "./ArticleList.styles";
import ReactPaginate from "react-paginate";
import axios from "axios";

function ArticleList({ handleClick, handleItemClick }) {
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get("http://localhost:4242/board", {
          params: {
            idx: 1,
          },
        });
        console.log("list", response);
      } catch (e) {
        console.log(e);
      }
      console.log("loaded list");
    };
    fetchList();
  }, []);

  const handlePageChange = () => {
    console.log("page changed");
  };

  return (
    <ArticleListStyled>
      <button type="button" className="createButton" onClick={handleClick}>
        새 글 작성
      </button>
      <ArticleListStyled.Field>
        <span className="field_num">No</span>
        <span className="field_title">제목</span>
        <span className="field_author">작성자</span>
      </ArticleListStyled.Field>
      <ArticleItem handleClick={handleItemClick} />
      <ArticleItem handleClick={handleItemClick} />
      <ArticleItem handleClick={handleItemClick} />
      <ArticleItem handleClick={handleItemClick} />
      <ArticleItem handleClick={handleItemClick} />
      <ArticleListStyled.Pagination>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={10}
          onPageChange={handlePageChange}
        />
      </ArticleListStyled.Pagination>
    </ArticleListStyled>
  );
}

export default ArticleList;
