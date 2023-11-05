import { useMemo, useReducer } from "react";
import { Id, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import corrct from "../../../../styles/images/correct.svg";
import incorrct from "../../../../styles/images/incorrect.svg";
import {
  ExamModel,
  QuestionCommentModel,
  QuestionModel,
} from "../../../../types/questionTypes";
import QuestionUI from "../container/QuestionUI.container";
import Button from "../../../atoms/button/Button";
import QuestionNavigationUI from "../container/QuestionNavigationUI.container";
import flag from "../../../../styles/images/flag.svg";
import hat from "../../../../styles/images/hat.svg";
import mask from "../../../../styles/images/mask.svg";
import cheomseongdae from "../../../../styles/images/cheomseongdae.svg";
import gyeongbokgung from "../../../../styles/images/gyeongbokgung.svg";
import kingSejong from "../../../../styles/images/king-sejong.svg";
import ScoreUI from "../container/ScoreUI.container";
import IncorrectAnswerListUI from "../container/IncorrectAnswerListUI.container";
import ResultButtonUI from "../container/ResultButtonUI.container";
import Icon from "../../../atoms/icon/Icon";

const images = [flag, hat, mask, cheomseongdae, gyeongbokgung, kingSejong];

interface ExamProps {
  examList: ExamModel[];
  onNextContent: () => void;
  onFinish?: () => void;
  isJJH?: boolean;
}

type State = {
  questionList: QuestionModel[];
  isFinish: boolean;
  currentNumber: number;
  score: number;
};

const SELECT_CHOICE = "SELECT_CHOICE";
const FINISH = "FINISH";
const NEXT_QUESTION = "NEXT_QUESTION";
const CHECK_ANSWER = "CHECK_ANSWER";
const MOVE_QUESTION = "MOVE_QUESTION";

export type Action =
  | {
      type: "SELECT_CHOICE";
      checkedChoiceKey: string;
    }
  | { type: "CHECK_ANSWER"; correctAlert: () => Id; wrongAlert: () => Id }
  | { type: "NEXT_QUESTION" }
  | { type: "FINISH" }
  | { type: "MOVE_QUESTION"; moveQuestionNumber: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SELECT_CHOICE:
      if (state.questionList[state.currentNumber].isFinish) {
        return state;
      }
      const updatedQuestionListSelect = state.questionList.map(
        (item, index) => {
          if (index === state.currentNumber) {
            //체크된 곳 다시 눌렀을 때
            if (item.checkedChoiceKey === action.checkedChoiceKey) {
              return {
                ...item,
                checkedChoiceKey: "",
                isChecked: false,
                isCorrect: false,
              };
            }
            return {
              ...item,
              checkedChoiceKey: action.checkedChoiceKey,
              isChecked: true,
              isCorrect: item.answer === action.checkedChoiceKey.substring(1),
            };
          }
          return item;
        }
      );
      return { ...state, questionList: updatedQuestionListSelect };

    case CHECK_ANSWER:
      let score = state.score;
      const updatedQuestionListCheck = state.questionList.map((item, index) => {
        if (index === state.currentNumber) {
          //맞았으면 점수 증가
          if (item.isCorrect) score += 1;
          //알림 창 출력
          item.isCorrect ? action.correctAlert() : action.wrongAlert();

          return { ...item, isFinish: true };
        }
        return { ...item, score };
      });

      return {
        ...state,
        score,
        questionList: updatedQuestionListCheck,
      };

    case NEXT_QUESTION:
      const updatedQuestionListNext = state.questionList.map((item, index) => {
        if (index === state.currentNumber + 1) {
          return { ...item, isOpen: true };
        }
        return item;
      });
      return {
        ...state,
        questionList: updatedQuestionListNext,
        currentNumber: state.currentNumber + 1,
      };

    case MOVE_QUESTION:
      if (
        action.moveQuestionNumber < state.questionList.length &&
        !state.questionList[action.moveQuestionNumber].isOpen
      )
        return state;
      return { ...state, currentNumber: action.moveQuestionNumber };

    case FINISH:
      return {
        ...state,
        isFinish: true,
        currentNumber: state.currentNumber + 1,
      };

    default:
      return state;
  }
};

