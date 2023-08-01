import styles from "./tests.module.css";
import {useOnlineCheck} from "@/shared/hooks/useOnlineCheck";
import {Navbar} from "@/components/Navbar/Navbar";
import {ContainerContent} from "@/shared/components/ContainerContent/ContainerContent";
import {BurnoutTestBanner} from "@/components/BurnoutTestBanner/BurnoutTestBanner";
import {Records} from "@/components/Records/Records";
import {WheelBanner} from "@/components/WheelBanner/WheelBanner";
import {BadInternetConnection} from "@/components/BadInternetConnection/BadInternetConnection";
import {ExpressDiagnoseResponse} from "@/types";
import React from "react";
import {ButtonTelegramm} from "@/components/ButtonTelegramm/ButtonTelegramm";

interface Tests {
  allTestsResults?: ExpressDiagnoseResponse[]
}

export const Tests: React.FC<Tests> = ({allTestsResults}) => {

  const isOnline = useOnlineCheck();

  return (
    <div className="page-container">
      <Navbar/>
      {isOnline ?
        <ContainerContent>
          <div className={styles.tests}>
            <h2 className={styles.title}>Тесты</h2>
            <div className={styles.banerblock}>
              <BurnoutTestBanner id='burnout'/>
              <WheelBanner/>
            </div>
            <div className={styles.records}>
              <h3 className={styles.subtitle}>Пройденные тесты</h3>
              <Records allTestsResults={allTestsResults}/>
            </div>
            <ButtonTelegramm/>
          </div>
        </ContainerContent>
        : <BadInternetConnection/>}
    </div>
  );
};
