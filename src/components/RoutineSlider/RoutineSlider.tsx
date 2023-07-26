import {ReactElement, useEffect, useRef, useState} from 'react';
import { RoutineSection } from "@/components/RoutineSlider/components/RoutineSection/RoutineSection.tsx";
import { getPercentage, limitNumberWithinRange, nearestN } from "@/components/RoutineSlider/RoutineSlider.helpers.ts";
import classes from './routineslider.module.scss';
import {ButtonsList} from "@/components/RoutineSlider/components/ButtonsList/ButtonsList.tsx";
import * as Api from "@/shared/api/Api.ts";
import {TagsInterface} from "@/types.ts";

interface Props {
  data: TagsInterface[];
  handleTags: (data: TagsInterface[]) => void;
  handleWidths: (data: number[]) => void;
  tags: TagsInterface[];
  widths: number[];
}

export const RoutineSlider = ({data, handleTags, handleWidths, widths, tags}: Props): ReactElement => {
  const RoutineSliderRef = useRef<HTMLDivElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      handleWidths(new Array(data.length).fill(100 / data.length));
      handleTags(data);
    }
  }, [data]);

  const handleCancelButton = () => {
    handleTags(data)
    handleWidths(new Array(data.length).fill(100 / data.length))
  }

  async function handleSendActivities() {
    const activities = tags.map((item, index) => ({
      type: item.id,
      percentage: widths[index]
    }));
    const emptyActivities = data.filter(item => !tags.includes(item)).map((item) => ({
      type: item.id,
      percentage: 0
    }));
    try {
      await Api.sendActivities(activities.concat(emptyActivities));
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Чем был наполнен ваш день сегодня?</h2>
      <div
        ref={RoutineSliderRef}
        className={classes.routineSlider}
      >
        {tags.map((tag, index) => (
          <RoutineSection
            width={widths[index]}
            key={index}
            name={tag.name}
            onSliderSelect={(e) => {
              e.preventDefault();
              document.body.style.cursor = "ew-resize";

              const startDragX = e.pageX;
              const sliderWidth = RoutineSliderRef.current?.offsetWidth || 0;

              if (!startDragX || sliderWidth === 0) return;

              const resize = (e: any) => {
                e.preventDefault();
                const endDragX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
                const distanceMoved = endDragX - startDragX;
                const maxPercent = widths[index] + widths[index + 1];

                const percentageMoved = nearestN(1, getPercentage(sliderWidth, distanceMoved))
                // const percentageMoved = getPercentage(sliderWidth, distanceMoved);

                const _widths = widths.slice();

                const prevPercentage = _widths[index];

                const newPercentage = prevPercentage + percentageMoved;
                _widths[index] = limitNumberWithinRange(
                  newPercentage,
                  0,
                  maxPercent
                );

                const nextSectionIndex = index + 1;

                const nextSectionNewPercentage =
                  _widths[nextSectionIndex] - percentageMoved;
                _widths[nextSectionIndex] = limitNumberWithinRange(
                  nextSectionNewPercentage,
                  0,
                  maxPercent
                );

                if (tags.length > 2) {
                  if (_widths[index] === 0) {
                    _widths[nextSectionIndex] = maxPercent;
                    _widths.splice(index, 1);
                    handleTags(tags.filter((_, i) => i !== index));
                    removeEventListener();
                  }
                  if (_widths[nextSectionIndex] === 0) {
                    _widths[index] = maxPercent;
                    _widths.splice(nextSectionIndex, 1);
                    handleTags(tags.filter((_, i) => i !== nextSectionIndex));
                    removeEventListener();
                  }
                }

                handleWidths(_widths);
                setIsButtonDisabled(false);
              };

              window.addEventListener("pointermove", resize);
              window.addEventListener("touchmove", resize);

              const removeEventListener = () => {
                window.removeEventListener("pointermove", resize);
                window.removeEventListener("touchmove", resize);
              };

              const handleEventUp = (e: Event) => {
                e.preventDefault();
                document.body.style.cursor = "initial";
                removeEventListener();
              };

              window.addEventListener("touchend", handleEventUp);
              window.addEventListener("pointerup", handleEventUp);
            }}
            color={tag.color}
          />
        ))}
      </div>
      <ButtonsList disabled={isButtonDisabled} handleCancelButton={handleCancelButton} handleSendActivities={handleSendActivities}/>
    </div>
  );
};
