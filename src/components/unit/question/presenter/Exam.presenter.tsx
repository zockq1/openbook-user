import { useEffect, useMemo, useReducer } from "react";
import "react-toastify/dist/ReactToastify.css";
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
import useQuesryString from "../../../../service/useQueryString";

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

interface SaveState {
  questionList: {
    checkedChoiceKey: string;
    isCorrect: boolean;
    isChecked: boolean;
    isFinish: boolean;
  }[];
  score: number;
}

const SELECT_CHOICE = "SELECT_CHOICE";
const FINISH = "FINISH";
const NEXT_QUESTION = "NEXT_QUESTION";
const CHECK_ANSWER = "CHECK_ANSWER";
const MOVE_QUESTION = "MOVE_QUESTION";
const LOAD = "LOAD";

export type Action =
  | {
      type: "SELECT_CHOICE";
      checkedChoiceKey: string;
    }
  | { type: "CHECK_ANSWER" }
  | { type: "NEXT_QUESTION" }
  | { type: "FINISH" }
  | { type: "MOVE_QUESTION"; moveQuestionNumber: number }
  | { type: "LOAD"; loadedState: SaveState };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case LOAD:
      const updatedQuestionListLoad = state.questionList.map((item, index) => {
        return { ...item, ...action.loadedState.questionList[index] };
      });
      return {
        ...state,
        questionList: updatedQuestionListLoad,
        score: action.loadedState.score,
      };

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
      let score = 0;
      const updatedQuestionListCheck = state.questionList.map((item, index) => {
        if (item.isChecked) {
          score += item.score;
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
      return {
        ...state,
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
        score,
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
        isOpen: true,
        score,
      };
    }),
    isFinish: false,
    currentNumber: 0,
    score: 0,
  });
  const { questionList, currentNumber, score } = state;
  const image = useMemo(() => {
    return images[Math.floor(Math.random() * images.length)];
  }, []);
  const { round } = useQuesryString();

  useEffect(() => {
    let loadedState = localStorage.getItem(round);
    if (loadedState) {
      dispatch({ type: "LOAD", loadedState: JSON.parse(loadedState) });
    }
  }, [round]);

  useEffect(() => {
    let saveState: SaveState = {
      questionList: questionList.map((item) => {
        return {
          checkedChoiceKey: item.checkedChoiceKey,
          isCorrect: item.isCorrect,
          isChecked: item.isChecked,
          isFinish: item.isFinish,
        };
      }),
      score: score,
    };
    localStorage.setItem(round, JSON.stringify(saveState));
  }, [questionList, score, round]);

  const handleChoiceClick = (key: string) => {
    dispatch({
      type: SELECT_CHOICE,
      checkedChoiceKey: key,
    });
  };

  const handleCheckAnswer = () => {
    dispatch({
      type: CHECK_ANSWER,
    });

    dispatch({ type: MOVE_QUESTION, moveQuestionNumber: questionList.length });
  };

  const handleNextQuestion = async () => {
    dispatch({ type: NEXT_QUESTION });
  };

  const handleMove = (index: number) => {
    dispatch({ type: MOVE_QUESTION, moveQuestionNumber: index });
  };

  return (
    <>
      <QuestionNavigationUI
        onClickMove={handleMove}
        questionList={questionList}
        currentNumber={currentNumber}
        isFinish={true}
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
          <Button onClick={handleCheckAnswer}>정답 확인</Button>
          <Button onClick={handleNextQuestion}>다음</Button>
        </>
      )}
    </>
  );
}

export default Exam;
