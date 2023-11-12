import { useEffect, useMemo, useReducer } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  ExamModel,
  QuestionCommentModel,
  QuestionModel,
  UpdateWrongQuestionModel,
} from "../../../../types/questionTypes";
import QuestionUI from "../container/QuestionUI.container";
import QuestionNavigationUI from "../container/QuestionNavigationUI.container";
import flag from "../../../../styles/images/flag.svg";
import hat from "../../../../styles/images/hat.svg";
import mask from "../../../../styles/images/mask.svg";
import cheomseongdae from "../../../../styles/images/cheomseongdae.svg";
import gyeongbokgung from "../../../../styles/images/gyeongbokgung.svg";
import kingSejong from "../../../../styles/images/king-sejong.svg";
import Icon from "../../../atoms/icon/Icon";
import useQuesryString from "../../../../service/useQueryString";
import ExamScore from "./ExamScore.presenter";
import ExamIncorrect from "./ExamIncorrect.presenter";
import MultiButtonUI from "../../common/container/MultiButtonUI.container";
import { useNavigate } from "react-router-dom";
import { useUpdateExamWrongCounterMutation } from "../../../../store/api/questionApi";

const images = [flag, hat, mask, cheomseongdae, gyeongbokgung, kingSejong];

interface ExamProps {
  examList: ExamModel[];
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
          if (item.isCorrect) score += item.score;
          return { ...item, isFinish: true };
        }
        return item;
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

const createQuestion = (question: ExamModel): QuestionModel => {
  const {
    answer,
    choiceList,
    choiceType,
    description,
    descriptionCommentList,
    score,
    number,
    id,
  } = question;

  const descriptionList = [description];

  const descriptionCommentListTransformed = [...descriptionCommentList]
    .sort((a, b) => a.topicTitle.localeCompare(b.topicTitle))
    .reduce((acc: QuestionCommentModel[], cur) => {
      const {
        keywordComment,
        keywordDateComment,
        keywordName,
        topicDateComment,
        topicTitle,
      } = cur;
      let topic = `${topicTitle}${
        topicDateComment ? `(${topicDateComment})` : ``
      }`;
      let keyword = `${keywordName}${
        keywordDateComment ? `(${keywordDateComment}): ` : ``
      }`;
      if (acc.find((item) => item.comment === topic)) {
        let findIndex = acc.findIndex((item) => item.comment === topic);

        if (acc[findIndex + 1] && acc[findIndex + 1].comment) {
          acc[findIndex + 1].comment += ", " + keyword;
        }
      } else {
        acc.push({
          comment: topic,
          icon: <Icon icon="description" size={12} />,
          type: "Topic",
        });
        acc.push({
          comment: keyword,
          icon: <Icon icon="key" size={12} />,
          type: "Keyword",
        });
      }

      keywordComment &&
        acc.push({
          comment: keywordComment,
          icon: <Icon icon="comment" size={12} />,
          type: "Comment",
        });
      return acc;
    }, []);

  const choiceListTransformed = choiceList.map((choice) => {
    let isCorrect = choice.number === answer;
    return {
      choice: choice.choice,
      key: String(choice.number),
      commentList: [...choice.commentList]
        .sort((a, b) => a.topicTitle.localeCompare(b.topicTitle))
        .reduce((acc: QuestionCommentModel[], cur) => {
          const {
            keywordComment,
            keywordDateComment,
            keywordName,
            topicDateComment,
            topicTitle,
          } = cur;
          let topic = `${topicTitle}${
            topicDateComment ? `(${topicDateComment})` : ``
          }`;
          let keyword = `${keywordName}${
            keywordDateComment ? `(${keywordDateComment})` : ``
          }`;
          if (acc.find((item) => item.comment === keyword)) {
            let findIndex = acc.findIndex((item) => item.comment === keyword);

            if (acc[findIndex - 1] && acc[findIndex - 1].comment) {
              acc[findIndex - 1].comment += ", " + topic;
            }
            return acc;
          }
          if (acc.find((item) => item.comment === topic)) {
            let findIndex = acc.findIndex((item) => item.comment === topic);

            if (acc[findIndex + 1] && acc[findIndex + 1].comment) {
              acc[findIndex + 1].comment += ", " + keyword;
            }
          } else {
            acc.push({
              comment: topic,
              icon: isCorrect ? (
                <Icon icon="o" size={12} />
              ) : (
                <Icon icon="x" size={12} />
              ),
              type: "Topic",
            });
            acc.push({
              comment: keyword,
              icon: <Icon icon="key" size={12} />,
              type: "Keyword",
            });
          }

          keywordComment &&
            acc.push({
              comment: keywordComment,
              icon: <Icon icon="comment" size={12} />,
              type: "Comment",
            });
          return acc;
        }, []),
    };
  });

  return {
    id,
    number,
    questionType: "Exam",
    choiceType,
    descriptionList,
    descriptionCommentList: descriptionCommentListTransformed,
    choiceList: choiceListTransformed,
    answer: String(answer),
    checkedChoiceKey: "",
    isCorrect: false,
    isChecked: false,
    isFinish: false,
    isOpen: true,
    score,
  };
};

function Exam({ examList }: ExamProps) {
  const navigate = useNavigate();
  const [updateExam] = useUpdateExamWrongCounterMutation();
  const [state, dispatch] = useReducer(reducer, {
    questionList: [...examList].map(createQuestion),
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
    let wrongExamList: UpdateWrongQuestionModel[] = [];
    questionList.forEach((question) => {
      if (question.isFinish && !question.isCorrect)
        wrongExamList.push({
          id: question.id,
          checkedChoiceKey: Number(question.checkedChoiceKey[1]),
          score: question.score,
        });
    });

    wrongExamList.length > 0 && updateExam(wrongExamList);
  };

  const handleNextQuestion = async () => {
    dispatch({ type: NEXT_QUESTION });
    window.scrollTo({
      top: 0,
    });
  };

  const handleMove = (index: number) => {
    dispatch({ type: MOVE_QUESTION, moveQuestionNumber: index });
    window.scrollTo({
      top: 0,
    });
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
          <ExamScore totalScore={100} score={score} />
          <MultiButtonUI
            buttonList={[
              {
                onClick: () => navigate(-1),
                contents: (
                  <>
                    <Icon icon="CHAPTER_INFO" size={12} />
                    &nbsp;목록
                  </>
                ),
              },
              {
                onClick: () => {
                  localStorage.removeItem(round);
                  window.location.reload();
                },
                contents: (
                  <>
                    <Icon icon="again" size={12} />
                    &nbsp;초기화
                  </>
                ),
              },
            ]}
          />
          <ExamIncorrect questionList={questionList} />
        </>
      ) : (
        <>
          <QuestionUI
            quetion={questionList[currentNumber]}
            onChoiceClick={handleChoiceClick}
            image={image}
          />
          <MultiButtonUI
            buttonList={[
              {
                onClick: handleCheckAnswer,
                contents: (
                  <>
                    <Icon icon="pen" size={12} />
                    &nbsp;정답 확인
                  </>
                ),
              },
              {
                onClick: handleNextQuestion,
                contents: (
                  <>
                    <Icon icon="next" size={12} />
                    &nbsp;다음 문제
                  </>
                ),
              },
            ]}
          />
        </>
      )}
    </>
  );
}

export default Exam;
