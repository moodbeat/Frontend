import { ResponsiveLine } from "@nivo/line";
import { useState, useEffect } from "react";
import { selectConditions, selectButtonConditions } from "@/store/reducers/conditionsBurnout/conditionsBurnoutReducer.ts";
import { useAppSelector } from "@/store/hooks.ts";
import { arrowLeft, arrowRight } from "@/assets";

import {
  simpleSmileIcon,
  slightlySmileIcon,
  expressionlessIcon,
  confusedIcon,
  worriedIcon,
} from "@/assets";

import styles from "./MoodGraph.module.css";
import {UserConditionRecieved} from "@/types.ts";
import {useLocation} from "react-router";

interface renderData {
  x: number,
  y: number
}

interface Props {
  conditionsData?: UserConditionRecieved[];
}

export const MoodGraph = ({conditionsData}: Props) => {
  const [data, setData] = useState <renderData[]>([{ x: 0, y: 0 }]);
  const [conditionValues, setConditionValues] = useState<UserConditionRecieved[]>([]);
  const [monthVisible, setMonthVisible] = useState <number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2023);
  const [numberOfDays, setNumberOfDays] = useState<number>(30);
  const [calendar, setCalendar] = useState<number[]>([]);

  const conditionsRecieved = useAppSelector(selectConditions);
  const buttonConditions = useAppSelector(selectButtonConditions);
  const { pathname } = useLocation();

  function generateData () {

    //conditionsRecieved currentYear monthVisible numberOfDays входящие переменные, функцию можно вынести
    const renderData: renderData[] = [];

    const yearFilteredArray = conditionValues?.filter(item => {
     const conditionYear = new Date(item.date).getFullYear();
     return conditionYear === currentYear;
    })

    const monthFilteredArray = yearFilteredArray?.filter(item => {
      const conditionMonth = new Date(item.date).getMonth();
      return conditionMonth === monthVisible;
    })

      for (let i = 1; i <= numberOfDays; i++) {
        renderData.push({
          x: i,
          y: 0,
        })
      }

    if (monthFilteredArray) {

     monthFilteredArray?.reverse().forEach((item) => {
        const day = new Date(item.date).getUTCDate();

        //если на эту дату есть оценка настроения - подменяем её в результирующем массиве
        if (renderData[day - 1].x === day) renderData[day - 1].y = item.mood;
      })
    }

    return renderData;
  }

  function getMonthName (monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString('ru', { month: 'long' });
  }

  function decrease () {
    if (monthVisible - 1 >= 0) {
      setMonthVisible(prevstate => prevstate - 1)
    } else if (monthVisible - 1 < 0) setMonthVisible(11)
  }

  function increase () {
    if (monthVisible + 1 <= 11) {
      setMonthVisible(prevstate => prevstate + 1)
    } else if (monthVisible + 1 > 11) setMonthVisible(0)
  }

  function getNumberOfVisibleMonth (year: number, month: number): number {
    return new Date(year, month, 0).getDate()
  }

  useEffect(() => {
    if (conditionsData) {
      setConditionValues(conditionsData.slice(0));
    } else if (pathname === "/" && conditionsRecieved) {
      setConditionValues(conditionsRecieved.slice(0));
    }

    setData(generateData());
  }, [buttonConditions, pathname, conditionsData, conditionsRecieved]);

  useEffect(() => {
    const newNumberOfDays = getNumberOfVisibleMonth(currentYear, monthVisible + 1);
    setNumberOfDays(newNumberOfDays);
    setData(generateData());
  }, [monthVisible, currentYear]);

  useEffect(() => {
    const newCalendar = [];
    for (let i = 1; i <= numberOfDays; i++) {
      newCalendar.push(i);
    }
    setCalendar(newCalendar);
  }, [numberOfDays]);

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    setMonthVisible(month);
    setCurrentYear(year);
    setNumberOfDays(getNumberOfVisibleMonth(year, month + 1))
    setData(generateData());
  }, []);

  const data3 = [{ id: "mood", data: data }];

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <h3 className={styles.heading}>График настроения</h3>
        <div className={styles.buttonContainer}>
          <button className={styles.month} onClick={decrease}>
            <div className={styles.buttonContainer}>{arrowLeft}{getMonthName(monthVisible - 1)}</div>
          </button>
            <strong className={styles.monthVisible}>{getMonthName(monthVisible).toUpperCase()}</strong>
          <button className={styles.month} onClick={increase}>
            <div className={styles.buttonContainer}>{getMonthName(monthVisible + 1)}{arrowRight}</div>
          </button>
        </div>

      </div>

      <div className={styles.stackedSmiles}>
        <div>{simpleSmileIcon}</div>
        <div>{slightlySmileIcon}</div>
        <div>{expressionlessIcon}</div>
        <div>{confusedIcon}</div>
        <div>{worriedIcon}</div>
      </div>

      <ResponsiveLine
        data={data3}
        margin={{ top: 50, right: 0, bottom: 40, left: 33 }}
        // xScale={{ type: "point" }}
        curve="basis"
        lineWidth={1.5}
        enablePoints={false}
        enableGridX={false}
        enableGridY={false}
        enableArea={true}
        areaOpacity={0.1}
        colors={'#8A32E0'}
        animate={true}
        defs={[
          {
            id: 'gradient',
            type: 'linearGradient',
            colors: [
                { offset: 0, color: '#4c239d' },
                { offset: 50, color: '#4c239d' },
                { offset: 100, color: 'white' },
            ],
          },
        ]}
        fill={[
          { match: '*', id: 'gradient' },
        ]}
        axisLeft={null}
        axisBottom={null}
      />

      <div className={styles.xAxis}>
        {calendar && calendar.map(day => (
          <p key={day * 2} className={styles.xAxisText}>{day}</p>
        ))}
      </div>

    </div>
  );
};
