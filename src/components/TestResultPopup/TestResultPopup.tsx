import React, { useEffect, useState } from "react";
import styles from "./testResultPopup.module.css";
import { WarningWithBall } from "../WarningWithBall/WarningWithBall";
import cn from "classnames";

import { ExpressDiagnoseResponse } from "@/types";

interface TestResultPopup {
  resultOfPsychoTest?: ExpressDiagnoseResponse;
  isVisible: boolean,
  onClose: () => void
  isTestsReulstLocated: boolean;
}

export const TestResultPopup: React.FC<TestResultPopup> = ({resultOfPsychoTest, isVisible, onClose, isTestsReulstLocated}) => {

  const [isResultsPopapVisible, setResultsPopapVisible] = useState<boolean | undefined>(false);
  // const [resultExplanation, setResultExplanation] = useState<string>('');

  const closePopupClassname = cn(styles.resultsPopup, {
    [styles.hidden] : isResultsPopapVisible === false,
    [styles.testsLocated] : isTestsReulstLocated === true
  })



  function handleClose () {
    setResultsPopapVisible(false);
    if (onClose) onClose();
  }

  function handleCallChief () {
    alert("Отправлена заявка на разговор с руководителем");
  }

  useEffect(() => (setResultsPopapVisible(isVisible)), [isVisible]);


  // useEffect(() => {
  //   if (resultOfPsychoTest?.result === 'Нормальное состояние') {
  //   setResultExplanation('В настоящий момент эмоциональное выгорание вам не грозит. Чтобы сохранить такое состояние в будущем, следуйте рекомендациям психологов, указанным ниже.');
  // } else if (resultOfPsychoTest?.result === 'Тревожное') {
  //   setResultExplanation('У вас есть признаки эмоционального выгорания. По возможности советуем взять небольшой отпуск.')
  // } else if (resultOfPsychoTest?.result === 'В группе риска') {
  //   setResultExplanation('Вы находитесь в активной стадии эмоционального выгорания. Пожалуйста, обратитесь за помощью к своему руководителю или психотерапевту.')
  // }
  // }, [resultOfPsychoTest])

  return (
    <section className={closePopupClassname}>
      <h1 className={styles.title}>Экспресс-оценка выгорания</h1>
      <h2 className={styles.subtitle}>Ваш результат</h2>

      <div className={styles.conditionContainer}>
        <h3 className={styles.conditionText}>Состояние:</h3>
        <WarningWithBall resultOfPsychoTest={resultOfPsychoTest}/>
      </div>

      {/* <p>{resultExplanation}</p> */}
      <p>{resultOfPsychoTest?.mental_state.message}</p>
      <h2 className={styles.subtitle}>Рекомендации</h2>
      {/* <ol className={styles.list}>
        <li>
          <p>Определение краткосрочных и долгосрочных целей в трудовой деятельности.</p>
        </li>
        <li>
          <p>Отстаивание своих границ, отказ от дополнительной нагрузки.</p>
        </li>
        <li>
          <p>Соблюдение режима дня, сон не менее 8 часов, регулярное питание.</p>
        </li>
        <li>
          <p>Использование 10-15 минутных перерывов в работе, для снятия психоэмоционального напряжения.</p>
        </li>
        <li>
          <p>Самоконтроль своего состояния, отслеживание чувств и эмоций.</p>
        </li>
        <li>
          <p>Регулярные посильные физические нагрузки, прогулки на свежем воздухе.</p>
        </li>
        <li>
          <p>Переключение. Занятия делом, не связанным с профессиональной деятельностью (хобби, кино, развлечения)</p>
        </li>
      </ol> */}
      {resultOfPsychoTest?.survey.text}
      <div className={styles.buttonContainer}>
        {(resultOfPsychoTest?.mental_state.name !== "Нормальное") && <button type='button' onClick={handleCallChief} className={styles.button}>Обсудить с руководителем</button>}
        <button type='button' onClick={handleClose} className={styles.buttonBack}>Закрыть</button>
      </div>
      <button type='button' onClick={handleClose} className={styles.closeBtn}/>
    </section>
  );
};
