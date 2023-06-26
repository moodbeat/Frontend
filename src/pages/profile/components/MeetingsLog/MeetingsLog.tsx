import styles from './meetingslog.module.scss';
import {MeetingDetails} from "@/pages/profile/components/MeetingDetails/MeetingDetails.tsx";

export const MeetingsLog = () => {

  const meetings = [
    {
      id: 1,
      last_date: '02.05.2023',
      mental_name: "тревожное",
      mental_level: 2,
      comment: "Выказывает усталость, сниженный интерес к работе и снижение продуктивности. Необходимо принять меры для предотвращения полного выгорания, такие как распределение нагрузки, установление границ между работой и личной жизнью, а также психологической поддержки."
    },
    {
      id: 2,
      last_date: '02.05.2023',
      mental_name: "тревожное",
      mental_level: 1,
      comment: "Выказывает усталость, сниженный интерес к работе и снижение продуктивности. Необходимо принять меры для предотвращения полного выгорания, такие как распределение нагрузки, установление границ между работой и личной жизнью, а также психологической поддержки."
    },
    {
      id: 3,
      last_date: '02.05.2023',
      mental_name: "тревожное",
      mental_level: 2,
      comment: "Выказывает усталость, сниженный интерес к работе и снижение продуктивности. Необходимо принять меры для предотвращения полного выгорания, такие как распределение нагрузки, установление границ между работой и личной жизнью, а также психологической поддержки."
    },
    {
      id: 4,
      last_date: '02.05.2023',
      mental_name: "тревожное",
      mental_level: 3,
      comment: "Выказывает усталость, сниженный интерес к работе и снижение продуктивности. Необходимо принять меры для предотвращения полного выгорания, такие как распределение нагрузки, установление границ между работой и личной жизнью, а также психологической поддержки."
    },
    {
      id: 5,
      last_date: '02.05.2023',
      mental_name: "тревожное",
      mental_level: 2,
      comment: "Выказывает усталость, сниженный интерес к работе и снижение продуктивности. Необходимо принять меры для предотвращения полного выгорания, такие как распределение нагрузки, установление границ между работой и личной жизнью, а также психологической поддержки."
    }
  ]

  return (
    <div className={styles.meetingsLog}>
      <button className={styles.button}>Посмотреть все (5)</button>
      <h2 className={styles.title}>История встреч</h2>
      <MeetingDetails date={meetings[0].last_date} title={meetings[0].mental_name} level={meetings[0].mental_level} comment={meetings[0].comment}/>
    </div>
  );
};

export default MeetingsLog;
