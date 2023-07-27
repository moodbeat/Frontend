import React, { useState } from "react";
import styles from "./MoodButton.module.scss";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { setSuccessMessage } from "@/store/reducers/alertSuccess/alertSuccessReducer.ts";
import { setErrorMessage } from "@/store/reducers/alertError/alertErrorReducer.ts";
import { sendButtonCondition, selectButtonConditions } from "@/store/reducers/conditionsBurnout/conditionsBurnoutReducer.ts";

type Moods = "bad" | "so-so" | "normal" | "good" | "perfect";
interface MoodsProps {
  mood: Moods;
}

export const MoodButton: React.FC<MoodsProps> = ({ mood }) => {
  const dispatch = useAppDispatch();
  const buttonCondition = useAppSelector(selectButtonConditions);

  const [isHovered, setIsHovered] = useState(false);

  let caption: string;
  let imgUrl: string;
  let imgUrlHovered: string;
  let colorClass: string;
  let condition: number;

  switch (mood) {
    case "bad":
      caption = "Плохо";
      colorClass = styles.moodButtonRed;
      imgUrl = '/worried.svg';
      imgUrlHovered = '/worried-hover.svg';
      condition = 1;
      break;
    case "so-so":
      caption = "Так себе";
      imgUrl = "/confused.svg";
      imgUrlHovered = '/confused-hover.svg';
      colorClass = styles.moodButtonOrange;
      condition = 2;
      break;
    case "normal":
      caption = "В норме";
      imgUrl = "/expressionless.svg";
      imgUrlHovered = '/expressionless-hover.svg';
      colorClass = styles.moodButtonYellow;
      condition = 3;
      break;
    case "good":
      caption = "Хорошо";
      imgUrl = "/slightly-smile.svg";
      imgUrlHovered = '/slightly-smile-hover.svg';
      colorClass = styles.moodButtonGreen;
      condition = 4;
      break;
    case "perfect":
      caption = "Отлично";
      imgUrl = "/simple-smile.svg";
      imgUrlHovered = '/simple-smile-hover.svg';
      colorClass = styles.moodButtonSupergreen;
      condition = 5;
      break;
  }

  function handleSendMood(e: React.MouseEvent<HTMLButtonElement>) {
    if (buttonCondition) {
      dispatch(setErrorMessage('Можно голосовать только один раз в день'))
    } else {
      const condition = +(e.currentTarget as HTMLButtonElement).value;
      const note = "Моё состояние сегодня";
      const date = new Date().toISOString()

      dispatch(sendButtonCondition({
        mood: condition,
        note: note,
        date: date
      }))
      dispatch(setSuccessMessage('Вы молодец!'))
    }
  }

  return (
    <button
      onClick={(e) => handleSendMood(e)}
      value={condition}
      className={cn(styles.container, colorClass)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {caption}
      <img src={isHovered ? imgUrlHovered : imgUrl} alt="icon" />
    </button>
  );
};

