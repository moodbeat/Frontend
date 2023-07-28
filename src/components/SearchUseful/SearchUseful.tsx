import {useEffect, useState} from 'react';
import styles from "./searchUseful.module.scss";
import {useAppSelector} from "@/store/hooks";
import AddUseful from "@/components/AddUseful/AddUseful";

interface Props {
  onSearch: any;
}

const SearchUseful: React.FC<Props> = ({onSearch}: any) => {
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  const role = useAppSelector(
    (state) => state.currentUserSlice.currentUser.role
  );

  useEffect(() => {
    onSearch(inputValue);
  }, [inputValue])

  function handleInputChange(evt: { target: HTMLInputElement; }) {
    setInputValue(evt.target.value);
  }

  function openModal(event: any) {
    event?.preventDefault();
    setShowModal(true);
    console.log('open modal')
  }

  return (
    <div>
      {showModal ? <AddUseful onClose={() => setShowModal(false)}/> : null}
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
            onClick={openModal}
          >+ Добавить</button>
        }

      </form>
    </div>
  );
};

export default SearchUseful;

