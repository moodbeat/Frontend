import styles from "./eventsMainCard.module.css";
import { EventInterface } from "@/types";
import React, { useState } from "react";
import { EventsMainPopup } from "../EventsMainPopup/EventsMainPopup";

interface Props {
  item: EventInterface;
  fetchEvents: ()=> void;
}
export const EventsMainCard: React.FC<Props> = ({item, fetchEvents}) => {
  const [isPopupEventMain, setIsPopupEventMain] = useState(false);
  const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
  const dataStart = new Date(item.start_time);
  const dataEnd = new Date(item.end_time);
  const hoursStart = dataStart.getHours() < 10 ? `0${dataStart.getHours()}` : `${dataStart.getHours()}`;
  const minutesStart = dataStart.getMinutes() < 10 ? `0${dataStart.getMinutes()}` : `${dataStart.getMinutes()}`;
  const hoursEnd = dataEnd.getHours() < 10 ? `0${dataEnd.getHours()}` : `${dataEnd.getHours()}`;
  const minutesEnd = dataEnd.getMinutes() < 10 ? `0${dataEnd.getMinutes()}` : `${dataEnd.getMinutes()}`;

  // let moveMouse = 0;
  const handleHoverCard = () => {
    // if (moveMouse === 0) {
      setIsPopupEventMain(true);
    // }

    // moveMouse ++;
  }
  const handleHoverCardOff = () => {
    // moveMouse === 0 && console.log(e);
    // moveMouse = 0;
    setIsPopupEventMain(false);
  }


  return (
    <li  className={styles.point}>
      <div className={styles.eventMainCard} onMouseOver={handleHoverCard} onMouseOut={handleHoverCardOff}>
        <div className={styles.leftBlock}>
          <p className={styles.day}>{dataStart.getDate() < 10  ? ("0" + dataStart.getDate()) : dataStart.getDate()}</p>
          <p className={styles.month}>{monthNames[dataStart.getMonth()]}</p>
        </div>
        <div className={styles.rightBlock}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.time}>
            <span>{`${hoursStart}:${minutesStart}`}&mdash;</span>
            <span>{`${hoursEnd}:${minutesEnd}`}</span>
          </p>
        </div>
      </div>
      <EventsMainPopup item={item} fetchEvents={fetchEvents} isPopupEventMain={isPopupEventMain}/>
    </li>

  );
}
