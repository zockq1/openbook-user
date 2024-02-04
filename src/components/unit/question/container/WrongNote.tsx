import { useEffect, useMemo, useReducer } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  ExamModel,
  QuestionCommentModel,
  QuestionModel,
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
import MultiButtonUI from "../../common/presenter/MultiButtonUI";
import { useDeleteWrongNoteMutation } from "../../../../store/api/questionApi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Default, Mobile } from "../../../atoms/layout/Responsive";
import useQuesryString from "../../../../hooks/useQueryString";

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
const SELECT_CHOICE = "SELECT_CHOICE";
const NEXT_QUESTION = "NEXT_QUESTION";
const CHECK_ANSWER = "CHECK_ANSWER";
const MOVE_QUESTION = "MOVE_QUESTION";
const DELETE_QUESTION = "DELETE_QUESTION";
const RESET_STATE = "RESET_STATE";

export type Action =
  | {
      type: "SELECT_CHOICE";
      checkedChoiceKey: string;
    }
  | { type: "CHECK_ANSWER" }
  | { type: "NEXT_QUESTION" }
  | { type: "MOVE_QUESTION"; moveQuestionNumber: number }
  | { type: "DELETE_QUESTION" }
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
      if (state.currentNumber === state.questionList.length - 1) return state;
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

    case DELETE_QUESTION:
      state.questionList.splice(state.currentNumber, 1);
      if (state.questionList.length === state.currentNumber) {
        return { ...state, currentNumber: state.currentNumber - 1 };
      }
      return state;
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

function WrongNote({ examList }: ExamProps) {
  const { round } = useQuesryString();
  const navigate = useNavigate();
  const [deleteWrongNote] = useDeleteWrongNoteMutation();
  const [state, dispatch] = useReducer(reducer, {
    questionList: [...examList].map(createQuestion),
    isFinish: false,
    currentNumber: 0,
    score: 0,
  });
  const { questionList, currentNumber } = state;
  const image = useMemo(() => {
    return images[Math.floor(Math.random() * images.length)];
  }, []);

  useEffect(() => {
    dispatch({
      type: "RESET_STATE",
      questionList: [...examList].map(createQuestion),
      isFinish: false,
      currentNumber: 0,
      score: 0,
    });
  }, [round, examList]);

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

  const handleDelete = async () => {
    if (questionList.length === 1) {
      await deleteWrongNote(questionList[currentNumber].id);
      navigate("/my-info/wrong-notes");
    } else {
      await deleteWrongNote(questionList[currentNumber].id);
      dispatch({ type: "DELETE_QUESTION" });
    }
  };

  return (
    <QuestionLayout>
      <QuestionNavigationUI
        onClickMove={handleMove}
        questionList={questionList}
        currentNumber={currentNumber}
        isFinish={true}
        isWrongNote={true}
      />
      <Default>
        <MultiButtonUI
          buttonList={[
            {
              onClick: handleDelete,
              contents: (
                <>
                  <Icon icon="fail" size={12} />
                  &nbsp;삭제
                </>
              ),
            },
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
      </Default>
      <QuestionUI
        quetion={questionList[currentNumber]}
        onChoiceClick={handleChoiceClick}
        image={image}
      />
      <Mobile>
        <MultiButtonUI
          buttonList={[
            {
              onClick: handleDelete,
              contents: (
                <>
                  <Icon icon="fail" size={12} />
                  &nbsp;삭제
                </>
              ),
            },
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
      </Mobile>
    </QuestionLayout>
  );
}

export default WrongNote;
