import styled from "styled-components";
import { KeywordModel } from "../../../../types/topicTypes";
import CommentUI from "./CommentUI.container";
import Icon from "../../../atoms/icon/Icon";

interface KeywordCommentBoxProps {
  keyword: KeywordModel;
  isCommentOn: boolean;
  onCommentToggle: () => void;
}

const Keyword = styled.div<{ isCommentOn: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 5px;
  width: ${({ isCommentOn }) => (isCommentOn ? "100%" : "")};
`;

const Title = styled.div<{ comment: boolean; commentVisible: boolean }>`
  width: fit-content;
  padding: ${({ theme }) => theme.padding.small};
  border-radius: 10px 10px 2px 2px;
  background-color: ${({ theme, comment }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textBlue};

  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  border-bottom: ${({ theme, commentVisible }) =>
    commentVisible
      ? `3px solid ${theme.colors.lightGrey}`
      : `1px solid ${theme.colors.lightGrey}`};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  z-index: 1;
  word-break: keep-all;
  cursor: ${({ comment }) => (comment ? "pointer" : "")};
`;

// const Badge = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: absolute;
//   z-index: 10;
//   width: 20px;
//   height: 20px;
//   top: -9px;
//   left: -7px;
//   padding: 5px;
//   border-radius: 100%;
//   border: 2px solid ${({ theme }) => theme.colors.textBlue};
//   background-color: ${({ theme }) => theme.colors.bg};
//   color: ${({ theme }) => theme.colors.textBlue};
//   font-size: ${({ theme }) => theme.fontSizes.xxs};
//   font-weight: ${({ theme }) => theme.fontWeight.bold};
// `;

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
`;

function KeywordUI({
  keyword,
  isCommentOn,
  onCommentToggle,
}: KeywordCommentBoxProps) {
  const { name, comment, file } = keyword;

  return (
    <Keyword isCommentOn={comment ? isCommentOn : false}>
      {/* {questionList.length !== 0 && <Badge>{questionList.length}</Badge>} */}
      <Title
        onClick={!comment ? () => {} : onCommentToggle}
        commentVisible={comment ? !isCommentOn : false}
        comment={!!comment}
      >
        {file && <Image src={file} />}
        <div>{name}</div>
      </Title>
      {comment && (
        <CommentUI
          isCommentOpen={isCommentOn}
          commentList={comment
            .trim()
            .split(".")
            .filter(Boolean)
            .map((item) => {
              return {
                comment: item,
                icon: <Icon icon="checkBox" size={12} />,
              };
            })}
        />
      )}
    </Keyword>
  );
}

export default KeywordUI;
