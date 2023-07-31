import {forwardRef, Ref} from "react";
import styles from './CustomInput.module.scss';

interface CustomInputProps {
  selectedDate: Date | null;
  onClick: () => void;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ selectedDate, onClick }: CustomInputProps, ref: Ref<HTMLInputElement>) => {

  return (
    <div className={styles.customInput}>
      <input
        ref={ref}
        type="text"
        value={selectedDate ? selectedDate.toLocaleDateString('ru') : ''}
        placeholder="__.__.____"
        readOnly
        onClick={onClick}
      />
      {!selectedDate && <div className={styles.customIcon} onClick={onClick}></div>}
    </div>
  )
});
