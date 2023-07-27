import styles from "./main.module.scss";
import {ArticleInterface, EventInterface, TagsInterface} from "@/types";
import { useOnlineCheck } from "@/shared/hooks/useOnlineCheck";
import { BadInternetConnection } from "@/components/BadInternetConnection/BadInternetConnection";
import { Navbar } from "@/components/Navbar/Navbar";
import {RoutineSlider} from "@/components/RoutineSlider/RoutineSlider.tsx";
import {MoodButton} from "@/components/MoodButton/MoodButton.tsx";
import {BurnoutTestBanner} from "@/components/BurnoutTestBanner/BurnoutTestBanner.tsx";
import {MoodGraph} from "@/components/MoodGraph/MoodGraph.tsx";
import {BurnoutLevel} from "@/components/BurnoutLevel/BurnoutLevel.tsx";
import {PsychologistInfo} from "@/components/PsychologistInfo/PsychologistInfo.tsx";
import {Articles} from "@/components/Articles/Articles.tsx";
import {EventsMain} from "@/components/EventsMain/EventsMain.tsx";
import {PieChart} from "@/components/PieChart/PieChart.tsx";
import {useRequest} from "@/shared/hooks/useRequest.tsx";
import {getActivityTypes} from "@/shared/api/Api.ts";
import {ReactElement, useState} from "react";
import {useAppSelector} from "@/store/hooks.ts";
import {selectUserInfo} from "@/store/reducers/currentUser/currentUserReducer.ts";
import {Report} from "@/pages/main/components/Report/Report.tsx";

interface Props {
  events: EventInterface[];
}
export const Main = ({events}: Props): ReactElement | null => {
  const isOnline = useOnlineCheck();
  const [activitiesData] = useRequest(getActivityTypes);
  const currentUser = useAppSelector(selectUserInfo);
  const [tagsOfPieChart, setTagsOfPieChart] = useState<TagsInterface[]>([]);
  const [widthsOfPieChart, setWidthsOfPieChart] = useState<number[]>([]);

  const articles: ArticleInterface[] = [
    {
      type: "видео",
      title: "Как понять, что у вас профессиональное выгорание",
      length: "5 минут",
      banner: "/image.png",
    },
    {
      type: "статья",
      title: "Как понять, что у вас профессиональное выгорание",
      length: "5 минут",
      banner: "/image.png",
    },
    {
      type: "видео",
      title: "Как понять, что у вас профессиональное выгорание",
      length: "5 минут",
      banner: "/image.png",
    },
  ];

  const handleTagsOfPieChart = (data: TagsInterface[]) => {
    setTagsOfPieChart(data);
  }

  const handleWidthsOfPieChart = (data: number[]) => {
    setWidthsOfPieChart(data)
  }

  if(activitiesData) {
    return  (
      <div className="page-container">
        <Navbar />
        {isOnline ?
          <div className={styles.container}>
            <main className={styles.main}>
              <section className={styles.section}>
                <BurnoutTestBanner id='express'/>
                <PsychologistInfo/>
              </section>
              <section className={styles.moodTracker}>
                <h2 className={styles.moodTrackerHeading}>Оцените свое настроение сегодня</h2>
                <div className={styles.moodButtons}>
                  <MoodButton mood="bad" />
                  <MoodButton mood="so-so" />
                  <MoodButton mood="normal" />
                  <MoodButton mood="good" />
                  <MoodButton mood="perfect" />
                </div>
              </section>
              <RoutineSlider widths={widthsOfPieChart} handleWidths={handleWidthsOfPieChart} handleTags={handleTagsOfPieChart} data={activitiesData} tags={tagsOfPieChart}/>
              <section className={styles.section}>
                <MoodGraph />
                <div className={styles.pieChartContainer}>
                  <h3 className={styles.pieChartTitle}>Деятельность</h3>
                  <PieChart widths={widthsOfPieChart} data={tagsOfPieChart} id={currentUser.id} />
                </div>
              </section>
              <section className={styles.section}>
                <BurnoutLevel />
                <Report />
              </section>
              <section className={styles.section}>
                <Articles
                  articles={articles}
                  title={'Как улучшить ментальное здоровье'}
                />
                <EventsMain  events={events}/>
              </section>
            </main>
          </div>
          : <BadInternetConnection/>}
      </div>
    )
  } else {
    return null;
  }
};
