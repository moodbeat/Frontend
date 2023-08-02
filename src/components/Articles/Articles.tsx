import {ReactElement} from "react";
import styles from "./articles.module.css";
import {Article} from "./Article/Article.tsx";
import {Card} from "@/types.ts";
import {useNavigate} from "react-router";

interface ArticlesListProps {
  articles: Card[];
  title: string;
}

export const Articles = ({articles, title}: ArticlesListProps): ReactElement | null => {
  const navigate = useNavigate();

  if(articles && articles.length !== 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.articles}>
          {articles.slice(0, 3).map((article, index) => (
            <Article key={index} article={article}/>
          ))}
          <button onClick={() => navigate('/entries')} className={styles.button}>Смотреть все статьи и видео</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
