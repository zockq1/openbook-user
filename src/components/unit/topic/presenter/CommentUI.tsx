import styled, { ThemeContext } from "styled-components";
import { ReactNode, useContext } from "react";

const Comment = styled.ul<{ open: boolean; color: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-top: ${({ open }) => (open ? "10px" : "0")};
  padding: ${({ theme, open }) => (open ? theme.padding.small : "0")};
  border-radius: ${({ theme }) => theme.padding.base};
  border: 1px solid
    ${({ theme, open, color }) => (open ? color : "transparent")};
  max-height: ${({ open }) => (open ? `600px` : "0")};
  color: ${({ open }) => (open ? "inherit" : "transparent")};
  background-color: ${({ theme, open }) =>
    open ? theme.colors.white : "transparent"};
  transition: 0.1s ease-in-out;

  li:not(:last-child) {
    margin-bottom: 6px;
  }
`;

const Triangle = styled.li<{ open: boolean; color: string }>`
  position: absolute;
  width: 10px;
  height: 10px;
  top: ${({ open }) => (open ? "-6px" : "-25px")};
  left: 20px;
  border-top: 1px solid ${({ color, open }) => (open ? color : "transparent")};
  border-left: 1px solid ${({ color, open }) => (open ? color : "transparent")};
  background-color: ${({ theme, open }) =>
    open ? theme.colors.white : "transparent"};
  z-index: 0;
  transform: rotate(45deg);
  transition: 0.1s ease-in-out;
`;

const Description = styled.li<{ open: boolean; color: string }>`
  display: flex;
  width: fit-content;
  flex-wrap: nowrap;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme, open }) => (open ? theme.fontSizes.xs : 0)};
  color: ${({ color, theme }) => color};
  line-height: 120%;
  word-break: keep-all;
  overflow: hidden;
`;

const CommentIcon = styled.div`
  width: 12px;
  height: 12px;
  margin-right: 4px;
  flex-shrink: 0;
`;

const CommentDivider = styled.div<{ color: string }>`
  width: 100%;
  height: 1px;
  margin-bottom: 8px;
  background-color: ${({ color, theme }) => color};
  opacity: 0.2;
`;

interface CommentUIProps {
  isCommentOpen: boolean;
  commentList: { comment: string; icon: ReactNode }[];
  color?: string;
}

function CommentUI({ isCommentOpen, commentList, color = "" }: CommentUIProps) {
  const theme = useContext(ThemeContext);
  return (
    <Comment open={isCommentOpen} color={color || theme.colors.lightGrey}>
      <Triangle open={isCommentOpen} color={color || theme.colors.lightGrey} />
      {commentList.map((item, index, arr) => {
        const { comment, icon } = item;
        if (comment.includes("divider")) {
          if (index === arr.length - 1) return null;
          return (
            <CommentDivider
              color={color || theme.colors.grey}
              key={index + comment}
            />
          );
        }
        return (
          <Description
            key={index + comment}
            open={isCommentOpen}
            color={color || theme.colors.textBlue}
          >
            <CommentIcon>{icon}</CommentIcon>
            {comment}
          </Description>
        );
      })}
    </Comment>
  );
}

export default CommentUI;
