import {Navbar} from "@/components/Navbar/Navbar";
import styles from "@/pages/usefulItem/usefulItem.module.scss";
import {BadInternetConnection} from "@/components/BadInternetConnection/BadInternetConnection";
import {useOnlineCheck} from "@/shared/hooks/useOnlineCheck";
import {useParams} from "react-router-dom";
import bookmark from "../../assets/bookmark.svg"
import bookmarkSaved from "../../assets/bookmark_saved.svg";
import {useEffect, useState} from "react";
import {Card, Category} from "@/types";
import axios from "axios";


export const UsefulItem = ({}) => {
  const isOnline = useOnlineCheck();
  const {id} = useParams();
  const [card, setCard] = useState({} as Card);
  const [isLikedTemp, setLike] = useState(false);

  useEffect(() => {
    fetchId().then(r => r);

  }, []);
  const fetchId = async () => {
    try {
      const token = localStorage.getItem("jwt");

      const response = await axios.get(`https://em-dev.usolcev.com/api/v1/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCard(response.data);
      // console.log(response.data)
      // console.log(card)
      // console.log(card.category)
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
    }
  };

  return (
    <div className="page-container">
      <Navbar/>
      {isOnline ?
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.title}>{card.title}</div>
            <img className={styles.image} src={card.preview_image} alt="{card.title}"/>
            <button className={styles.like} onClick={() => {
              !isLikedTemp ? setLike(true) : setLike(false)
            }}>
              <img src={
                isLikedTemp ? bookmarkSaved : bookmark
              }
                   alt="heart"/>

            </button>
            {card && card.category && <div className={styles.category}>
              {card.category.map((category: Category) => (
                <p className={styles.tag} key={category.id}>{category.name}</p>))}
              {/*{card.category.map() = ((item) => item.name)}*/}
            </div>
            }

            <div className={styles.text}>{card.text}</div>
          </div>
        </div>
        : <BadInternetConnection/>}
    </div>
  );
}
