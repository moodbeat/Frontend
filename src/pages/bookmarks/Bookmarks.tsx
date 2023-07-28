import styles from "./bookmarks.module.css";
import {Navbar} from "@/components/Navbar/Navbar";
import {BadInternetConnection} from "@/components/BadInternetConnection/BadInternetConnection";
import {useOnlineCheck} from "@/shared/hooks/useOnlineCheck";
import SearchUseful from "@/components/SearchUseful/SearchUseful";
import Loading from "@/components/Loading/Loading";
import UsefulCardList from "@/components/UsefulCardList/UsefulCardList";
import {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "@/types";
import { ButtonTelegramm } from "@/components/ButtonTelegramm/ButtonTelegramm";

export const Bookmarks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<Card[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [tempCards, setTempCards] = useState(entries);
  const [chosenCardList, setChosenCardList] = useState(entries);
  const isOnline = useOnlineCheck();

  useEffect(() => {
    fetchData().then(r => r);

  }, []);

  useEffect(() => {
    matchedItems(tempCards)
    // console.log(tempCards)
    // console.log(tempCheckedCards)
  }, [tempCards])

  useEffect(() => {
    // console.log(entries)
    setTempCards(entries)

  }, [entries])


  function matchedItems(tempCards: Card[] = entries, tempCheckedCards: Card[] = entries) {
    // console.log(tempCards)
    // console.log(tempCheckedCards)
    const ret = tempCards.filter((item1) =>
      tempCheckedCards.some((item2) =>
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

  const fetchData = async () => {

    try {
      const token = localStorage.getItem("jwt");
      const headers = {Authorization: `Bearer ${token}`};
      const response = await axios.get('https://em-dev.usolcev.com/api/v1/entries/', {headers});
      const cardsWithLikes = response.data.results.filter((card: Card) => card.liked !== null);
      setEntries(cardsWithLikes);
      setIsLoading(false);
      // console.log(response.data.results)
      // console.log(chosenCardList)

    } catch (error) {
      console.error('Error fetching data:', error);

    } finally {
      // setIsLoading(false);
    }
  };

  function handleSearchCards(value: string) {
    setSearchValue(value)
    const searchedCards = entries.filter((item) =>

      item.title.toLowerCase().includes(value));
    // console.log(searchedCards)
    setTempCards(searchedCards);
  }


  return (
    <div className="page-container">
      <Navbar/>
      {isOnline ?
        <div className={styles.container}>
          <div className={styles.useful}>
            <h2 className={styles.title}>Сохраненное</h2>
            <SearchUseful onSearch={handleSearchCards}/>
            {isLoading ? <Loading/> :
              <>
                <UsefulCardList cards={chosenCardList} searchValue={searchValue} allEntries={entries}/>
              </>}
            <ButtonTelegramm />
          </div>
        </div>
        : <BadInternetConnection/>}
    </div>
  );
};
