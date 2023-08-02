import {BarDatum, ResponsiveBar} from "@nivo/bar";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {selectButtonConditions, selectConditions} from "@/store/reducers/conditionsBurnout/conditionsBurnoutReducer.ts";
import {useAppSelector} from "@/store/hooks.ts";
import {arrowLeft, arrowRight} from "@/assets";
import confusedIcon from '../../../public/confused.svg';
import simpleSmileIcon from '../../../public/simple-smile.svg';
import slightlySmileIcon from '../../../public/slightly-smile.svg';
import expressionlessIcon from '../../../public/expressionless.svg';
import worriedIcon from '../../../public/worried.svg';
import styles from "./MoodGraph.module.css";
import {UserConditionRecieved} from "@/types.ts";

const shamefulMonthsArray = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

interface Props {
  conditionsData?: UserConditionRecieved[];
}

export const MoodGraph = ({conditionsData}: Props) => {
  const [data, setData] = useState <BarDatum[]>([{ x: 0, y: 0 }]);
  const [conditionValues, setConditionValues] = useState<UserConditionRecieved[]>([]);
  const [monthVisible, setMonthVisible] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2023);
  const [numberOfDays, setNumberOfDays] = useState<number>(30);

  const conditionsRecieved = useAppSelector(selectConditions);
  const buttonConditions = useAppSelector(selectButtonConditions);

  const { pathname } = useLocation();

  function generateData (numberOfDays: number): BarDatum[] {

    const renderData: BarDatum[] = [];

    const yearFilteredArray = conditionValues?.filter(item => {
      const conditionYear = new Date(item.date).getFullYear();
      return conditionYear === currentYear;
    });

    const monthFilteredArray = yearFilteredArray?.filter(item => {
      const conditionMonth = new Date(item.date).getMonth();
      return conditionMonth === monthVisible;
    });

    for (let i = 1; i <= numberOfDays; i++) {
      renderData.push({
        x: i.toString(),
        y: 0,
      });
    }

    if (monthFilteredArray) {
      monthFilteredArray?.reverse().forEach((item) => {
        const day = new Date(item.date).getUTCDate();

        if (renderData[day - 1]?.x === day.toString()) {
          renderData[day - 1].y = item.mood;
        }
      });
    }

    return renderData;
  }

  function getMonthName(monthNumber: number): string {
    return shamefulMonthsArray[monthNumber];
  }

  function decrease(): void {
    if (monthVisible - 1 >= 0) {
      setMonthVisible(prevstate => prevstate - 1);
    } else if (monthVisible - 1 < 0) {
      setMonthVisible(11);
    }
  }

  function increase(): void {
    if (monthVisible + 1 <= 11) {
      setMonthVisible(prevstate => prevstate + 1);
    } else if (monthVisible + 1 > 11) {
      setMonthVisible(0);
    }
  }

  function getNumberOfVisibleMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
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
    setNumberOfDays(numberOfDays);
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
        margin={{top: 50, right: 0, bottom: 40, left: 30}}
        padding={0.35}
        keys={["y"]}
        indexBy={"x"}
        borderRadius={5}
        enableGridX={false}
        enableGridY={false}
        enableLabel={false} // Set this to true to enable labels on the bars
        animate={true}
        defs={[
          {
            id: 'gradient',
            type: 'linearGradient',
            colors: [
              {offset: 0, color: '#BA99FF'},
              {offset: 100, color: '#DCCDFC'},
            ],
          },
        ]}
        fill={[
          {match: '*', id: 'gradient'},
        ]}
        axisLeft={null}
        axisBottom={{
          tickSize: 0,
        }}
        theme={{
          axis: {
            ticks: {
              line: {
                strokeWidth: 1.5, // Here's the lineWidth customization
              },
            },
          },
        }}
      />
    </div>
  );
};
