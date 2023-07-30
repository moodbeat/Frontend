import {ReactElement} from "react";
import {ResponsivePie} from "@nivo/pie";
import {PieChartDataInterface} from "@/types.ts";

interface PieDataProps {
  data: PieChartDataInterface[];
  colors: string[];
}

export const MyResponsivePie = ({ data, colors }: PieDataProps): ReactElement => {

  return (
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
          anchor: "bottom",
          direction: "column",
          justify: false,
          translateX: -86,
          translateY: 70,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#000",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 12,
          symbolShape: "circle",
        },
      ]}
    />
  );
}
