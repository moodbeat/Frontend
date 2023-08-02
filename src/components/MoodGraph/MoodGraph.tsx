import { ResponsiveBar, BarDatum} from "@nivo/bar";
import { useState, useEffect } from "react";
import { selectConditions, selectButtonConditions } from "@/store/reducers/conditionsBurnout/conditionsBurnoutReducer.ts";
import { useAppSelector } from "@/store/hooks.ts";
import { arrowLeft, arrowRight } from "@/assets";
import confusedIcon from '../../../public/confused.svg';
import simpleSmileIcon from '../../../public/simple-smile.svg';
import slightlySmileIcon from '../../../public/slightly-smile.svg';
import expressionlessIcon from '../../../public/expressionless.svg';
import worriedIcon from '../../../public/worried.svg';
import styles from "./MoodGraph.module.css";
import {UserConditionRecieved} from "@/types.ts";
import {useLocation} from "react-router";

const shamefulMonthsArray = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']

interface Props {
  conditionsData?: UserConditionRecieved[];
}

export const MoodGraph = ({conditionsData}: Props) => {
  const [data, setData] = useState <BarDatum[]>([{ x: 0, y: 0 }]);
  const [conditionValues, setConditionValues] = useState<UserConditionRecieved[]>([]);
  const [monthVisible, setMonthVisible] = useState <number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2023);
  const [numberOfDays, setNumberOfDays] = useState<number>(30);

  const conditionsRecieved = useAppSelector(selectConditions);
  const buttonConditions = useAppSelector(selectButtonConditions);
  const { pathname } = useLocation();

  function generateData (numberOfDays: number): BarDatum[] {

    //conditionsRecieved currentYear monthVisible numberOfDays входящие переменные, функцию можно вынести
    const renderData: BarDatum[] = [];

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
    return shamefulMonthsArray[monthNumber];
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

    setData(generateData(numberOfDays));
  }, [buttonConditions, pathname, conditionsData, conditionsRecieved]);

  useEffect(() => {
    const newNumberOfDays = getNumberOfVisibleMonth(currentYear, monthVisible + 1);
    setNumberOfDays(newNumberOfDays);
    setData(generateData(newNumberOfDays));
  }, [monthVisible, currentYear]);

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const numberOfDays = getNumberOfVisibleMonth(year, month + 1);
    setMonthVisible(month);
    setCurrentYear(year);
    setNumberOfDays(numberOfDays)
    setData(generateData(numberOfDays));
  }, []);

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
        <img src={simpleSmileIcon} alt="смайлик отличного настроения"/>
        <img src={slightlySmileIcon} alt="смайлик хорошего настроения"/>
        <img src={expressionlessIcon} alt="смайлик нормального настроения"/>
        <img src={confusedIcon} alt="смайлик так себе настроения"/>
        <img src={worriedIcon} alt="смайлик плохого настроения"/>
      </div>

      <ResponsiveBar
        data={data}
        margin={{ top: 50, right: 0, bottom: 40, left: 30 }}
        padding={0.35}
        // xScale={{ type: "point" }}
        keys={["y"]}
        indexBy={"x"}
        // curve="basis"
        // lineWidth={1.5}
        borderRadius={5}
        // enablePoints={false}
        enableGridX={false}
        enableGridY={false}
        enableLabel={false}
        // areaOpacity={0.1}
        animate={true}
        defs={[
          {
            id: 'gradient',
            type: 'linearGradient',
            colors: [
              { offset: 0, color: '#BA99FF' },
              { offset: 100, color: '#DCCDFC' },
            ],
          },
        ]}
        fill={[
          { match: '*', id: 'gradient' },
        ]}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
        }}
      />
    </div>
  );
};
