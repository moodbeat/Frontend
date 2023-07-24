import {Button} from "@/shared/ui/Button/Button.tsx";
import styles from './ButtonsList.module.scss';
import {ReactElement} from "react";

interface Props {
  handleCancelButton: () => void;
}
export const ButtonsList = ({handleCancelButton}: Props): ReactElement => {
  return (
    <div className={styles.buttonsList}>
      <Button
        mode='empty'
        title="Очистить"
        handleClick={handleCancelButton}
      />
      <Button
        mode="outline"
        title="Применить"
        width="242px"
      />
    </div>
  );
};
