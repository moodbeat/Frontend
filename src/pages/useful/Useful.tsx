import styles from "./useful.module.scss";
import { Navbar } from "@/components/Navbar/Navbar";
import { useOnlineCheck } from "@/shared/hooks/useOnlineCheck";
import SearchUseful from "@/components/SearchUseful/SearchUseful";
import TagsList from "@/components/TagsList/TagsList";
import { BadInternetConnection } from "@/components/BadInternetConnection/BadInternetConnection";
import { useEffect, useState } from "react";
import { Card, Category } from "@/types";
import axios from "axios";
import UsefulCardList from "@/components/UsefulCardList/UsefulCardList";
import Loading from "@/components/Loading/Loading";
import { fetchData } from "@/shared/api/Api";
import { ButtonTelegramm } from "@/components/ButtonTelegramm/ButtonTelegramm";
import { BASE_URL_REQUEST } from "@/shared/constants";

export const Useful = () => {
  const [entries, setEntries] = useState<Card[]>([]);
  const [tempCards, setTempCards] = useState(entries);
  const [tempCheckedCards, setTempCheckedCards] = useState(entries);
  const [chosenCardList, setChosenCardList] = useState(entries);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isOnline = useOnlineCheck();

  useEffect(() => {
    fetchData().then((r) => {
      setEntries(r?.data.results);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchCategories().then((r) => r);
  }, []);

  //-------------------------------------
  //--------------------------------------

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("jwt"); // Замените на ваш реальный JWT Bearer Token

      const response = await axios.get(
        `${BASE_URL_REQUEST}/entries/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  };

  //--------------------------------------
  // ----------------------------------------
  useEffect(() => {
    matchedItems(tempCards, tempCheckedCards);
  }, [tempCards, tempCheckedCards]);

  useEffect(() => {
    setTempCards(entries);
    setTempCheckedCards(entries);
  }, [entries]);

  function handleSearchCards(value: string) {
    setSearchValue(value);
    const searchedCards = entries.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setTempCards(searchedCards);
  }

  function matchedItems(
    tempCards: Card[] = entries,
    tempCheckedCards: Card[] = entries
  ) {
    const ret = tempCards.filter((item1) =>
      tempCheckedCards.some(
        (item2) =>
          item1.title === item2.title &&
          item1.id === item2.id &&
          item1.category === item2.category &&
          item1.author === item2.author &&
          item1.text === item2.text &&
          item1.preview_image === item2.preview_image &&
          item1.text === item2.text &&
          item1.created === item2.created
      )
    );
    setChosenCardList(ret);
  }

  function handleCheckedList(tags: string[]) {
    if (tags.length) {
      const result: Card[] = entries.filter((card) => {
        return card.category.some((category) => tags.includes(category.name));
      });
      setTempCheckedCards(result);
    } else {
      setTempCheckedCards(entries);
    }
  }

  return (
    <div className="page-container">
      <Navbar />
      {isOnline ? (
        <div className={styles.container}>
          <div className={styles.useful}>
            <h2 className={styles.title}>Полезные статьи и видео</h2>
            <SearchUseful onSearch={handleSearchCards} />
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <TagsList tags={categories} onChecked={handleCheckedList} />

                <UsefulCardList
                  cards={chosenCardList}
                  searchValue={searchValue}
                  allEntries={entries}
                />
              </>
            )}
            <ButtonTelegramm />
          </div>
        </div>
      ) : (
        <BadInternetConnection />
      )}
    </div>
  );
};
