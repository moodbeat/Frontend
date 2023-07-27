import {Button} from "@/shared/ui/Button/Button.tsx";
import styles from './ButtonsList.module.scss';
import {ReactElement} from "react";

interface Props {
  handleCancelButton: () => void;
  handleSendActivities: () => void;
  disabled: boolean;
}
export const ButtonsList = ({handleCancelButton, handleSendActivities, disabled}: Props): ReactElement => {

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
        handleClick={handleSendActivities}
        disabled={disabled}
      />
    </div>
  );
};
