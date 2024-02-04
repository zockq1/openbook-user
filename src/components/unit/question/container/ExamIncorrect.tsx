import { useContext } from "react";
import { QuestionModel } from "../../../../types/questionTypes";
import IncorrectUI, { IncorrectCommentModel } from "../presenter/IncorrectUI";
import { ThemeContext } from "styled-components";

interface ExamIncorrectProps {
  questionList: QuestionModel[];
}

function ExamIncorrect({ questionList }: ExamIncorrectProps) {
  const theme = useContext(ThemeContext);
  const commentList: IncorrectCommentModel[] = questionList
    .filter((question) => question.isFinish && !question.isCorrect)
    .map((item) => {
      const {
        number,
        descriptionCommentList,
        choiceList,
        answer,
        checkedChoiceKey,
      } = item;
      return {
        number,
        commentList: [
          ...descriptionCommentList
            .filter((comment) => comment.type !== "Comment")
            .map((comment) => {
              return {
                color: theme.colors.textBlue,
                comment: comment.comment,
                icon: comment.icon,
              };
            }),
          ...choiceList[Number(answer) - 1].commentList
            .filter((comment) => comment.type !== "Comment")
            .map((comment) => {
              return {
                color: theme.colors.blue,
                comment: comment.comment,
                icon: comment.icon,
              };
            }),
          ...choiceList[Number(checkedChoiceKey[1]) - 1].commentList
            .filter((comment) => comment.type !== "Comment")
            .map((comment) => {
              return {
                color: theme.colors.red,
                comment: comment.comment,
                icon: comment.icon,
              };
            }),
        ],
      };
    });
  return <IncorrectUI questionList={commentList} />;
}
export default ExamIncorrect;
