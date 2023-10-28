import { useReducer } from "react";
import { RowList } from "../../atoms/layout/List";
import { LongChoiceItem } from "../../molecules/list-item/LongChoiceItem";
import Button from "../../atoms/button/Button";
import { QuestionModel, WrongCounterModel } from "../../../types/questionTypes";
import styled from "styled-components";
import TextBox from "../../atoms/box/TextBox";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import corrct from "../../../styles/images/correct.svg";
import incorrct from "../../../styles/images/incorrect.svg";
import QuestionCounter from "../../molecules/etc/QuestionCounter";
import { useUpdateKeywordWrongCounterMutation } from "../../../store/api/questionApi";

interface QuestionProps {
  quizList: QuestionModel[];
  handleNextContent: () => void;
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
  keywordList: Map<number, { wrongCount: number; correctCount: number }>;
};

const SELECT_CHOICE = "SELECT_CHOICE";
const FINISH = "FINISH";
const NEXT_QUESTION = "NEXT_QUESTION";
const WRONG = "WRONG";
const CORRECT = "CORRECT";

type Action =
  | { type: "SELECT_CHOICE"; selectedChoiceKey: string }
  | { type: "FINISH" }
  | { type: "NEXT_QUESTION" }
  | { type: "WRONG"; keywordId: number }
  | { type: "CORRECT"; keywordId: number };

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
    case WRONG:
      const wrongKeywordId = action.keywordId;
      const wrongKeyword = state.keywordList.get(wrongKeywordId);
      if (wrongKeyword) {
        wrongKeyword.wrongCount += 1;
        state.keywordList.set(wrongKeywordId, wrongKeyword);
      }
      return { ...state };

    case CORRECT:
      const answerKeywordId = action.keywordId;
      const answerKeyword = state.keywordList.get(answerKeywordId);
      if (answerKeyword) {
        answerKeyword.correctCount += 1;
        state.keywordList.set(answerKeywordId, answerKeyword);
      }
      return { ...state };

    default:
      return state;
  }
};

function getKeywordList(
  quizList: QuestionModel[]
): Map<number, { wrongCount: number; correctCount: number }> {
  let newMap = new Map<number, { wrongCount: number; correctCount: number }>();
  quizList.forEach((quiz) => {
    if (quiz.keywordIdList === null) return newMap;
    quiz.keywordIdList.forEach((keywordId) => {
      newMap.set(keywordId, { wrongCount: 0, correctCount: 0 });
    });
  });
  return newMap;
}

function Question({ quizList, handleNextContent, timeLimit }: QuestionProps) {
  const [updateKeywordWrongCount] = useUpdateKeywordWrongCounterMutation();
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
    keywordList: getKeywordList(quizList),
  });
  const {
    questionList,
    isFinish,
    currentNumber,
    selectedChoiceKey,
    keywordList,
  } = state;

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
    //if (selectedChoiceKey === "") return;

    const isCorrect =
      selectedChoiceKey.substring(1) === questionList[currentNumber].answer;
    dispatch({ type: FINISH });

    if (isCorrect) {
      correctAnswer();
      if (questionList[currentNumber].keywordIdList === null) return;
      questionList[currentNumber].keywordIdList.forEach((keywordId) => {
        dispatch({ type: CORRECT, keywordId });
      });
    } else {
      wrongAnswer();
      if (questionList[currentNumber].keywordIdList === null) return;
      questionList[currentNumber].keywordIdList.forEach((keywordId) => {
        dispatch({ type: WRONG, keywordId });
      });
    }
  };

  const handleNextQuestion = () => {
    toast.dismiss();
    dispatch({ type: NEXT_QUESTION });
  };

  const handleUpdate = async () => {
    if (questionList.length === currentNumber + 1) {
      let newKeywordList: WrongCounterModel[] = [];
      keywordList.forEach((value, key) => {
        newKeywordList.push({
          id: key,
          wrongCount: value.wrongCount,
          correctCount: value.correctCount,
        });
      });
      await updateKeywordWrongCount(newKeywordList);
    }
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
      />
      {questionList[currentNumber].description && (
        <Description>
          {questionList[currentNumber].description.map((item) => {
            return (
              <TextBox maxWidth="full" key={item}>
                {item}
              </TextBox>
            );
          })}
        </Description>
      )}
      <RowList>
        {questionList[currentNumber] &&
          questionList[currentNumber].choiceList.map((item, index) => (
            <LongChoiceItem
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
          ))}
      </RowList>
      {!isFinish ? (
        <Button onClick={handleCheckAnswer}>정답 확인</Button>
      ) : currentNumber < questionList.length - 1 ? (
        <Button onClick={handleNextQuestion}>다음 문제</Button>
      ) : (
        <Button
          onClick={() => {
            handleUpdate();
            handleNextContent();
          }}
        >
          다음
        </Button>
      )}
    </>
  );
}

export { Question };
