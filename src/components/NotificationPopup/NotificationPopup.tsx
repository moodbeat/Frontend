import styles from "./NotificationPopup.module.css";
import React, { useEffect, useRef, useState } from "react";
import SettingsIcon from "./settings_20.svg";
import NotificationIcon from "./notification_28.svg";
import { useNavigate } from "react-router-dom";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { useEscapeKey } from "@/shared/hooks/useEscapeKey";
import { EventInterface } from "@/types";
import { useAppSelector } from "@/store/hooks";
import { selectNotifications } from "@/store/reducers/notifications/notificationsReducer";

interface Props {
  isNotificationPopupOpened: boolean;
  closeNotificationPopup: () => void;
  events: EventInterface[];
}

export const NotificationPopup: React.FC<Props> = ({
  isNotificationPopupOpened,
  closeNotificationPopup,
  events,
}) => {
  const notifications = useAppSelector(selectNotifications);
  const [displayedDate, setDisplayedDate] = useState({ date: new Date() });
  const [displayedDateText, setDisplayedDateText] = useState("");
  const navigate = useNavigate();
  const ref = useRef(null);

  const navigateToEventsPage = () => {
    navigate("/events");
    closeNotificationPopup();
  };
  const navigateToTestsPage = () => {
    navigate("/tests");
    closeNotificationPopup();
  };

  useEscapeKey(closeNotificationPopup);
  useOutsideClick(closeNotificationPopup, ref);

  useEffect(() => {
    if (
      notifications &&
      notifications.filter((x) => x.incident_type === "Событие").length > 0
    ) {
      // Выбираем оповещения, касающиеся событий
      const eventNotifications = notifications.filter(
        (x) => x.incident_type === "Событие"
      );
      const eventsToCheck: Array<EventInterface> = [];
      eventNotifications.forEach((en) => {
        events.forEach((e) => {
          if (e.id === en.incident_id) eventsToCheck.push(e);
        });
      });

      // Определяем дату ближайшего непросмотренного мероприятия
      eventsToCheck.map((x, i) => {
        if (i === 0) setDisplayedDate({ date: x.start_time });
        if (x.start_time < displayedDate.date)
          setDisplayedDate({ date: x.start_time });
      });

      if (typeof displayedDate.date === "string") {
        setDisplayedDateText(
          new Date(displayedDate.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        console.log(
          `${new Date(displayedDate.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );
      }
    }
  }, [events, notifications, displayedDate.date]);

  return (
    <ul
      className={
        !isNotificationPopupOpened
          ? styles.notificationSettingsList
          : `${styles.notificationSettingsList} ${styles.notificationSettingsListOpened}`
      }
      ref={ref}
    >
      <li
        onClick={() => navigateToEventsPage()}
        className={styles.notificationSettingsListItem}
      >
        <img
          src={NotificationIcon}
          alt="колокольчик"
          className={styles.notificationSettingsIcon}
        />
        <div>
          <p className={styles.notificationSettingsText}>
            Вам назначена встреча
          </p>
          <p className={styles.notificationSettingsText}>{displayedDateText}</p>
        </div>
      </li>
      <li
        onClick={() => navigateToTestsPage()}
        className={styles.notificationSettingsListItem}
      >
        <img
          src={SettingsIcon}
          alt="шестеренка"
          className={styles.notificationSettingsIcon}
        />
        <p className={styles.notificationSettingsText}>Пройдите новый тест</p>
      </li>
    </ul>
  );
};
