import styles from "./NotificationPopup.module.css";
import React, {  useRef } from "react";
import SettingsIcon from "./settings_20.svg";
import NotificationIcon from "./notification_28.svg";
import { useNavigate } from "react-router-dom";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";
import { useEscapeKey } from "@/shared/hooks/useEscapeKey";
import { useAppSelector } from "@/store/hooks";
import { selectNotifications } from "@/store/reducers/notifications/notificationsReducer";

interface Props {
  isNotificationPopupOpened: boolean;
  closeNotificationPopup: () => void;
}

export const NotificationPopup: React.FC<Props> = ({
  isNotificationPopupOpened,
  closeNotificationPopup,
}) => {
  const notifications = useAppSelector(selectNotifications);
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

  console.log(notifications);

  return (
    <ul
      className={
        !isNotificationPopupOpened
          ? styles.notificationSettingsList
          : `${styles.notificationSettingsList} ${styles.notificationSettingsListOpened}`
      }
      ref={ref}
    >
      {notifications && notifications.length === 0 && (
        <li
          className={styles.notificationSettingsListItem}
          style={{ paddingLeft: 0 }}
        >
          <p
            className={styles.notificationSettingsText}
            style={{ margin: "0 auto" }}
          >
            Нет новых уведомлений
          </p>
          </li>
      )}
      {notifications &&
        notifications.filter((x) => x.incident_type === "Событие").length >
          0 && (
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
                Предстоящие мероприятия
              </p>
            </div>
          </li>
        )}
      {notifications &&
        notifications.filter((x) => x.incident_type === "Опрос").length > 0 && (
          <li
            onClick={() => navigateToTestsPage()}
            className={styles.notificationSettingsListItem}
          >
            <img
              src={SettingsIcon}
              alt="шестеренка"
              className={styles.notificationSettingsIcon}
            />
            <p className={styles.notificationSettingsText}>
              Пройдите новый{" "}
              <span className={styles.notificationSettingsSpan}>тест</span>
            </p>
          </li>
        )}
    </ul>
  );
};
