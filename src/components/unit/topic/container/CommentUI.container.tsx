import styled from "styled-components";
import Icon from "../../../atoms/icon/Icon";

const Comment = styled.ul<{ open: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-top: ${({ open }) => (open ? "10px" : "0")};
  padding: ${({ theme, open }) => (open ? theme.padding.small : "0")};
  border-radius: ${({ theme }) => theme.padding.base};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  max-height: ${({ open }) => (open ? `600px` : "0")};
  font-size: ${({ open, theme }) => (open ? theme.fontSizes.small : "0px")};
  color: ${({ open }) => (open ? "inherit" : "transparent")};
  background-color: ${({ theme }) => theme.colors.white};
  transition: 0.1s ease-in-out;

  li:not(:last-child) {
    margin-bottom: 6px;
  }
`;

const Triangle = styled.li<{ open: boolean }>`
  border-bottom: 10px solid ${({ open }) => (open ? "white" : "transparent")};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 0px solid transparent;
  content: "";
  position: absolute;
  top: ${({ open }) => (open ? "-10px" : "0px")};
  left: 20px;
  z-index: 0;
  transition: 0.15s ease-in-out;
`;

const Description = styled.li<{ open: boolean }>`
  display: flex;
  width: fit-content;
  flex-wrap: nowrap;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme, open }) => (open ? theme.fontSizes.xs : 0)};
  color: ${({ theme }) => theme.colors.textBlue};
  line-height: 120%;
  overflow: hidden;
`;

const CommentIcon = styled.div`
  margin-top: 2px;
  margin-right: 5px;
`;

interface CommentUIProps {
  isCommentOpen: boolean;
  commentList: string[];
}

function CommentUI({ isCommentOpen, commentList }: CommentUIProps) {
  return (
    <Comment open={isCommentOpen}>
      <Triangle open={isCommentOpen} />
      {commentList.map((comment) => {
        return (
          <Description key={comment} open={isCommentOpen}>
            <CommentIcon>
              <Icon icon="check" />
            </CommentIcon>
            {comment}
          </Description>
        );
      })}
    </Comment>
  );
}

export default CommentUI;
