import {ResponsivePie} from "@nivo/pie";
import styles from './PieChart.module.scss';
import {TagsInterface} from "@/types.ts";
import {ReactElement, useEffect, useState} from 'react';
import {useRequest} from "@/shared/hooks/useRequest.tsx";
import {getActivities} from "@/shared/api/Api.ts";

interface Props {
  data: TagsInterface[];
  id: string | number;
  widths: any;
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
  const [activities] = useRequest(() => getActivities(id));
  const [pieChartData, setPieChartData] = useState<PieChartDataInterface[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const colorsArr: string[] = [];
    if (activities && activities.results.length > 0 && data) {
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
  }, [activities, data, widths]);

  return (
    <div className={styles.container}>
      {pieChartData.length !== 0 && colors.length !== 0 && <MyResponsivePie data={pieChartData} colors={colors}/>}
    </div>
  );
};
