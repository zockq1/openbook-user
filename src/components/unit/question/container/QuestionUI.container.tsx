import styled, { ThemeContext } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { QuestionModel } from "../../../../types/questionTypes";
import TextBox from "../../../atoms/box/TextBox";
import { ColumnList } from "../../../atoms/layout/List";
import { LongChoiceItem } from "../../../molecules/list-item/LongChoiceItem";
import CommentUI from "../../topic/container/CommentUI.container";
import { useContext } from "react";
import { ShortChoiceItem } from "../../../molecules/list-item/ShortChoiceItem";

interface QuestionProps {
  quetion: QuestionModel;
  onChoiceClick: (choiceId: string) => void;
  image: string;
}

const Description = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  min-height: calc((100vh - 540px));
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.small};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  width: 90%;
  height: 90%;
  object-fit: contain;
  opacity: 0.15;
`;

const ImageChoiceList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ImageChoice = styled.li`
  width: calc((100% - 20px) / 2);
  margin-bottom: 10px;
`;

function QuestionUI({ quetion, onChoiceClick, image }: QuestionProps) {
  const {
    descriptionList,
    choiceList,
    answer,
    isFinish,
    checkedChoiceKey,
    descriptionCommentList,
    choiceType,
    questionType,
  } = quetion;
  const theme = useContext(ThemeContext);

  return (
    <>
      <Description>
        {questionType === "Exam" ? (
          <img
            style={{ width: "100%", height: "auto" }}
            src={descriptionList[0]}
            alt=""
          />
        ) : (
          <>
            <Image src={image} />
            {descriptionList.map((item) => {
              return (
                <TextBox maxWidth="full" key={item}>
                  {item}
                </TextBox>
              );
            })}
          </>
        )}
      </Description>
      {descriptionCommentList.length > 0 && (
        <CommentUI
          isCommentOpen={isFinish}
          commentList={descriptionCommentList}
        />
      )}
      {choiceType === "String" ? (
        <>
          <ColumnList>
            {choiceList.map((item, index) => (
              <li key={String(index) + item.key}>
                <LongChoiceItem
                  handleChoiceClick={onChoiceClick}
                  choiceKey={String(index + 1) + item.key}
                  isCorrect={answer === item.key}
                  choice={item.choice}
                  isFinish={isFinish}
                  selectedCheckbox={checkedChoiceKey}
                />
                {item.commentList.length > 0 && (
                  <CommentUI
                    isCommentOpen={isFinish}
                    commentList={item.commentList}
                    color={
                      answer === item.key ? theme.colors.blue : theme.colors.red
                    }
                  />
                )}
              </li>
            ))}
          </ColumnList>
        </>
      ) : (
        <>
          <ImageChoiceList>
            {choiceList.map((item, index) => (
              <ImageChoice key={String(index) + item.key}>
                <ShortChoiceItem
                  handleChoiceClick={onChoiceClick}
                  choiceKey={String(index + 1) + item.key}
                  isCorrect={answer === item.key}
                  choice={item.choice}
                  isFinish={isFinish}
                  selectedCheckbox={checkedChoiceKey}
                />
                {item.commentList.length > 0 && (
                  <CommentUI
                    isCommentOpen={isFinish}
                    commentList={item.commentList}
                    color={
                      answer === item.key ? theme.colors.blue : theme.colors.red
                    }
                  />
                )}
              </ImageChoice>
            ))}
          </ImageChoiceList>
        </>
      )}
    </>
  );
}

export default QuestionUI;
