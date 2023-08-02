import { ResponsiveRadar } from '@nivo/radar';
import { WheelResultItem } from "@/types";

interface Props {
  chartData: WheelResultItem[];
  step: number;
  location?: string;
}

export const Radar = ({ chartData, step, location }: Props) => {
  const formattedData = chartData.map((item) => {
    if (step === 2) {
      return {
        "life-direction": item["life-direction"],
        "Приоритет": item["Приоритет"],
        "Текущее состояние": item["Текущее состояние"],
      };
    } else {
      return {
        "life-direction": item["life-direction"],
        "Результат": item["Результат"],
      };
    }
  });

  const customGridLabel = ({ id, angle }: any) => {
    const radius = 205;

    // Переводим угол из градусов в радианы
    const radians = (angle - 90) * (Math.PI / 180);

    // Рассчитываем координаты для метки
    const x = (radius - 5) * Math.cos(radians);
    const y = (radius - 15) * Math.sin(radians);

    if (location === 'profile') {
      return (
        <text style={{ display: "none" }}>
          {id}
        </text>
      )
    } else {
      return (
        <g transform={`translate(${x}, ${y})`}>
          <text
            x={10} // Сдвигаем текст на небольшое расстояние от точки на окружности
            y={0}
            textAnchor={x > 0 ? "start" : "end"} // Определяем выравнивание текста в зависимости от его положения по x
            style={{ fontSize: "14px", fontFamily: 'Roboto', fill: '#99A2AD' }}
          >
            {id}
          </text>
        </g>
      );
    }
  };


  return (
    <ResponsiveRadar
      data={formattedData}
      keys={step === 2 ? ["Приоритет", "Текущее состояние"] : ["Результат"]}
      indexBy="life-direction"
      maxValue={10}
      valueFormat=">-.2f"
      margin={location === 'profile' ? { top: 0, right: 0, bottom: 0, left: 0 } : { top: 90, right: 90, bottom: 90, left: 60 }}
      borderColor={{ from: 'color' }}
      dotSize={7}
      dotColor={{ from: 'color', modifiers: [] }}
      dotBorderWidth={2}
      gridLabel={customGridLabel}
      colors={
        step === 0
          ? ['rgba(138, 50, 224, 1)']
          : step === 1
            ? ['rgba(252, 242, 2, 1)']
            : ['rgba(138, 50, 224, 1)', 'rgba(252, 242, 2, 1)']
      }
      gridLevels={10}
    />
  );
};
