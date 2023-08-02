import styles from "./article.module.css";
import {Card} from "@/types.ts";
import {ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import play from "../../../../public/play.svg";

interface ArticleProps {
  article: Card;
}


export const Article = ({article}: ArticleProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className={styles.article} onClick={() => navigate(`/entries/${article.id}`)}>
      <img src={article.preview_image} className={styles.image}/>
      {article.category.some((temp) => temp.id === 3)
        ?
        <div className={styles.play}><img src={play} alt="play"/></div>
        :
        ""
      }
      <h3 className={styles.title}>{article.title}</h3>
      <div className={styles.container}>
        {/* <p className={styles.text}>{article.category[0].name}</p> */}
      </div>
    </div>
  );
};
