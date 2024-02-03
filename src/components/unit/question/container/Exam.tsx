import { useEffect, useMemo, useReducer, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  ExamModel,
  QuestionCommentModel,
  QuestionModel,
  UpdateWrongQuestionModel,
} from "../../../../types/questionTypes";
import QuestionUI from "../presenter/QuestionUI";
import QuestionNavigationUI from "../presenter/QuestionNavigationUI";
import flag from "../../../../styles/images/flag.svg";
import hat from "../../../../styles/images/hat.svg";
import mask from "../../../../styles/images/mask.svg";
import cheomseongdae from "../../../../styles/images/cheomseongdae.svg";
import gyeongbokgung from "../../../../styles/images/gyeongbokgung.svg";
import kingSejong from "../../../../styles/images/king-sejong.svg";
import Icon from "../../../atoms/icon/Icon";
import useQuesryString from "../../../../hooks/useQueryString";
import ExamScore from "./ExamScore";
import MultiButtonUI from "../../common/presenter/MultiButtonUI";
import { useNavigate } from "react-router-dom";
import {
  useUpdateExamClearMutation,
  useUpdateExamWrongCounterMutation,
} from "../../../../store/api/questionApi";
import styled from "styled-components";
import { Default, Mobile } from "../../../atoms/layout/Responsive";

const QuestionLayout = styled.div`
  @media (min-width: 992px) {
    width: 100%;
    grid-column: 2/4;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 100%;
    grid-column: 1/3;
    grid-row: 1/2;
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
  }
`;

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
const PREV_QUESTION = "PREV_QUESTION";
const CHECK_ANSWER = "CHECK_ANSWER";
const CHECK_CURRENT_ANSWER = "CHECK_CURRENT_ANSWER";
const MOVE_QUESTION = "MOVE_QUESTION";
const LOAD = "LOAD";
const RESET_STATE = "RESET_STATE";

export type Action =
  | {
      type: "SELECT_CHOICE";
      checkedChoiceKey: string;
    }
  | { type: "CHECK_ANSWER" }
  | { type: "CHECK_CURRENT_ANSWER" }
  | { type: "NEXT_QUESTION" }
  | { type: "PREV_QUESTION" }
  | { type: "FINISH" }
  | { type: "MOVE_QUESTION"; moveQuestionNumber: number }
  | { type: "LOAD"; loadedState: SaveState }
  | {
      type: "RESET_STATE";
      questionList: QuestionModel[];
      isFinish: boolean;
      currentNumber: number;
      score: number;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case RESET_STATE:
      return {
        questionList: action.questionList,
        isFinish: action.isFinish,
        currentNumber: action.currentNumber,
        score: action.score,
      };
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
        if (item.isCorrect) score += item.score;
        return { ...item, isFinish: true };
      });

      return {
        ...state,
        score,
        questionList: updatedQuestionListCheck,
      };

    case CHECK_CURRENT_ANSWER:
      let currentScore = state.score;
      const updatedQuestionListCurrentCheck = state.questionList.map(
        (item, index) => {
          if (state.currentNumber === index && item.isFinish === false) {
            if (item.isCorrect) currentScore += item.score;
            return { ...item, isFinish: true };
          }
          return item;
        }
      );

      return {
        ...state,
        score: currentScore,
        questionList: updatedQuestionListCurrentCheck,
      };

    case PREV_QUESTION:
      if (state.currentNumber === 0) {
        return state;
      }
      return {
        ...state,
        currentNumber: state.currentNumber - 1,
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
    checkedChoiceKey,
  } = question;

  const descriptionList = [description];

  const descriptionCommentListTransformed = [...descriptionCommentList].reduce(
    (acc: QuestionCommentModel[], cur, index) => {
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
        !!keywordDateComment && keywordDateComment !== " "
          ? `(${keywordDateComment})`
          : ``
      }`;

      acc.push({
        comment: keyword,
        icon: <Icon icon="key" size={12} />,
        type: "Keyword",
      });

      acc.push({
        comment: topic,
        icon: <Icon icon="description" size={12} />,
        type: "Topic",
      });

      keywordComment &&
        acc.push({
          comment: keywordComment,
          icon: <Icon icon="comment" size={12} />,
          type: "Comment",
        });

      acc.push({
        comment: "divider_description" + cur.keywordName + index,
        icon: <Icon icon="comment" size={12} />,
        type: "Comment",
      });
      return acc;
    },
    []
  );

  const choiceListTransformed = choiceList.map((choice) => {
    return {
      choice: choice.choice,
      key: String(choice.number),
      commentList: [...choice.commentList].reduce(
        (acc: QuestionCommentModel[], cur, index, arr) => {
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
            !!keywordDateComment && keywordDateComment !== " "
              ? `(${keywordDateComment})`
              : ``
          }`;

          acc.push({
            comment: keyword,
            icon: <Icon icon="key" size={12} />,
            type: "Keyword",
          });

          acc.push({
            comment: topic,
            icon: <Icon icon="description" size={12} />,
            type: "Topic",
          });

          keywordComment &&
            acc.push({
              comment: keywordComment,
              icon: <Icon icon="comment" size={12} />,
              type: "Comment",
            });

          acc.push({
            comment: "divider_choice" + cur.keywordName + index,
            icon: <Icon icon="comment" size={12} />,
            type: "Comment",
          });
          return acc;
        },
        []
      ),
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
    checkedChoiceKey: checkedChoiceKey
      ? String(Number(checkedChoiceKey) * 11)
      : "",
    isCorrect: checkedChoiceKey ? answer === Number(checkedChoiceKey) : false,
    isChecked: checkedChoiceKey ? true : false,
    isFinish: checkedChoiceKey ? true : false,
    isOpen: true,
    score,
  };
};

