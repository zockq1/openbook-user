import { useMemo, useReducer } from "react";
import { Id, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import corrct from "../../../../styles/images/correct.svg";
import incorrct from "../../../../styles/images/incorrect.svg";
import {
  QuestionModel,
  QuizModel,
  WrongCounterModel,
} from "../../../../types/questionTypes";
import { useUpdateKeywordWrongCounterMutation } from "../../../../store/api/questionApi";
import QuestionUI from "../presenter/QuestionUI";
import QuestionNavigationUI from "../presenter/QuestionNavigationUI";
import flag from "../../../../styles/images/flag.svg";
import hat from "../../../../styles/images/hat.svg";
import mask from "../../../../styles/images/mask.svg";
import cheomseongdae from "../../../../styles/images/cheomseongdae.svg";
import gyeongbokgung from "../../../../styles/images/gyeongbokgung.svg";
import kingSejong from "../../../../styles/images/king-sejong.svg";
import IncorrectAnswerListUI from "../presenter/IncorrectAnswerListUI";
import ResultButtonUI from "../presenter/ResultButtonUI";
import QuizScore from "./QuizScore";
import UpdateScoreUI from "../presenter/UpdateScoreUI.container";
import MultiButtonUI from "../../common/presenter/MultiButtonUI";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import styled from "styled-components";
import { Default, Mobile } from "../../../atoms/layout/Responsive";
import Icon from "../../../atoms/icon/Icon";

const QuestionLayout = styled.div`
  @media (min-width: 992px) {
    width: 100%;
    grid-column: 2/3;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 100%;
    grid-column: 2/3;
    grid-row: 1/2;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
  }
`;

const images = [flag, hat, mask, cheomseongdae, gyeongbokgung, kingSejong];

interface QuestionProps {
  quizList: QuizModel[];
  onNextContent: () => void;
  onFinish?: () => void;
  isJJH?: boolean;
}

type State = {
  questionList: QuestionModel[];
  isFinish: boolean;
  currentNumber: number;
  score: number;
  keywordList: Map<number, { wrongCount: number; correctCount: number }>; //퀴즈 모드만
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
          //키워드별 정답, 오답 횟수 기록
          if (item.keywordIdList && item.keywordIdList.length > 0) {
            item.keywordIdList.forEach((keywordId) => {
              let keyword = state.keywordList.get(keywordId);
              if (keyword) {
                item.isCorrect
                  ? (keyword.correctCount += 1)
                  : (keyword.wrongCount += 1);
                state.keywordList.set(keywordId, keyword);
              }
            });
          }
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

function createQuestion(question: QuizModel, index: number): QuestionModel {
  const {
    questionType,
    answer,
    choiceList,
    choiceType,
    description,
    keywordIdList,
    descriptionFile,
  } = question;

  return {
    id: index,
    number: index + 1,
    questionType,
    choiceType,
    descriptionList: descriptionFile ? descriptionFile : description,
    descriptionCommentList: descriptionFile
      ? description.map((item) => {
          return {
            comment: item,
            icon: <Icon icon="check" size={12} />,
            type: "Keyword",
          };
        })
      : [],
    choiceList: [...choiceList]
      .sort(() => Math.random() - 0.5)
      .map((choice) => {
        return {
          choice: choice.file || choice.choice,
          key: choice.key,
          commentList:
            questionType === "TtoK" && choiceType === "Image"
              ? [
                  {
                    comment: choice.key,
                    icon: <Icon icon="description" size={12} />,
                    type: "Comment",
                  },
                  {
                    comment: choice.choice,
                    icon: <Icon icon="check" size={12} />,
                    type: "Comment",
                  },
                ]
              : questionType === "TtoK"
              ? [
                  {
                    comment: choice.key,
                    icon: <Icon icon="check" size={12} />,
                    type: "Comment",
                  },
                ]
              : [],
        };
      }),
    answer,
    checkedChoiceKey: "",
    isCorrect: false,
    isChecked: false,
    isFinish: false,
    isOpen: index === 0 ? true : false,
    score: 0,
    keywordIdList,
  };
}

function getKeywordList(
  quizList: QuizModel[]
): Map<number, { wrongCount: number; correctCount: number }> {
  let newMap = new Map<number, { wrongCount: number; correctCount: number }>();
  quizList.forEach((quiz) => {
    if (!quiz.keywordIdList) return newMap;
    quiz.keywordIdList.forEach((keywordId) => {
      newMap.set(keywordId, { wrongCount: 0, correctCount: 0 });
    });
  });
  return newMap;
}

function Quiz({
  quizList,
  onNextContent,
  onFinish,
  isJJH = false,
}: QuestionProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [updateKeywordWrongCount, { data: updateScoreList }] =
    useUpdateKeywordWrongCounterMutation();
  const [state, dispatch] = useReducer(reducer, {
    questionList: [...quizList]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => createQuestion(item, index)),
    isFinish: false,
    currentNumber: 0,
    score: 0,
    keywordList: getKeywordList(quizList),
  });
  const { questionList, currentNumber, keywordList, isFinish, score } = state;
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
    window.scrollTo({
      top: 0,
    });
    if (questionList.length === currentNumber + 1) {
      dispatch({ type: FINISH });
      let newKeywordList: WrongCounterModel[] = [];
      keywordList.forEach((value, key) => {
        newKeywordList.push({
          id: key,
          wrongCount: value.wrongCount,
          correctCount: value.correctCount,
        });
      });

      isLoggedIn && (await updateKeywordWrongCount(newKeywordList));

      if (Math.ceil(questionList.length * 0.8) <= score) {
        onFinish && onFinish();
      }
      return;
    }
    dispatch({ type: NEXT_QUESTION });
  };

  const handleMove = (index: number) => {
    dispatch({ type: MOVE_QUESTION, moveQuestionNumber: index });
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <QuestionLayout>
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
        <Default>
          <ResultButtonUI
            isSuccess={
              isJJH ? Math.ceil(questionList.length * 0.8) <= score : false
            }
            onNextContent={onNextContent}
          />
        </Default>
      ) : (
        <Default>
          {!questionList[currentNumber].isFinish ? (
            <MultiButtonUI
              buttonList={[
                { onClick: handleCheckAnswer, contents: "정답 확인" },
              ]}
            />
          ) : (
            <MultiButtonUI
              buttonList={[{ onClick: handleNextQuestion, contents: "다음" }]}
            />
          )}
        </Default>
      )}

      {questionList.length === currentNumber ? (
        <>
          <div>
            <QuizScore score={score} totalScore={questionList.length} />
            <Mobile>
              <ResultButtonUI
                isSuccess={
                  isJJH ? Math.ceil(questionList.length * 0.8) <= score : false
                }
                onNextContent={onNextContent}
              />
            </Mobile>
            <UpdateScoreUI updateScoreList={updateScoreList || []} />
          </div>

          <IncorrectAnswerListUI questionList={questionList} />
        </>
      ) : (
        <>
          <QuestionUI
            quetion={questionList[currentNumber]}
            onChoiceClick={handleChoiceClick}
            image={image}
          />
          <Mobile>
            {!questionList[currentNumber].isFinish ? (
              // <Button onClick={handleCheckAnswer}>정답 확인</Button>
              <MultiButtonUI
                fixed
                buttonList={[
                  { onClick: handleCheckAnswer, contents: "정답 확인" },
                ]}
              />
            ) : (
              <MultiButtonUI
                fixed
                buttonList={[{ onClick: handleNextQuestion, contents: "다음" }]}
              />
            )}
          </Mobile>
        </>
      )}
    </QuestionLayout>
  );
}

export default Quiz;
//194 + 304 = 498
