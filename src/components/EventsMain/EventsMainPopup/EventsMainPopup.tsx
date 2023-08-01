import styles from "./eventsMainPopup.module.css";
import { EventInterface } from "@/types";
import { EventsCard } from "@/components/EventsPage/EventsCard/EventsCard";
interface Props {
  item: EventInterface;
  fetchEvents: ()=> void;
  isPopupEventMain: boolean;
}
export const EventsMainPopup: React.FC<Props> = ({item, fetchEvents, isPopupEventMain}) => {
  console.log(isPopupEventMain);
  return (
    <div className={isPopupEventMain ? styles.popupEvent_active : styles.popupEvent}>
      <EventsCard item={item} fetchEvents={fetchEvents}/>
    </div>
  )
}
