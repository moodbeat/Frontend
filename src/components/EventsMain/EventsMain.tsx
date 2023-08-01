import styles from "./eventsMain.module.css";
import React from "react";
import { EventInterface } from "@/types";
import { EventsMainCard } from "./EventsMainCard/EventsMainCard";

interface Props {
  events: EventInterface[];
  fetchEvents: ()=> void;
}

export const EventsMain: React.FC<Props> = ({events, fetchEvents}) => {
  // const [eventsSort, setEventsSort] = useState<EventInterface[]>([]);

  // console.log(events);
  // useEffect(()=>{
  //   setEventsSort(events.slice(0,3))
  // },[events]);

  return (
    <div className={styles.events}>
      <h3 className={styles.title}>Предстоящие мероприятия</h3>
      <ul className={styles.list}>
        {events.length > 0 ?
          events.map((item) =>
            <EventsMainCard key={item.id} item={item}  fetchEvents={fetchEvents}/>
          ) :
          <li className={styles.pointNoEvents}>
            <p>Пока нет запланированных мероприятий</p>
          </li>
        }
      </ul>
    </div>
  );
};
