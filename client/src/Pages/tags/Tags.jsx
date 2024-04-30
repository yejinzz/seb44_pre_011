import axios from "axios";
import { useEffect, useState } from "react";
import { tagsState } from "../../store/atom/tagState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import style from "./Tags.module.css";
import CustomPagination from "../../components/pagination/CustomPagination";
import Navigation from "../../components/navigation/Navigation";

const Tags = () => {
  const setTagsState = useSetRecoilState(tagsState);
  const tagsArr = useRecoilValue(tagsState);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 30;

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_STACK_EXCHANGE}/tags?pagesize=100&order=desc&sort=popular&site=stackoverflow`
      )
      .then((res) => {
        setTagsState(res.data.items);
      });
  }, []);

  return (
    <main className={style.tag__container}>
      <Navigation />

      <section className={style.tag__section}>
        <div className={style.tag__head}>
          <h1>Tags</h1>
          <p>
            A tag is a keyword or label that categorizes your question with
            other, similar questions.
            <br /> Using the right tags makes it easier for others to find and
            answer your question.
          </p>
          <a href="https://stackoverflow.com/tags/synonyms" target="_block">
            <p>Show all tag synonyms</p>
          </a>
        </div>

        <ul>
          {tagsArr.slice(offset, offset + 30).map((tag) => (
            <li>
              <div className={style.tag__card}>
                <span>{tag.name}</span>
                <p>{tag.count} questions</p>
              </div>
            </li>
          ))}
        </ul>
        <div className={style.tag__pagination}>
          <CustomPagination
            array={tagsArr}
            currentPage={page}
            setCurrentPage={setPage}
            pageSize={30}
          />
        </div>
      </section>
    </main>
  );
};

export default Tags;
