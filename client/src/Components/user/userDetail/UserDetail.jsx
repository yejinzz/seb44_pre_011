import { makeList } from "../../../function/wrapperFunction";
import Questions from "../../questions/Questions";
import style from "./UserDetail.module.css";

const UserDetail = ({ items, currentPage, tab }) => {
  return (
    <div className={style.profile__list_box}>
      <p className={style.profile__result}>{`${items.length} ${tab}`}</p>
      <ul className={style.profile__lists}>
        {items.length ? (
          makeList(items, currentPage, 15).map((item, idx) => (
            <li className={style.profile__listItem}>
              <Questions
                key={`${tab}_${idx}`}
                questionId={item.questionId}
                title={item.title}
                content={item.content}
                createdAt={item.createdAt}
                displayName={item.displayName}
              />
            </li>
          ))
        ) : (
          <p className={style.profile__empty}>List is empty.</p>
        )}
      </ul>
    </div>
  );
};

export default UserDetail;
