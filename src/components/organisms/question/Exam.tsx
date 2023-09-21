import { useEffect, useReducer, useState } from "react";
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
`;

interface State {
  questionList: ExamListModel[];
  isFinish: boolean;
  currentNumber: number;
  score: number;
}

enum Action {
  SELECT_CHOICE = "SELECT_CHOICE",
  CHECK_ANSWER = "CHECK_ANSWER",
  MOVE_QUESTION = "MOVE_QUESTION",
}

const reducer = (state: State, action: { type: any; payload?: any }): State => {
  switch (action.type) {
    case Action.SELECT_CHOICE:
      console.log(action.payload);
      const updatedQuestionList = state.questionList.map((item, index) => {
        if (index === state.currentNumber) {
          return {
            ...item,
            checkedChoiceKey: action.payload,
            isChecked: true,
            isCorrect: item.answer === action.payload.substring(1),
          };
        }
        return item;
      });
      return { ...state, questionList: updatedQuestionList };
    case Action.CHECK_ANSWER:
      let score = 0;
      state.questionList.forEach((item) => {
        if (item.isCorrect) {
          score += item.score;
        }
      });
      return {
        ...state,
        isFinish: true,
        score,
        currentNumber: state.questionList.length,
      };
    case Action.MOVE_QUESTION:
      return { ...state, currentNumber: action.payload };
  }
  return { ...state };
};

function Exam({ examList, category, timeLimit }: ExamProps) {
  const [isTimeout, setIsTimeout] = useState<boolean>(false);
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
  });
  const { questionList, isFinish, currentNumber, score } = state;

  useEffect(() => {
    if (isTimeout) {
      dispatch({ type: Action.CHECK_ANSWER });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeout]);

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
                dispatch({ type: Action.SELECT_CHOICE, payload: e.target.id })
        }
        handleChoiceClick={
          isFinish
            ? () => {}
            : (key: string) =>
                dispatch({ type: Action.SELECT_CHOICE, payload: key })
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
          dispatch({ type: Action.MOVE_QUESTION, payload: index })
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
        setisTimeout={setIsTimeout}
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
            <Button onClick={() => dispatch({ type: Action.CHECK_ANSWER })}>
              완료
            </Button>
          )
        : currentNumber < questionList.length && (
            <Button
              onClick={() =>
                dispatch({
                  type: Action.MOVE_QUESTION,
                  payload: currentNumber + 1,
                })
              }
            >
              다음 문제
            </Button>
          )}
      {currentNumber === questionList.length && (
        <AnswerBox>점수: {score}</AnswerBox>
      )}
    </>
  );
}

export { Exam };
