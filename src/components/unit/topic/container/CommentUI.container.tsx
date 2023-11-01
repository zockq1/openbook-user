import { ReactNode } from "react";
import styled from "styled-components";

const Comment = styled.div<{ open: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-top: ${({ open }) => (open ? "10px" : "0")};
  padding: ${({ theme, open }) => (open ? theme.padding.small : "0")};
  border-radius: ${({ theme }) => theme.padding.base};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  max-height: ${({ open }) => (open ? `500px` : "0")};
  font-size: ${({ open, theme }) => (open ? theme.fontSizes.small : "0px")};
  color: ${({ open }) => (open ? "inherit" : "transparent")};
  background-color: ${({ theme }) => theme.colors.white};
  transition: 0.1s ease-in-out;
`;

const Triangle = styled.div<{ open: boolean }>`
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

interface CommentUIProps {
  isCommentOpen: boolean;
  children: ReactNode;
}

function CommentUI({ isCommentOpen, children }: CommentUIProps) {
  return (
    <>
      <Comment open={isCommentOpen}>
        <Triangle open={isCommentOpen} />
        {children}
      </Comment>
    </>
  );
}

export default CommentUI;