function Exam({ examList }: ExamProps) {
  const navigate = useNavigate();
  const [updateExam] = useUpdateExamWrongCounterMutation();
  const [clearExam] = useUpdateExamClearMutation();
  const [state, dispatch] = useReducer(reducer, {
    questionList: [...examList].map(createQuestion),
    isFinish: false,
    currentNumber: 0,
    score: 0,
  });
  const { questionList, currentNumber, score } = state;
  const [isCheckAnswer, setIsCheckAnswer] = useState<boolean>(false);
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
    setIsCheckAnswer(true);
  };

  const handleCheckCurrentAnswer = () => {
    dispatch({
      type: CHECK_CURRENT_ANSWER,
    });
    setIsCheckAnswer(true);
  };

  useEffect(() => {
    if (isCheckAnswer) {
      setIsCheckAnswer(false);
      let saveExamList: UpdateWrongQuestionModel[] = [];
      questionList.forEach((question) => {
        if (question.isFinish && question.isChecked) {
          saveExamList.push({
            id: question.id,
            checkedChoiceKey: Number(question.checkedChoiceKey[1]),
            score: question.isCorrect ? question.score : 0,
          });
        }
      });

      saveExamList.length > 0 && updateExam(saveExamList);
    }
  }, [isCheckAnswer, questionList, updateExam]);

  const handlePrevQuestion = async () => {
    dispatch({ type: PREV_QUESTION });
    window.scrollTo({
      top: 0,
    });
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
    <QuestionLayout>
      <QuestionNavigationUI
        onClickMove={handleMove}
        questionList={questionList}
        currentNumber={currentNumber}
        isFinish={true}
      />
      {questionList.length === currentNumber ? (
        <Default>
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
                onClick: async () => {
                  await clearExam(Number(round));
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
              {
                onClick: handleCheckAnswer,
                contents: (
                  <>
                    <Icon icon="pen" size={12} />
                    &nbsp;전체 정답 확인
                  </>
                ),
              },
            ]}
          />
        </Default>
      ) : (
        <Default>
          <MultiButtonUI
            buttonList={[
              {
                onClick: handlePrevQuestion,
                contents: (
                  <>
                    <Icon icon="back" size={12} />
                    &nbsp;이전 문제
                  </>
                ),
              },

              {
                onClick: handleCheckCurrentAnswer,
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
                    다음 문제&nbsp;
                    <Icon icon="next" size={12} />
                  </>
                ),
              },
            ]}
          />
        </Default>
      )}
      {questionList.length === currentNumber ? (
        <>
          <ExamScore totalScore={100} score={score} />

          <Mobile>
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
                  onClick: async () => {
                    await clearExam(Number(round));
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
                {
                  onClick: handleCheckAnswer,
                  contents: (
                    <>
                      <Icon icon="pen" size={12} />
                      &nbsp;전체 정답 확인
                    </>
                  ),
                },
              ]}
            />
          </Mobile>
          {/* <ExamIncorrect questionList={questionList} /> */}
        </>
      ) : (
        <>
          <QuestionUI
            quetion={questionList[currentNumber]}
            onChoiceClick={handleChoiceClick}
            image={image}
          />
          <Mobile>
            <MultiButtonUI
              fixed
              buttonList={[
                {
                  onClick: handlePrevQuestion,
                  contents: (
                    <>
                      <Icon icon="back" size={12} />
                      &nbsp;이전 문제
                    </>
                  ),
                },
                {
                  onClick: handleCheckCurrentAnswer,
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
                      다음 문제&nbsp;
                      <Icon icon="next" size={12} />
                    </>
                  ),
                },
              ]}
            />
          </Mobile>
        </>
      )}
    </QuestionLayout>
  );
}

export default Exam;
