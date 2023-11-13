import { useMemo, useReducer } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  ExamModel,
  QuestionCommentModel,
  QuestionModel,
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
import MultiButtonUI from "../../common/container/MultiButtonUI.container";

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

export type Action =
  | {
      type: "SELECT_CHOICE";
      checkedChoiceKey: string;
    }
  | { type: "CHECK_ANSWER" }
  | { type: "NEXT_QUESTION" }
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

  return (
    <>
      <QuestionNavigationUI
        onClickMove={handleMove}
        questionList={questionList}
        currentNumber={currentNumber}
        isFinish={true}
      />
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
  );
}

export default Exam;
