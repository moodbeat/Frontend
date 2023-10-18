import { useState } from "react";

import { API_ENDPOINT } from "@/apiConfig";

export const BASE_URL_MEDIA = `https://${API_ENDPOINT}/`;

export const BASE_URL_REQUEST = `${BASE_URL_MEDIA}api/v1`;

export const BASE_URL_WSS = `wss://${API_ENDPOINT}/ws`;

export const COUNT_EMPLOYEES_PAGE = 6;

// примение: импортировать и деструктиурировать countCardPage, addCard, на вход принимает требуемое количество отображаемых карточек первоначально
// countCardPage: количество отображаемых на экране карточек при приходе по общему массиву карточек сравниваем с индексом массива,
//                сравниваем с длиной общего массива для показа/удаления на экране кнопки пагинации
// addCard: функция для кнопки добавления карточек
// пример реализации в Employees
// {arr.map((item, index) => (
//   index < countCardPage ?
//   <>разметка карточки</> :
//   null
// ))}
// {countCardPage <= arr.length && <button onClick={addCard}>Кнопочка</button>}
export function usePagination(CONSTANT_PAGE: number) {
  const [countCardPage, setCountCardPage] = useState(CONSTANT_PAGE);
  const addCard = () => {
    setCountCardPage(countCardPage + CONSTANT_PAGE);
  };
  return { countCardPage, addCard };
}

export const faqItems = [
  {
    question: "Как сервис поможет в борьбе с выгоранием?",
    answer:
      "Выявление и предупреждение выгорания требует индивидуального подхода к каждому сотруднику. Наш сервис в первую очередь служит инструментом для предупреждения выгорания на основе построенной аналитики, исходя из собираемых с сотрудников данных.",
  },
  {
    question: "Какая функция позволяет сотрудникам оценивать своё настроение?",
    answer:
      'В сервисе есть функция "Оценка настроения", которая позволяет сотрудникам регулярно отслеживать свои эмоциональные состояния и выявлять тревожные тенденции.',
  },
  {
    question: "Какие преимущества прохождения опросов в сервисе?",
    answer:
      "Регулярное прохождение опросов помогает сотрудникам более осознанно подходить к своему состоянию, а также предоставляет HR ценную информацию для дальнейшего анализа и принятия мер по предотвращению выгорания.",
  },
  {
    question: "Как функция оценки прошедшего дня может помочь сотрудникам?",
    answer:
      "Оценка прошедшего дня позволяет сотрудникам рефлексировать и анализировать свои действия, успехи и неудачи, что способствует лучшему пониманию собственных эмоций и поведения",
  },
  {
    question: "Что представляют собой полезные статьи в сервисе?",
    answer:
      'В разделе "Полезные статьи" вы найдете информацию о психологическом благополучии, стратегиях противостояния стрессу и выгоранию, а также практические советы для повышения эффективности и удовлетворенности работой.',
  },
  {
    question: "Что такое мероприятия в контексте вашего сервиса?",
    answer:
      "Мероприятия – это различные события, организованные в рамках сервиса, например, вебинары, тренинги или групповые занятия, которые помогают сотрудникам научиться справляться с нагрузкой и стрессом",
  },
  {
    question: "Как HR может оценить состояние сотрудника с помощью сервиса?",
    answer:
      "HR имеет возможность просматривать обобщенные данные о состоянии сотрудников, полученные из опросов и оценок, что помогает выявить общие тенденции и поддерживать тех, кто может нуждаться в дополнительной помощи.",
  },
];

// не удачный эксперемент с хуком сортировки, оставлена на еще подумать
// export function useSort(arr: EmployeeInterface[]) {
//   // eсли survey код вида тестирования, то в этот массив нужно записать названия видов тестирования в зависимости от кода
//   const arrSurvey = ['Проверка', 'Диагностика эмоционального выгорания', 'Что-то', 'Задача', "Тестирование", 'Психолог', 'Врач', 'Психолог', 'Разговор', 'Финал'];
//   const [arrSort, setArrSort] = useState(arr);
//   const [isClick, setIsClick] = useState(false);

//   const [isSortName, setIsSortName] = useState(true);
//   const [isSortPosition, setIsSortPosition] = useState(true);
//   const [isSortState, setIsSortState] = useState(true);
//   const [isSortTest, setIsSortTest] = useState(true)
//   const [isSortData, setIsSortData] = useState(true)
//   const [isSortResult, setIsSortResult] = useState(true)

//   useEffect(()=>{
//     setArrSort(arr)
//   },[arr.length])

//   const sortField =
//   (
//     a:{
//       first_name: string, last_name: string, position: {name: string}, mental_state: {name: string},
//       survey: number, completion_date: string, result: string
//     },
//     b:{
//       first_name: string, last_name: string, position: {name: string}, mental_state: {name: string},
//       survey: number, completion_date: string, result: string
//     },
//     field: string
//   ) => {
//     let x = '';
//     let y = '';
//     switch(field) {
//       case 'name':
//         x = a.first_name + a.last_name;
//         y = b.first_name + b.last_name;
//       break;
//       case 'position':
//         x = a.position.name;
//         y = b.position.name;
//       break;
//       case 'state':
//         x = (a.mental_state !== null ? a.mental_state.name : 'яяя');
//         y = (b.mental_state !== null ? b.mental_state.name : 'яяя');
//       break;
//       case 'test':
//         x = arrSurvey[a.survey];
//         y = arrSurvey[b.survey];
//       break;
//       case 'data':
//         x = a.completion_date;
//         y = b.completion_date;
//       break;
//       case 'result':
//         x = a.result;
//         y = b.result;
//       break;
//       default:
//         x = '';
//         y = '';
//       break;
//     }
//     if (x < y) {return -1}
//     if (x > y) {return 1}
//     return 0;
//   }

//   const sortFields = (field: string, isSortField: boolean) => {
//     isSortField ?
//     setArrSort(arrSort.sort((a, b)=>sortField(a, b, field))) :
//     setArrSort(arrSort.sort((b, a)=>sortField(a, b, field)))
//   }

//   const sortName = () => {
//     setIsClick(!isClick);
//     setIsSortName(!isSortName);
//     sortFields('name', isSortName);
//   }
//   const sortPosition = () => {
//     setIsClick(!isClick);
//     setIsSortPosition(!isSortPosition);
//     sortFields('position', isSortPosition);
//   }
//   const sortState = () => {
//     setIsClick(!isClick);
//     setIsSortState(!isSortState);
//     sortFields('state', isSortState);
//   }
//   const sortTest = () => {
//     setIsSortTest(!isSortTest);
//     sortFields('test', isSortTest);
//   }
//   const sortData = () => {
//     setIsSortData(!isSortData);
//     sortFields('data', isSortData);
//   }
//   const sortResult = () => {
//     setIsSortResult(!isSortResult);
//     sortFields('result', isSortResult);
//   }
//   return {arrSort, isClick, sortName, sortPosition, sortState, sortTest, sortData, sortResult}
// }
