import styled from "styled-components";
import Icon from "../../../atoms/icon/Icon";

interface KeywordCommentBoxProps {
  title: string;
  comment: string;
  file?: string;
  isCommentOn: boolean;
  onCommentToggle: () => void;
}

const Keyword = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: ${({ theme }) => theme.padding.small};
  margin: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.keywordBg};
  color: ${({ theme }) => theme.colors.textBlue};
  border: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.large};
  word-break: keep-all;
  cursor: pointer;

  transition: 1s height ease;
`;

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin: 10px 0 0;
`;

const CommentList = styled.ul`
  border-top: ${({ theme }) => `1px solid ${theme.colors.lightGrey}`};
  margin-top: 8px;
`;

const Comment = styled.li`
  display: flex;
  width: fit-content;
  margin-top: 8px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ color, theme }) => color};
  line-height: 120%;
  word-break: keep-all;
`;

const CommentIcon = styled.div`
  width: 12px;
  height: 12px;
  margin-right: 4px;
  flex-shrink: 0;
`;

function KeywordUI({
  title,
  comment,
  file,
  isCommentOn,
  onCommentToggle,
}: KeywordCommentBoxProps) {
  return (
    <Keyword onClick={onCommentToggle}>
      <div>{title}</div>
      {file && <Image src={file} />}
      {isCommentOn && (
        <CommentList>
          {comment ? (
            comment
              .trim()
              .split(".")
              .filter(Boolean)
              .map((item) => {
                return (
                  <Comment key={item}>
                    <CommentIcon>
                      <Icon icon="checkBox" size={12} />
                    </CommentIcon>
                    {item.trim()}
                  </Comment>
                );
              })
          ) : (
            <Comment key="-">
              <Icon icon="checkBox" size={12} /> &nbsp;
              {"-"}
            </Comment>
          )}
        </CommentList>
      )}
    </Keyword>
  );
}

export default KeywordUI;
