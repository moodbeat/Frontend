import {Button} from "@/shared/ui/Button/Button.tsx";
import styles from './ButtonsList.module.scss';
import {ReactElement} from "react";

interface Props {
  handleCancelButton: () => void;
  handleSendActivities: () => void;
  disabled: boolean;
  closeRoutineSlider: () => void;
}
export const ButtonsList = ({closeRoutineSlider, handleCancelButton, handleSendActivities, disabled}: Props): ReactElement => {

  const sendResultsAndClose = () => {
    handleSendActivities();
    closeRoutineSlider();
  }

  return (
    <div className={styles.buttonsList}>
      <Button
        mode='empty'
        title="Очистить"
        handleClick={handleCancelButton}
        disabled={disabled}
      />
      <Button
        mode="outline"
        title="Применить"
        width="242px"
        handleClick={sendResultsAndClose}
        disabled={disabled}
      />
    </div>
  );
};
