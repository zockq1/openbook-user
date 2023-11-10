import styled from "styled-components";
import TextBox from "../../../atoms/box/TextBox";
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

const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
  width: 20px;
  height: 20px;
  top: -9px;
  left: -7px;
  padding: 5px;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textBlue};
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

function KeywordUI({
  keyword,
  isCommentOn,
  onCommentToggle,
}: KeywordCommentBoxProps) {
  const { name, comment, questionList } = keyword;

  return (
    <Keyword isCommentOn={comment ? isCommentOn : false}>
      {questionList.length !== 0 && <Badge>{questionList.length}</Badge>}
      <TextBox
        maxWidth="full"
        shadow={false}
        color="bgBlue"
        onClick={!comment ? () => {} : onCommentToggle}
      >
        {`${name}`}
      </TextBox>
      {comment && (
        <CommentUI
          isCommentOpen={isCommentOn}
          commentList={comment
            .trim()
            .split(".")
            .filter(Boolean)
            .map((item) => {
              return { comment: item, icon: <Icon icon="check" /> };
            })}
        />
      )}
    </Keyword>
  );
}

export default KeywordUI;
