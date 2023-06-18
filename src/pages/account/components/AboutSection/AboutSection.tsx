import styles from "./aboutsection.module.scss";
import PseudoInput from "@/pages/account/components/PseudoInput/PseudoInput";
import { ErrorMessage } from "@/shared/ui/ErrorMessage/ErrorMessage";
import { useAppSelector } from "@/store/hooks";
import { selectUserInfo } from "@/store/reducers/currentUser/currentUserReducer";
import React, { ReactElement } from "react";

interface Props {
  about: string;
  aboutError: string;
  aboutHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const AboutSection = ({
  about,
  aboutError,
  aboutHandler,
}: Props): ReactElement => {
  const currentUser = useAppSelector(selectUserInfo);

  return (
    <ul className={styles.contentAbout}>
      <li className={styles.contentAboutItem}>
        <PseudoInput label="Имя" placeholder={currentUser.first_name} />
        <PseudoInput label="Фамилия" placeholder={currentUser.last_name} />
      </li>
      <li className={styles.contentAboutItem}>
        <PseudoInput label="Телефон" placeholder={currentUser.phone} />
        <PseudoInput label="Почта" placeholder={currentUser.email} />
      </li>
      <li className={styles.contentAboutItem}>
        <div className={styles.interests}>
          <h3 className={styles.contentAboutTitle}>Интересы</h3>
        </div>
        <div className={styles.about}>
          <h3 className={styles.contentAboutTitle}>Обо мне</h3>
          <textarea
            className={styles.aboutTextarea}
            value={about}
            name={about}
            onChange={(e) => aboutHandler(e)}
            maxLength={257}
          />
          {aboutError && (
            <div className={styles.aboutError}>
              <ErrorMessage>{aboutError}</ErrorMessage>
            </div>
          )}
        </div>
      </li>
    </ul>
  );
};