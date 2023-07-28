import * as React from "react";
import {useEffect, useState} from "react";
import UsefulCard from "@/components/UsefulCard/UsefulCard";
import styles from "./usefulCardList.module.scss";
import {Card} from "@/types";
import NoSearchResult from "@/components/NoSearchResult/NoSearchResult";

export interface Props {
  cards: Card[];
  searchValue: string
  allEntries: Card[];
}


const UsefulCardsList: React.FC<Props> = ({cards, searchValue, allEntries}) => {

  const temp = cards.slice(0, 6);
  const [displayedCards, setDisplayedCards] = useState(temp);
  useEffect(() => {
    setDisplayedCards(temp);
  }, [cards])

  const handleLoadMore = () => {
    const lastDisplayedIndex = displayedCards.length;
    const nextDisplayedIndex = lastDisplayedIndex + 3;
    const nextGroup = cards.slice(lastDisplayedIndex, nextDisplayedIndex);
    setDisplayedCards([...displayedCards, ...nextGroup]);
  };

  return (

    <section className={styles.cards}>
      {displayedCards
        .map((card) => (

          <UsefulCard
            id={card.id}
            key={card.id}
            category={card.category}
            title={card.title}
            preview_image={card.preview_image}
            text={card.text}
            created={card.created}
            author={card.author}
            description={card.description}
            url={card.url}
            liked={card.liked}
          />

        ))
      }
      {displayedCards.length < cards.length && (
        <button className={styles.more}
                onClick={handleLoadMore}
        >
          Загрузить еще
        </button>
      )}
      {cards.length === 0 ? <NoSearchResult searchValue={searchValue}/> : ""}
      {cards.length === 0
        ? allEntries.slice(0, 3)
          .map((card) => (
            <UsefulCard
              id={card.id}
              key={card.id}
              category={card.category}
              title={card.title}
              preview_image={card.preview_image}
              text={card.text}
              created={card.created}
              author={card.author}
              description={card.description}
              url={card.url}
              liked={card.liked}
            />
          ))
        : ""
      }

    </section>

  );
}

export default UsefulCardsList;
