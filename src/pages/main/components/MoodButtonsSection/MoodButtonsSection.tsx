import styles from "./MoodButtonsSection.module.scss";
import {MoodButton} from "@/pages/main/components/MoodButton/MoodButton.tsx";
import {ReactElement} from "react";

type Moods = "bad" | "so-so" | "normal" | "good" | "perfect";

interface Props {
  isMoodButtonsVisible: boolean;
}

export const MoodButtonsSection = ({isMoodButtonsVisible}: Props): ReactElement | null => {
  const moodOptions: Moods[] = ["bad", "so-so", "normal", "good", "perfect"];

  if(isMoodButtonsVisible) {
    return (
      <div>
        <h2 className={styles.moodTrackerHeading}>Оцените свое настроение сегодня</h2>
        <div className={styles.moodButtons}>
          {moodOptions.map((mood: Moods,  index: number) => (
            <MoodButton index={index} mood={mood} key={Date.now() * Math.random()}/>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