function Exam({ examList, onNextContent, onFinish, isJJH = false }: ExamProps) {
  const [state, dispatch] = useReducer(reducer, {
    questionList: [...examList].map((item, index): QuestionModel => {
      const {
        answer,
        choiceList,
        choiceType,
        description,
        descriptionCommentList,
      } = item;
      return {
        questionType: "Exam",
        choiceType,
        descriptionList: [description],
        descriptionCommentList: descriptionCommentList.reduce(
          (acc: QuestionCommentModel[], cur) => {
            const {
              keywordComment,
              keywordDateComment,
              keywordName,
              topicDateComment,
              topicTitle,
            } = cur;
            let comment = topicTitle;
            comment += topicDateComment ? `(${topicDateComment}): ` : `: `;
            comment += keywordName;
            comment += keywordDateComment ? `(${keywordDateComment})` : ``;
            acc.push({ comment, icon: <Icon icon="check" /> });
            keywordComment && acc.push({ comment: keywordComment, icon: null });
            return acc;
          },
          []
        ),
        choiceList: [...choiceList].map((choice) => {
          return {
            choice: choice.choice,
            key: String(choice.number),
            commentList: choice.commentList.reduce(
              (acc: QuestionCommentModel[], cur) => {
                const {
                  keywordComment,
                  keywordDateComment,
                  keywordName,
                  topicDateComment,
                  topicTitle,
                } = cur;
                let comment = topicTitle;
                comment += topicDateComment ? `(${topicDateComment}): ` : `: `;
                comment += keywordName;
                comment += keywordDateComment ? `(${keywordDateComment})` : ``;
                acc.push({ comment, icon: <Icon icon="check" /> });
                keywordComment &&
                  acc.push({ comment: keywordComment, icon: null });
                return acc;
              },
              []
            ),
          };
        }),
        answer: String(answer),
        checkedChoiceKey: "",
        isCorrect: false,
        isChecked: false,
        isFinish: false,
        isOpen: !index,
        score: 0,
      };
    }),
    isFinish: false,
    currentNumber: 0,
    score: 0,
  });
  const { questionList, currentNumber, isFinish, score } = state;
  const image = useMemo(() => {
    return images[Math.floor(Math.random() * images.length)];
  }, []);

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

  const handleChoiceClick = (key: string) => {
    dispatch({
      type: SELECT_CHOICE,
      checkedChoiceKey: key,
    });
  };

  const handleCheckAnswer = () => {
    if (questionList[currentNumber].checkedChoiceKey === "") return;
    dispatch({
      type: CHECK_ANSWER,
      correctAlert: correctAnswer,
      wrongAlert: wrongAnswer,
    });
  };

  const handleNextQuestion = async () => {
    toast.dismiss();
    if (questionList.length === currentNumber + 1) {
      dispatch({ type: FINISH });

      if (Math.ceil(questionList.length * 0.8) <= score) {
        onFinish && onFinish();
      }
      return;
    }
    dispatch({ type: NEXT_QUESTION });
  };

  const handleMove = (index: number) => {
    dispatch({ type: MOVE_QUESTION, moveQuestionNumber: index });
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
      <QuestionNavigationUI
        onClickMove={handleMove}
        questionList={questionList}
        currentNumber={currentNumber}
        isFinish={isFinish}
      />
      {questionList.length === currentNumber ? (
        <>
          <ScoreUI score={score} questionList={questionList} isJJH={isJJH} />
          <ResultButtonUI
            isSuccess={
              isJJH ? Math.ceil(questionList.length * 0.8) <= score : false
            }
            onNextContent={onNextContent}
          />
          <IncorrectAnswerListUI questionList={questionList} />
        </>
      ) : (
        <>
          <QuestionUI
            quetion={questionList[currentNumber]}
            onChoiceClick={handleChoiceClick}
            image={image}
          />
          {!questionList[currentNumber].isFinish ? (
            <Button onClick={handleCheckAnswer}>정답 확인</Button>
          ) : (
            <Button onClick={handleNextQuestion}>다음</Button>
          )}
        </>
      )}
    </>
  );
}

export default Exam;
