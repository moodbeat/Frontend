import * as React from "react";
import {useEffect, useState} from "react";
import bookmark from "../../../public/bookmark.svg";
import bookmarkSaved from "../../../public/bookmark_saved.svg";
import play from "../../../public/play.svg";
import styles from "./usefulCard.module.scss";
import {Card} from "@/types";
// import {Link} from "react-router-dom";
import * as Api from "@/shared/api/Api";
import {fetchData} from "@/shared/api/Api";
import {Link} from "react-router-dom";


export interface Category {
  id: number,
  name: string,
  slug: string,
  description: string;
}


const UsefulCard: React.FC<Card> = ({
                                      id,
                                      category,
                                      title,
                                      preview_image,
                                      // text,
                                      // created,
                                      liked,
                                      // author,
                                      description,
                                      // url,


                                    }) => {

  const [isLikedTemp, setIsLiked] = useState(false);

  useEffect(() => {
    const like = liked !== null
    setIsLiked(like)
  }, [liked])

  // useEffect(() => {
  //   fetchData().then(() => {
  //
  //   })
  // }, [])

  // const fetchData = async () => {
  //
  //   try {
  //     const token = localStorage.getItem("jwt");
  //     const headers = {Authorization: `Bearer ${token}`};
  //     const response = await axios.get('https://em-dev.usolcev.com/api/v1/entries/', {headers});
  //     console.log(response.data.results);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };


  const setLike = async (id: any) => {

    setIsLiked(true);
    try {
      await Api.postUsefulLike(id)
        .then(() => {
          fetchData()

          setIsLiked(true);
          return;
        })
        .then(() => {
          fetchData()
          setIsLiked(true);
        })
      // }
    } catch (err: any) {
      // setIsDisabledLike(false);
      console.log(err);
    }
  }

  const deleteLike = async (id: any) => {
    try {
      await Api.deleteUsefulLike(id)
        .then(() => {
            setIsLiked(false);
            fetchData()
            return;
          }
        )
        .then(() => {
            fetchData()
            setIsLiked(false);
          }
        )
    } catch (err: any) {

      console.log(err);
    }
  }

  const handleLike = (likedId: any) => {
    if (isLikedTemp) {
      console.log(likedId);
      deleteLike(likedId);
    } else {
      console.log(id);
      setLike(id);
    }
  }

  return (


    <article className={`${styles.card} ${isLikedTemp ? styles.card_liked : ''}`} key={id}>
      <button className={styles.like} onClick={() => handleLike(liked?.id)}><img src={
        // liked !== null ? bookmarkSaved : bookmark
        isLikedTemp ? bookmarkSaved : bookmark
      }
                                                                                 alt="heart"/>
      </button>
      <Link key={id} to={`/entries/${id}`} className={styles.link}>
        <div className={styles.container}>
          <div className="">
            <img className={styles.image} src={preview_image} height={175} width={292}
                 alt={title}/>
            {category.some((temp) => temp.id === 3) ?
              <div className={styles.play}><img src={play} alt="play"/></div>
              :
              ""}
          </div>


          <div className="">
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{description}</p>
          </div>
          <div className={styles.tags_container}>
            <div className={styles.tags}>
              {category
                .map((tag, id) => (
                  <div className={styles.tag} key={id}>{tag.name}</div>
                ))
              }

            </div>
            {/*<p className={styles.duration}>{created}</p>*/}
          </div>
        </div>
      </Link>
    </article>

  );
}

export default UsefulCard;
