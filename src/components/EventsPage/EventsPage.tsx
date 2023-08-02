import styles from "./eventsPage.module.css";
import React, { useState, useEffect } from "react";
import { ContainerContent } from "@/shared/components/ContainerContent/ContainerContent";
import { BadInternetConnection } from "@/components/BadInternetConnection/BadInternetConnection";
import { useOnlineCheck } from "@/shared/hooks/useOnlineCheck";
import { EventInterface } from "@/types";
import { EventsHeader } from "./EventsHeader/EventsHeader";
import { EventsFunctional } from "./EventsFunctional/EventsFunctional";
import { EventsCard } from "./EventsCard/EventsCard";
import { ButtonTelegramm } from "../ButtonTelegramm/ButtonTelegramm";
import { makeEventNotificationUnactive } from "@/shared/api/Api";
import { useAppSelector } from "@/store/hooks";
import { selectNotifications } from "@/store/reducers/notifications/notificationsReducer";

interface Props {
  events: EventInterface[];
  fetchEvents: () => void;
}

export const EventsPage: React.FC<Props> = ({ events, fetchEvents }) => {
  const isOnline = useOnlineCheck();
  const date = new Date();
  const monthToday = date.getMonth();
  const yearToday = date.getFullYear();
  const [month, setMonth] = useState<number>(monthToday);
  const [year, setYear] = useState<number>(yearToday);
  const [isArrowBack, setIsArrowBack] = useState(false);
  const [eventsSortMonth, setEventsSortMonth] = useState<EventInterface[]>([]);
  const [eventsSortFind, setEventsSortFind] = useState<EventInterface[]>([]);
  const [textInput, setTextInput] = useState<string>(""); // поисковая строка
  const [isRemovingNotification, setIsRemovingNotification] = useState(false);
  const notifications = useAppSelector(selectNotifications);

  // переключение месяца в хедере страницы
  const reduceMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    month <= monthToday + 1 && year <= yearToday
      ? setIsArrowBack(false)
      : setIsArrowBack(true);
    setTextInput("");
  };
  const increaseMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    month <= monthToday - 1 && year <= yearToday
      ? setIsArrowBack(false)
      : setIsArrowBack(true);
    setTextInput("");
  };

  // сортировка мероприятий по месяцу
  useEffect(() => {
    setEventsSortMonth(
      events.filter((item) => new Date(item.start_time).getMonth() === month)
    );
  }, [month, events]);

  // сортировка мероприятий по поисковой строке
  useEffect(() => {
    setEventsSortFind(eventsSortMonth);
  }, [eventsSortMonth]);

  // уменьшение счетчика уведомлений при открытии страницы месяца
  async function removeNotification(id: string) {
    if (isRemovingNotification) {
      return;
    }
    setIsRemovingNotification(true);
    const result = await makeEventNotificationUnactive(id);
    setIsRemovingNotification(false);
    return result;
  }

  useEffect(() => {
    eventsSortMonth.forEach((element) => {
      notifications &&
        notifications.forEach(
          (n: { incident_id: number | undefined; id: number }) => {
            if (n.incident_id === element.id) {
              try {
                removeNotification(String(n.id));
              } catch (error) {
                console.log(error);
              }
            }
          }
        );
    });
  }, [eventsSortMonth]);

  const handleInputSort = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setTextInput(value);
  };

  useEffect(() => {
    setEventsSortFind(
      eventsSortMonth.filter(
        (event) =>
          event.name.toLowerCase().includes(textInput.toLowerCase()) ||
          event.text.toLowerCase().includes(textInput.toLowerCase())
      )
    );
  }, [textInput]);

  return (
    <section className={styles.eventsPage}>
      {isOnline ? (
        <ContainerContent>
          <EventsHeader
            month={month}
            reduceMonth={reduceMonth}
            year={year}
            increaseMonth={increaseMonth}
            yearToday={yearToday}
            isArrowBack={isArrowBack}
          />
          <EventsFunctional
            textInput={textInput}
            handleInputSort={(e) => {
              handleInputSort(e);
            }}
            fetchEvents={fetchEvents}
          />
          <ul className={styles.eventsContent}>
            {eventsSortFind.length > 0 ?
              eventsSortFind.map((item)=>
                <li className={styles.eventsContent__point} key={item.id}>

                  <EventsCard
                    key={item.id}
                    item={item}
                    fetchEvents={fetchEvents}
                    // isRenderEventPage={isRenderEventPage}
                    // setIsRenderEventPage={setIsRenderEventPage}
                  />
                </li>
              ) :
              <p className={styles.eventsContentNull}>В этом месяце пока ничего не запланировано...</p>
            }
          </ul>
          <ButtonTelegramm />
        </ContainerContent>
      ) : (
        <BadInternetConnection />
      )}
    </section>
  );
};
