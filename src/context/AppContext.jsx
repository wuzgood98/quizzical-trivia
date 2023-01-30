import { useContext, createContext, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid'
import { reducer } from "../utils/reducer";

const URL = "https://opentdb.com/api.php?"
const AppContext = createContext()

const initialState = {
  data: [],
  loading: true,
  category: "any",
  type: "any",
  difficulty: "any",
  amount: 5,
  categoryText: "any",
  difficultyText: "any",
  typeText: "any",
  score: 0,
  answersChecked: false,
  quizStarted: false,
  isChoosingOptions: false,
  categoryOpen: false,
  difficultyOpen: false,
  typeOpen: false,
  allAnswersSelected: true,
}


const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchQuestions = async () => {
    dispatch({ type: "load" })
    try {
      const res = await fetch(`${URL}amount=${state.amount}${state.category === "any" ? "" : `&category=${state.category}`}${state.type === "any" ? "" : `&type=${state.type}`}${state.difficulty === "any" ? "" : `&difficulty=${state.difficulty}`}`)
      const data = await res.json()

      dispatch({ type: "display_questions", payload: setQuestions(data.results) })

    } catch (error) {
      console.log(error)
    }
  }

  /* Fisher-Yates shuffle algorithm to randomize the placement of answers */
  function randomizeAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[randomIndex]] = [answers[randomIndex], answers[i]];
    }
    return answers
  }

  function setQuestions(data) {
    return data.map((quest) => {
      const { question, correct_answer, incorrect_answers } = quest
      const answers = randomizeAnswers([...incorrect_answers, correct_answer])
      return {
        id: uuidv4(),
        question,
        correct_answer,
        answers: answers.map((item) => {
          return {
            id: uuidv4(),
            item,
            selected: false,
          }
        })
      }
    })
  }

  const getStarted = () => dispatch({ type: "choose_options" })

  const startQuiz = (e) => {
    e.preventDefault()
    fetchQuestions()
    dispatch({ type: "start_quiz" })
  }

  const playAgain = () => {
    fetchQuestions()
    dispatch({ type: "replay" })
  }

  const restartQuiz = () => {
    dispatch({ type: "restart_quiz" })
  }

  const removeUnicode = (text) => {
    const pattern = /&(#[0-9]+|[a-zA-Z]+);/g
    return text.replace(pattern, "")
  }

  const hideDropDownMenu = () => {
    const atLeastOneOpen = !!state.categoryOpen || !!state.difficultyOpen || !!state.typeOpen
    if (!atLeastOneOpen) return;
    dispatch({ type: "hide_dropdown" })
  }

  const handleClassNames = (answer, questionsData, answersChecked) => {
    let classNames;
    switch (true) {
      case answer.selected && !answersChecked:
        classNames = "bg-blue100 border-none";
        break;
      case !answer.selected && !answersChecked:
        classNames = "bg-transparent border hover:bg-blue100";
        break;
      case !answer.selected && answersChecked:
        classNames = "bg-transparent border hover:bg-none opacity-50";
        break;
      case answer.selected && answersChecked && answer.item === questionsData.correct_answer:
        classNames = "bg-correct border-none hover:bg-none";
        break;
      case answer.selected && answersChecked && answer.item !== questionsData.correct_answer:
        classNames = "bg-incorrect border-none hover:bg-none opacity-50";
        break;
      default:
        classNames = "bg-transparent border hover:bg-blue100";
        break
    }
    return classNames
  }

  const selectAnswer = (answerID, questionsID) => {
    dispatch({ type: "select_answer", payload: { answerID, questionsID } })
  }

  const checkAnswers = () => {
    const answersSelected = allAnswersSelected(state.data)
    if (answersSelected < state.amount) {
      dispatch({ type: "show_alert_message" })
      return;
    }

    dispatch({ type: "check_answers" })
    dispatch({ type: "hide_alert_message" })
  }

  const allAnswersSelected = (data) => {
    let answersHeld = []
    data.map((questionsData) => {
      return questionsData.answers.map((answer) => {
        if (answer.selected) {
          answersHeld.push(answer)
        }
      })
    })
    return answersHeld.length
  }


  const handleNumberChange = (e) => {
    if (!isNaN(e.target.value)) {
      dispatch({ type: "set_amount", payload: e.target.value })
    }
  }

  const openDifficulty = () => {
    dispatch({ type: "open_difficulty" })
  }

  const openType = () => {
    dispatch({ type: "open_type" })
  }

  const openCategory = () => {
    dispatch({ type: "open_category" })
  }

  const handleCategory = (value, type) => {
    dispatch({ type: "set_category", payload: { value, type } })
  }

  const handleDifficulty = (value) => {
    dispatch({ type: "set_difficulty", payload: value })
  }

  const handleType = (value) => {
    dispatch({ type: "set_type", payload: value })
  }


  return (
    <AppContext.Provider
      value={{
        state,
        getStarted,
        startQuiz,
        playAgain,
        restartQuiz,
        removeUnicode,
        handleClassNames,
        hideDropDownMenu,
        selectAnswer,
        checkAnswers,
        handleNumberChange,
        openDifficulty,
        openType,
        openCategory,
        handleCategory,
        handleDifficulty,
        handleType
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)

export { AppContext, AppProvider }