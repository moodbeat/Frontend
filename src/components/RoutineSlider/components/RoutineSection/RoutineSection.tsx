import classes from './RoutineSection.module.scss';
import BtnBackground from '../../assets/routine-slider-btn.svg';
import React from "react";

interface RoutineSectionProps {
  name: string;
  color: string;
  width: number;
  onSliderSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const RoutineSection = ({
                      name,
                      color,
                      width,
                     onSliderSelect
                    }: RoutineSectionProps) => {
  return (
    <div
      className={classes.tag}
      style={{
        background: color,
        width: width + "%"
      }}
    >
      <span className={`${classes.tagText} ${classes.tagTextName}`}>{name}</span>
      <span className={`${classes.tagText} ${classes.tagTextPercentage}`}>{width + "%"}</span>

      <div
        className={classes.sliderButton}
        onPointerDown={onSliderSelect}
      >
        <img src={BtnBackground} height={"30%"} />
      </div>
    </div>
  );
};

