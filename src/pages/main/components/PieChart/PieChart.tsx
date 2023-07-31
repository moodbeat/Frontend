import styles from "./PieChart.module.scss";
import {PieChartDataInterface, TagsInterface} from "@/types.ts";
import {ReactElement, useEffect, useRef, useState} from "react";
import { getActivities } from "@/shared/api/Api.ts";
import { PeriodPicker } from "@/pages/main/components/PieChart/components/PeriodPicker/PeriodPicker.tsx";
import {useOutsideClick} from "@/shared/hooks/useOutsideClick.tsx";
import {MyResponsivePie} from "@/pages/main/components/PieChart/components/MyResponsivePie(lib)/MyResponsivePie.tsx";

interface Props {
  data: TagsInterface[];
  id: string | number;
  widths: number[];
  isRoutingSliderVisible: boolean;
  initialData: TagsInterface[];
}

interface Activity {
  type_name: string;
  average_percentage: number;
}

export const PieChart = ({ data, initialData, id, widths, isRoutingSliderVisible }: Props): ReactElement => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pieChartData, setPieChartData] = useState<PieChartDataInterface[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [valueOfDatePicker, setValueOfDatePicker] = useState<string>('');
  const [day, setDay] = useState<number>(0);
  const [userSelectedPeriod, setUserSelectedPeriod] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emptyMessageVisible, setEmptyMessageVisible] = useState<boolean>(false);
  const ref = useRef<null>(null);

  useEffect(() => {
    if(userSelectedPeriod && !isLoading && activities.length === 0) {
      setEmptyMessageVisible(true);
    } else {
      setEmptyMessageVisible(false);
    }
  }, [userSelectedPeriod, isLoading, activities])

  useEffect(() => {
    getPieChartActivities(id, day, '', '');
  }, [day]);

  useEffect(() => {
    if(data) {
      const colorsArr: string[] = [];
      setPieChartData(
        data.map((item, index: number) => ({
          id: item.name,
          label: item.name,
          value: Number(widths[index]),
        }))
      )
      data.forEach((item) => {
        colorsArr.push(item.color);
      });
      setColors(colorsArr);
    }
  }, [data, widths])

  useEffect(() => {
    const colorsArr: string[] = [];
    if (activities && activities.length !== 0) {
      const updatedPieChartData = activities.map((item: Activity) => ({
        id: item.type_name,
        label: item.type_name,
        value: item.average_percentage,
      }));

      setPieChartData(updatedPieChartData);

      activities.forEach((activity: Activity) => {
        initialData.forEach((item: TagsInterface) => {
          if (activity.type_name === item.name) {
            colorsArr.push(item.color);
          }
        });
      });

      setColors(colorsArr);
    }
  }, [activities]);


  const handleChooseOption = (option: string) => {
    setValueOfDatePicker(option);
    switch(option) {
      case 'Сегодня':
        setDay(1);
        break;
      case 'За неделю':
        setDay(7);
        break;
      case 'За месяц':
        setDay(30);
        break;
      case 'За все время':
        setDay(365);
        break;
    }

    setUserSelectedPeriod(true);
  };

  useOutsideClick(() => setEmptyMessageVisible(false), ref);

  async function getPieChartActivities(
    id: string | number,
    days: number,
    after_date: string,
    before_date: string
  ) {
    setIsLoading(true);
    try {
      const response = await getActivities(id, days, after_date, before_date);
      if(response) {
        setActivities(response.data);
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  console.log(activities);

  return (
    <div ref={ref} onClick={() => setEmptyMessageVisible(false)} className={styles.container}>
      {pieChartData.length !== 0 && colors.length !== 0 &&
        <MyResponsivePie data={userSelectedPeriod && activities.length === 0 ? [] : pieChartData} colors={colors} />
      }
      {
        !isRoutingSliderVisible &&
        <PeriodPicker
          handleChooseOption={handleChooseOption}
          value={valueOfDatePicker}
          getPieChartActivities={getPieChartActivities}
        />
      }
      {userSelectedPeriod && isLoading && <div></div>}
      {emptyMessageVisible &&
        <p className={styles.emptyMessage}>Нет данных за указанный период.</p>
      }
    </div>
  );
};
