import styles from "./BurnoutLevel.module.css";
import { ResponsiveBar } from "@nivo/bar";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectBurnoutLevel } from "@/store/reducers/conditionsBurnout/conditionsBurnoutReducer";
import { DataBurnOutInterface, UserBurnoutLevel } from "@/types.ts";
import { useLocation } from "react-router";

interface Props {
  burnOutData?: UserBurnoutLevel[];
}

export const BurnoutLevel = ({ burnOutData }: Props) => {
  const [data, setData] = useState<DataBurnOutInterface[]>([]);
  const [burnoutValues, setBurnoutValues] = useState<UserBurnoutLevel[]>([]);
  const burnoutLevel = useAppSelector(selectBurnoutLevel);
  const { pathname } = useLocation();

  const generateData = () => {
    setData([]);
    burnoutValues?.map((item, index) => {
      const burnout: DataBurnOutInterface = {
        day: index + 1,
        degress: item.percentage,
      };
      setData((prevState) => [...prevState, burnout]);
    });
  };

  useEffect(() => {
    if (burnOutData) {
      setBurnoutValues(burnOutData.slice(0));
    } else if (pathname === "/" && burnoutLevel) {
      setBurnoutValues(burnoutLevel.slice(0));
    }
  }, [pathname, burnOutData, burnoutLevel]);

  useEffect(() => {
    generateData();
  }, [burnoutValues]);

  return (
    <div className={pathname !== '/' ? `${styles.container} ${styles.containerPlaceProfile}` : styles.container}>
      <div className={styles.topContainer}>
        <h3 className={styles.heading}>Уровень выгорания</h3>
      </div>
      <div className={styles.yAxis}></div>
      <div className={styles.xAxis}></div>
      <ResponsiveBar
        data={data}
        keys={["degress"]}
        indexBy="day"
        margin={{ top: 20, right: 20, bottom: 45, left: 20 }}
        padding={0.75}
        valueScale={{ type: "linear" }}
        colors="#8A32E0"
        borderRadius={5}
        animate={true}
        enableGridY={false}
        enableLabel={false}
        axisLeft={null}
        axisBottom={null}
      />
    </div>
  );
};
