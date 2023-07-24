import { useEffect, useRef, useState } from 'react';
import { useRequest } from "@/shared/hooks/useRequest.tsx";
import { getActivityTypes } from "@/shared/api/Api.ts";
import { RoutineSection } from "@/components/RoutineSlider/components/RoutineSection/RoutineSection.tsx";
import { getPercentage, limitNumberWithinRange, nearestN } from "@/components/RoutineSlider/RoutineSlider.helpers.ts";
import classes from './routineslider.module.scss';
import {ButtonsList} from "@/components/RoutineSlider/components/ButtonsList/ButtonsList.tsx";

interface TagsInterface {
  id: number;
  name: string;
  description: string;
  key: number;
  color: string;
}

export const RoutineSlider = () => {
  const [data] = useRequest(getActivityTypes);
  const [widths, setWidths] = useState<number[]>([]);
  const RoutineSliderRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<TagsInterface[]>([]);

  useEffect(() => {
    if (data) {
      setWidths(new Array(data.length).fill(100 / data.length));
      setTags(data);
    }
  }, [data]);

  const handleCancelButton = () => {
    setTags(data)
    setWidths(new Array(data.length).fill(100 / data.length))
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
                    setTags(tags.filter((_, i) => i !== index));
                    removeEventListener();
                  }
                  if (_widths[nextSectionIndex] === 0) {
                    _widths[index] = maxPercent;
                    _widths.splice(nextSectionIndex, 1);
                    setTags(tags.filter((_, i) => i !== nextSectionIndex));
                    removeEventListener();
                  }
                }

                setWidths(_widths);
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
      <ButtonsList handleCancelButton={handleCancelButton}/>
    </div>
  );
};
