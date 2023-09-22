import { useReducer } from "react";
import { RowList } from "../../atoms/layout/List";
import { LongChoiceItem } from "../../molecules/list-item/LongChoiceItem";
import Button from "../../atoms/button/Button";
import { ShortChoiceItem } from "../../molecules/list-item/ShortChoiceItem";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import {
  ChoiceModel,
  ExamListModel,
  ExamModel,
} from "../../../types/questionTypes";
import QuestionCounter from "../../molecules/etc/QuestionCounter";
import QuestionNuvagation from "../../molecules/etc/QuestionNavigation";

interface ExamProps {
  examList: ExamModel[];
  handleNextContent: () => void;
  category: string;
  timeLimit: number;
}

const Description = styled.ul`
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.small};
  border-radius: 10px;
  border: ${({ theme }) => theme.border.black};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  height: 100%;

  & > span {
    margin: 10px;
  }
`;

const WrongQuestionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 70%;
  margin: auto;
  & > li {
    background-color: ${({ theme }) => theme.colors.lightRed};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    text-align: center;
    min-width: 30px;
    padding: 4px;
    margin: 4px;
  }
`;

type State = {
  questionList: ExamListModel[];
  isFinish: boolean;
  currentNumber: number;
  score: number;
  wrongQuestionList: number[];
};

const SELECT_CHOICE = "SELECT_CHOICE";
const CHECK_ANSWER = "CHECK_ANSWER";
const MOVE_QUESTION = "MOVE_QUESTION";

type Action =
  | { type: "SELECT_CHOICE"; selectedChoiceKey: string }
  | { type: "CHECK_ANSWER" }
  | { type: "MOVE_QUESTION"; moveQuestionNumber: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SELECT_CHOICE:
      const updatedQuestionList = state.questionList.map((item, index) => {
        if (index === state.currentNumber) {
          if (item.checkedChoiceKey === action.selectedChoiceKey) {
            return {
              ...item,
              checkedChoiceKey: "",
              isChecked: false,
              isCorrect: false,
            };
          }
          return {
            ...item,
            checkedChoiceKey: action.selectedChoiceKey,
            isChecked: true,
            isCorrect: item.answer === action.selectedChoiceKey.substring(1),
          };
        }
        return item;
      });
      return { ...state, questionList: updatedQuestionList };
    case CHECK_ANSWER:
      let score = 0;
      let wrongQuestionList: number[] = [];
      state.questionList.forEach((item, index) => {
        if (item.isCorrect) {
          score += item.score;
        } else {
          wrongQuestionList.push(index + 1);
        }
      });
      return {
        ...state,
        isFinish: true,
        score,
        currentNumber: state.questionList.length,
        wrongQuestionList,
      };
    case MOVE_QUESTION:
      return { ...state, currentNumber: action.moveQuestionNumber };
    default:
      return state;
  }
};

function Exam({ examList, category, timeLimit }: ExamProps) {
  const [state, dispatch] = useReducer(reducer, {
    questionList: [...examList]
      .sort(() => Math.random() - 0.5)
      .map((item) => {
        const shuffledExam: ExamListModel = {
          ...item,
          checkedChoiceKey: "",
          isChecked: false,
          isCorrect: false,
          choiceList: [...item.choiceList].sort(() => Math.random() - 0.5),
        };
        return shuffledExam;
      }),
    isFinish: false,
    currentNumber: 0,
    score: 0,
    wrongQuestionList: [],
  });
  const { questionList, isFinish, currentNumber, score, wrongQuestionList } =
    state;
  console.log(wrongQuestionList);
  const renderChoiceItem = (item: ChoiceModel, index: number) => {
    const ChoiceItem =
      questionList[currentNumber].choiceType === "String"
        ? LongChoiceItem
        : ShortChoiceItem;

    return (
      <ChoiceItem
        handleCheckboxChange={
          isFinish
            ? () => {}
            : (e) =>
                dispatch({
                  type: SELECT_CHOICE,
                  selectedChoiceKey: e.target.id,
                })
        }
        handleChoiceClick={
          isFinish
            ? () => {}
            : (key: string) =>
                dispatch({ type: SELECT_CHOICE, selectedChoiceKey: key })
        }
        choiceKey={String(index) + item.key}
        key={String(index) + item.key}
        isCorrect={questionList[currentNumber].answer === item.key}
        choice={item.choice}
        isFinish={isFinish}
        selectedCheckbox={questionList[currentNumber].checkedChoiceKey}
      />
    );
  };

  return (
    <>
      <QuestionNuvagation
        handleClickNavigation={(index: number) =>
          dispatch({ type: MOVE_QUESTION, moveQuestionNumber: index })
        }
        dataList={questionList}
        isFinish={isFinish}
        currentNumber={currentNumber}
      />
      <QuestionCounter
        timeLimit={timeLimit}
        totalQuestionCount={examList.length}
        currentQuestionCount={currentNumber + 1}
        category={category}
        timeout={() => dispatch({ type: CHECK_ANSWER })}
      />
      {currentNumber < questionList.length &&
        questionList[currentNumber].description && (
          <Description>
            <img
              style={{ width: "100%", height: "auto" }}
              src={questionList[currentNumber].description}
              alt=""
            />
          </Description>
        )}
      <RowList>
        {currentNumber < questionList.length &&
          questionList[currentNumber] &&
          questionList[currentNumber].choiceList.map(renderChoiceItem)}
      </RowList>
      {questionList.length === currentNumber + 1
        ? currentNumber < questionList.length && (
            <Button onClick={() => dispatch({ type: CHECK_ANSWER })}>
              완료
            </Button>
          )
        : currentNumber < questionList.length && (
            <Button
              onClick={() =>
                dispatch({
                  type: MOVE_QUESTION,
                  moveQuestionNumber: currentNumber + 1,
                })
              }
            >
              다음 문제
            </Button>
          )}
      {currentNumber === questionList.length && (
        <AnswerBox>
          <span>점수: {score}</span>
          <span>틀린 문제 목록:</span>
          <WrongQuestionList>
            {wrongQuestionList.map((item) => {
              return (
                <li
                  key={item}
                  onClick={() =>
                    dispatch({
                      type: MOVE_QUESTION,
                      moveQuestionNumber: item - 1,
                    })
                  }
                >
                  {item}
                </li>
              );
            })}
          </WrongQuestionList>
        </AnswerBox>
      )}
    </>
  );
}

export { Exam };
