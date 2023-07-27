import styles from "./eventsPage.module.css";
import React, { useState, useEffect } from "react";
import { EventInterface } from "@/types";
import { EventsHeader } from "./EventsHeader/EventsHeader";
import { EventsFunctional } from "./EventsFunctional/EventsFunctional";
import { EventsCard } from "./EventsCard/EventsCard";
import {
  getNotifications,
  makeEventNotificationUnactive,
} from "@/shared/api/Api";

interface Props {
  events: EventInterface[];
  fetchEvents: () => void;
}

export const EventsPage: React.FC<Props> = ({ events, fetchEvents }) => {
  const date = new Date();
  const monthToday = date.getMonth();
  const yearToday = date.getFullYear();
  const [month, setMonth] = useState<number>(monthToday);
  const [year, setYear] = useState<number>(yearToday);
  const [isArrowBack, setIsArrowBack] = useState(false);
  const [eventsSortMonth, setEventsSortMonth] = useState<EventInterface[]>([]);
  const [eventsSortFind, setEventsSortFind] = useState<EventInterface[]>([]);
  const [textInput, setTextInput] = useState<string>(""); // поисковая строка

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
  useEffect(() => {
    getNotifications().then((res) => {
      eventsSortMonth.forEach((element) => {
        res.data.results.forEach(
          (n: { incident_id: number | undefined; id: number }) => {
            if (n.incident_id === element.id) {
              makeEventNotificationUnactive(String(n.id));
            }
          }
        );
      });
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
      <div className={styles.eventsPageContainer}>
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
          {eventsSortFind.length > 0 &&
            eventsSortFind.map((item) => (
              <EventsCard key={item.id} item={item} fetchEvents={fetchEvents} />
            ))}
        </ul>
      </div>
    </section>
  );
};
