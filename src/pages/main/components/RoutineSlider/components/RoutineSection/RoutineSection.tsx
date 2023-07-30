import classes from './RoutineSection.module.scss';
import BtnBackground from '../../assets/routine-slider-btn.svg';
import React, {useState} from "react";

interface RoutineSectionProps {
  name: string;
  color: string;
  width: number;
  tooltipMessage: string;
  onSliderSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const RoutineSection = ({
                      name,
                      tooltipMessage,
                      color,
                      width,
                     onSliderSelect
                    }: RoutineSectionProps) => {

  const [isTooltipOpened, setIsTooltipOpened] = useState(false);

  return (
    <div
      className={classes.tag}
      style={{
        background: color,
        width: width + "%"
      }}
    >
      <div className={classes.textWrapper}>
        <span className={`${classes.tagText} ${classes.tagTextName}`}>{name}</span>
        <button className={classes.questionBtn} onMouseEnter={() => setIsTooltipOpened(true)} onMouseLeave={() => setIsTooltipOpened(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
            <g clipPath="url(#clip0_5127_121762)">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.125 12C9.43871 12 12.125 9.31371 12.125 6C12.125 2.68629 9.43871 0 6.125 0C2.81129 0 0.125 2.68629 0.125 6C0.125 9.31371 2.81129 12 6.125 12ZM6.76928 6.99512C6.68983 7.35498 6.48327 7.56445 6.10721 7.56445C5.65699 7.56445 5.39216 7.25293 5.39216 6.8125V6.7373C5.39216 6.10352 5.71526 5.68457 6.34026 5.31396C7.02352 4.90039 7.23009 4.63184 7.23009 4.1377C7.23009 3.61133 6.82755 3.24609 6.24492 3.24609C5.72585 3.24609 5.37627 3.50391 5.20678 3.98193C5.07437 4.32568 4.83602 4.47607 4.51293 4.47607C4.09449 4.47607 3.825 4.21289 3.825 3.80469C3.825 3.57373 3.88793 3.36963 3.99386 3.16553C4.33284 2.45654 5.1803 2 6.31907 2C7.82331 2 8.825 2.84854 8.825 4.1C8.825 4.91104 8.44831 5.45361 7.70149 5.89941C6.99704 6.31299 6.83814 6.54395 6.76928 6.99512ZM6.98644 9.15674C6.98644 9.62939 6.59979 10 6.1178 10C5.64111 10 5.25445 9.62939 5.25445 9.15674C5.25445 8.68408 5.64111 8.31348 6.1178 8.31348C6.59979 8.31348 6.98644 8.68408 6.98644 9.15674Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_5127_121762">
                <rect width="12" height="12" fill="white" transform="translate(0.125)"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <p className={`${classes.tagText} ${classes.tagTextPercentage}`}>{width + "%"}</p>
      <div
        className={classes.sliderButton}
        onPointerDown={onSliderSelect}
      >
        <img alt="кнопка перетаскивания ползунка" src={BtnBackground} height={"30%"} />
      </div>
      {isTooltipOpened &&
        <div className={classes.tooltip}>
          <div className={classes.tooltipArrow}></div>
          <p className={classes.tooltipText}>{tooltipMessage}</p>
        </div>
      }
    </div>
  );
};

