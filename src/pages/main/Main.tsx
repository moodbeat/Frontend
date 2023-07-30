import styles from "./main.module.scss";
import {ArticleInterface, EventInterface, TagsInterface} from "@/types";
import { useOnlineCheck } from "@/shared/hooks/useOnlineCheck";
import { BadInternetConnection } from "@/components/BadInternetConnection/BadInternetConnection";
import { Navbar } from "@/components/Navbar/Navbar";
import { ContainerContent } from "@/shared/components/ContainerContent/ContainerContent";
import {RoutineSlider} from "@/pages/main/components/RoutineSlider/RoutineSlider.tsx";
import {BurnoutTestBanner} from "@/components/BurnoutTestBanner/BurnoutTestBanner.tsx";
import {MoodGraph} from "@/components/MoodGraph/MoodGraph.tsx";
import {BurnoutLevel} from "@/components/BurnoutLevel/BurnoutLevel.tsx";
import {PsychologistInfo} from "@/components/PsychologistInfo/PsychologistInfo.tsx";
import {Articles} from "@/components/Articles/Articles.tsx";
import {EventsMain} from "@/components/EventsMain/EventsMain.tsx";
import {PieChart} from "@/pages/main/components/PieChart/PieChart.tsx";
import {useRequest} from "@/shared/hooks/useRequest.tsx";
import {getActivityTypes} from "@/shared/api/Api.ts";
import {ReactElement, useEffect, useState} from "react";
import {useAppSelector} from "@/store/hooks.ts";
import {selectUserInfo} from "@/store/reducers/currentUser/currentUserReducer.ts";
import {Report} from "@/pages/main/components/Report/Report.tsx";
import {MoodButtonsSection} from "@/pages/main/components/MoodButtonsSection/MoodButtonsSection.tsx";
import {isTenHoursPassed} from "@/pages/main/Main.helpers.ts";
import { ButtonTelegramm } from "@/components/ButtonTelegramm/ButtonTelegramm";

interface Props {
  events: EventInterface[];
}
export const Main = ({events}: Props): ReactElement | null => {
  const isOnline = useOnlineCheck();
  const [activitiesData] = useRequest(getActivityTypes);
  const currentUser = useAppSelector(selectUserInfo);
  const [tagsOfPieChart, setTagsOfPieChart] = useState<TagsInterface[]>([]);
  const [widthsOfPieChart, setWidthsOfPieChart] = useState<number[]>([]);
  const [isMoodButtonsVisible, setMoodButtonsVisible] = useState<boolean>(false);

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

  useEffect(() => {
    if(currentUser.latest_condition) {
      const result = isTenHoursPassed(currentUser.latest_condition.date);
      setMoodButtonsVisible(result);
    } else {
      setMoodButtonsVisible(false);
    }
  }, [currentUser.latest_condition])


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
          <ContainerContent>
          {/* <div className={styles.container}> */}
            <main className={styles.main}>
              <section className={styles.section}>
                <BurnoutTestBanner id='express'/>
                <PsychologistInfo/>
              </section>
              <section className={styles.moodTracker}>
                <MoodButtonsSection isMoodButtonsVisible={isMoodButtonsVisible}/>
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
              <ButtonTelegramm />
            </main>
          {/* </div> */}
          </ContainerContent>
          : <BadInternetConnection/>}
      </div>
    )
  } else {
    return null;
  }
};
