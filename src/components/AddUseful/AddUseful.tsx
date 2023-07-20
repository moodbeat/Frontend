import * as React from 'react';
import {Field, Form, Formik} from 'formik';
import styles from "./addUseful.module.scss";
import * as Api from "@/shared/api/Api";

interface CardData {
  preview_image: string;
  title: string;
  description: string;
  category: string;
  url: string;
  text: string;
}

interface AddCardProps {
  onClose: () => void;
}

const initialValues: CardData = {
  preview_image: '',
  title: '',
  description: '',
  category: '',
  url: '',
  text: '',
};


const addCard = async (values: {}) => {
  try {
    await Api.addUseful(values)
      .then(() => {

          return;
        }
      )
      .then(() => {

        }
      )
  } catch (err: any) {

    console.log(err);
  }
}


const AddUseful: React.FC<AddCardProps> = ({onClose}: any) => {
  const handleSubmit = (values: CardData, {setSubmitting}: any) => {

    console.log(values);
    addCard(values);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.add_article}>Добавить публикацию материала</h3>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({isSubmitting}) => (
          <Form>
            <div className={styles.input_container}>
              <label htmlFor="preview_image" className={styles.subtitle}>Обложка</label>
              <Field type="text" name="preview_image" className={styles.preview_image}/>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="title" className={styles.subtitle}>Название</label>
              <Field type="text" placeholder="Введите название" name="title" className={styles.title}/>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="description" className={styles.subtitle}>Описание</label>
              <Field as="textarea" placeholder="Введите описание" name="description" className={styles.description}/>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="category" className={styles.subtitle}>Выберете теги</label>
              <Field type="text" name="category" className={styles.category}/>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="url" className={styles.subtitle}>Ссылка</label>
              <Field type="text" placeholder="Вставьте ссылку на ресурс" name="url" className={styles.url}/>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="text" className={styles.subtitle}>Содержание</label>
              <Field as="textarea" placeholder="Введите текст" name="text" className={styles.text}/>
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.cancel} disabled={isSubmitting}>
                Отмена
              </button>
              <button type="submit" className={styles.submit} disabled={isSubmitting}>
                Добавить
              </button>
            </div>


          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUseful;
