import styled, { ThemeContext } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { QuestionModel } from "../../../../types/questionTypes";
import { ColumnList } from "../../../atoms/layout/List";
import { LongChoiceItem } from "./LongChoiceItem";
import CommentUI from "../../topic/container/CommentUI.container";
import { useContext } from "react";
import { ShortChoiceItem } from "./ShortChoiceItem";
import { Mobile } from "../../../atoms/layout/Responsive";

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
  min-height: 240px;
  @media (max-width: 767px) {
    min-height: calc((100vh - 540px));
  }
  margin: 5px 0;
  padding: ${({ theme }) => theme.padding.small};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  @media (min-width: 768px) {
    margin: 5px;
  }
`;

const Image = styled.img`
  position: absolute;
  width: 90%;
  height: 90%;
  object-fit: contain;
  opacity: 0.05;
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

const DescriptionItem = styled.div`
  width: fit-content;
  padding: 10px;
  margin: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.textBlue};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;
  word-break: keep-all;
  text-align: center;
`;

const CommentContainer = styled.div`
  @media (min-width: 768px) {
    margin: 0 5px;
  }
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
      <div>
        <Description>
          {questionType === "Exam" ? (
            <img
              style={{ width: "100%", height: "auto" }}
              src={descriptionList[0]}
              alt=""
            />
          ) : questionType === "KtoT" && choiceType === "Image" ? (
            <>
              <Image src={image} />
              {descriptionList.map((item) => {
                return (
                  <DescriptionItem key={item}>
                    <img
                      style={{ width: "50%", height: "100%" }}
                      src={item}
                      alt=""
                    />
                  </DescriptionItem>
                );
              })}
            </>
          ) : (
            <>
              <Image src={image} />
              {descriptionList.map((item) => {
                return <DescriptionItem key={item}>{item}</DescriptionItem>;
              })}
            </>
          )}
        </Description>
        {descriptionCommentList.length > 0 &&
          (choiceType === "String" || questionType === "KtoT") && (
            <CommentContainer>
              <CommentUI
                isCommentOpen={isFinish}
                commentList={descriptionCommentList}
              />
            </CommentContainer>
          )}
      </div>
      {choiceType === "String" || questionType === "KtoT" ? (
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
                  index={index}
                />
                {item.commentList.length > 0 && (
                  <CommentContainer>
                    <CommentUI
                      isCommentOpen={isFinish}
                      commentList={item.commentList}
                      color={
                        answer === item.key
                          ? theme.colors.blue
                          : theme.colors.red
                      }
                    />
                  </CommentContainer>
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
      <Mobile>
        <div style={{ height: "100px" }}></div>
      </Mobile>
    </>
  );
}

export default QuestionUI;
