import { useReducer } from "react";
import { RowList } from "../../atoms/layout/List";
import { LongChoiceItem } from "../../molecules/list-item/LongChoiceItem";
import Button from "../../atoms/button/Button";
import { ChoiceModel, QuestionModel } from "../../../types/questionTypes";
import { ShortChoiceItem } from "../../molecules/list-item/ShortChoiceItem";
import styled from "styled-components";
import TextBox from "../../atoms/box/TextBox";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import corrct from "../../../styles/images/correct.svg";
import incorrct from "../../../styles/images/incorrect.svg";
import QuestionCounter from "../../molecules/etc/QuestionCounter";
import { useAddTopicWrongCounterMutation } from "../../../store/api/questionApi";

interface QuestionProps {
  quizList: QuestionModel[];
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

type State = {
  questionList: QuestionModel[];
  isFinish: boolean;
  currentNumber: number;
  selectedChoiceKey: string;
};

const SELECT_CHOICE = "SELECT_CHOICE";
const FINISH = "FINISH";
const NEXT_QUESTION = "NEXT_QUESTION";

type Action =
  | { type: "SELECT_CHOICE"; selectedChoiceKey: string }
  | { type: "FINISH" }
  | { type: "NEXT_QUESTION" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SELECT_CHOICE:
      return { ...state, selectedChoiceKey: action.selectedChoiceKey };
    case FINISH:
      return { ...state, isFinish: true };
    case NEXT_QUESTION:
      return {
        ...state,
        isFinish: false,
        currentNumber: state.currentNumber + 1,
        selectedChoiceKey: "",
      };
    default:
      return state;
  }
};

function Question({
  quizList,
  handleNextContent,
  category,
  timeLimit,
}: QuestionProps) {
  const [addTopicWrongCount] = useAddTopicWrongCounterMutation();
  const [state, dispatch] = useReducer(reducer, {
    questionList: [...quizList]
      .sort(() => Math.random() - 0.5)
      .map((item) => {
        return {
          ...item,
          choiceList: [...item.choiceList].sort(() => Math.random() - 0.5),
        };
      }),
    isFinish: false,
    currentNumber: 0,
    selectedChoiceKey: "",
  });
  const { questionList, isFinish, currentNumber, selectedChoiceKey } = state;

  const correctAnswer = () =>
    toast(
      <img
        src={corrct}
        width="200px"
        style={{ margin: "auto", display: "block" }}
        alt="correct"
      />
    );

  const wrongAnswer = () =>
    toast(
      <img
        src={incorrct}
        width="200px"
        style={{ margin: "auto", display: "block" }}
        alt="correct"
      />
    );

  const handleCheckAnswer = () => {
    if (selectedChoiceKey === "") return;

    const isCorrect =
      selectedChoiceKey.substring(1) === questionList[currentNumber].answer;
    dispatch({ type: FINISH });

    if (isCorrect) {
      correctAnswer();
    } else {
      wrongAnswer();
      addTopicWrongCount([
        {
          topicTitle: questionList[currentNumber].answer,
          count: 1,
        },
      ]);
    }
  };

  const handleNextQuestion = () => {
    toast.dismiss();
    dispatch({ type: NEXT_QUESTION });
  };

  const renderChoiceItem = (item: ChoiceModel, index: number) => {
    const ChoiceItem =
      questionList[currentNumber].questionType === "TtoS" ||
      questionList[currentNumber].questionType === "Mock"
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
        isCorrect={questionList[currentNumber].answer === item.key}
        choice={item.choice}
        isFinish={isFinish}
        selectedCheckbox={selectedChoiceKey}
        key={String(index) + item.key}
      />
    );
  };

  return (
    <>
      <ToastContainer
        toastStyle={{ backgroundColor: "transparent", boxShadow: "none" }}
        position="top-center"
        autoClose={10}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        transition={Zoom}
        draggable={false}
        theme="light"
        closeButton={false}
      />
      <QuestionCounter
        timeLimit={timeLimit}
        totalQuestionCount={questionList.length}
        currentQuestionCount={currentNumber + 1}
        category={category}
      />
      {questionList[currentNumber].descriptionKeyword && (
        <Description>
          {questionList[currentNumber].descriptionKeyword?.map((item) => {
            return (
              <TextBox maxWidth="full" key={item.name}>
                {item.name}
              </TextBox>
            );
          })}
        </Description>
      )}
      {questionList[currentNumber].description && (
        <Description>
          <img
            style={{ width: "100%", height: "auto" }}
            src={questionList[currentNumber].description}
            alt=""
          />
        </Description>
      )}
      {questionList[currentNumber].descriptionSentence && (
        <Description>
          <TextBox maxWidth="full">
            {questionList[currentNumber].descriptionSentence}
          </TextBox>
        </Description>
      )}
      <RowList>
        {questionList[currentNumber] &&
          questionList[currentNumber].choiceList.map(renderChoiceItem)}
      </RowList>
      {!isFinish ? (
        <Button onClick={handleCheckAnswer}>정답 확인</Button>
      ) : currentNumber < questionList.length - 1 ? (
        <Button onClick={handleNextQuestion}>다음 문제</Button>
      ) : (
        <Button onClick={handleNextContent}>다음</Button>
      )}
    </>
  );
}

export { Question };
