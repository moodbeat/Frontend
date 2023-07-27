import {ResponsivePie} from "@nivo/pie";
import styles from './PieChart.module.scss';
import {TagsInterface, DateObject} from "@/types.ts";
import {ReactElement, useEffect, useState} from 'react';
import {getActivities} from "@/shared/api/Api.ts";
import {getCurrentDateAndFutureDate} from "@/pages/main/components/PieChart/PieChart.helpers.ts";
import {PeriodPicker} from "@/pages/main/components/PieChart/components/PeriodPicker.tsx";

interface Props {
  data: TagsInterface[];
  id: string | number;
  widths: number[];
}

interface PieChartDataInterface {
  id: string;
  label: string;
  value: number;
}

interface PieDataProps {
  data: PieChartDataInterface[];
  colors: string[];
}

const MyResponsivePie = ({ data, colors }: PieDataProps): ReactElement => (
  <ResponsivePie
    data={data}
    colors={colors}
    arcLabelsTextColor="white"
    margin={{ top: 0, right: 50, bottom: 90, left: 0 }}
    innerRadius={0.55}
    enableArcLinkLabels={false}
    valueFormat={(value) => `${value}%`}
    legends={[
      {
        anchor: 'bottom',
        direction: 'column',
        justify: false,
        translateX: -86,
        translateY: 70,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: '#000',
        itemDirection: 'left-to-right',
        itemOpacity: 1,
        symbolSize: 12,
        symbolShape: 'circle',
      }
    ]}
  />
);

export const PieChart = ({data, id, widths}: Props): ReactElement => {
  const [activities, setActivities] = useState<any>([]);
  const [pieChartData, setPieChartData] = useState<PieChartDataInterface[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [datesArray, setDatesArray] = useState<DateObject[]>([]);
  const [valueOfDatePicker, setValueOfDatePicker] = useState("");

  console.log(activities);

  useEffect(() => {
    const dates = getCurrentDateAndFutureDate(valueOfDatePicker);
    console.log(dates);
    setDatesArray(dates);
  }, [valueOfDatePicker]);

  useEffect(() => {
    getPieChartActivities(id, datesArray)
  }, [datesArray]);

  useEffect(() => {
    const colorsArr: string[] = [];
    if (activities && activities.length > 0 && data) {
      setPieChartData(data.map((item: TagsInterface, index: number) => ({
          id: item.name,
          label: item.name,
          value: Number(widths[index]),
        }))
      );

      data.forEach((item) => {
        colorsArr.push(item.color);
      })
      setColors(colorsArr);
    }
  }, [activities, data, widths, datesArray]);

  const handleChooseOption = (option: string) => {
    setValueOfDatePicker(option);
  }

  async function getPieChartActivities(id: string | number, datesArray: DateObject[]) {
    try {
      const response = await getActivities(id, datesArray);
      console.log(response.data.results);
      setActivities(response.data.results);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      {pieChartData.length !== 0 && colors.length !== 0 && <MyResponsivePie data={pieChartData} colors={colors}/>}
      <PeriodPicker handleChooseOption={handleChooseOption} value={valueOfDatePicker} />
    </div>
  );
};
