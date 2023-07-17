import React, {useEffect, useState} from 'react';
import styles from "./searchUseful.module.scss";
import {useAppSelector} from "@/store/hooks.ts";

interface Props {
  onSearch: any;
}

const SearchUseful: React.FC<Props> = ({onSearch}) => {
  const [inputValue, setInputValue] = useState('');

  const role = useAppSelector(
    (state) => state.currentUserSlice.currentUser.role
  );

  useEffect(() => {
    onSearch(inputValue);
  }, [inputValue])

  function handleInputChange(evt: { target: HTMLInputElement; }) {
    setInputValue(evt.target.value);

  }


  return (
    <div>
      <form className={styles.container}
        // onSubmit={handleSubmitSearch}
            noValidate>
        <input
          className={styles.input}
          type="text"
          placeholder="Поиск"
          value={inputValue}
          onChange={handleInputChange}
        />
        {(role === "hr" || role === "chief") &&
          <button
            className={styles.button}
            // onClick={}
          >+ Добавить</button>
        }

      </form>
    </div>
  );
};

export default SearchUseful;

