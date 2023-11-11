import { ReactNode } from "react";
import styled from "styled-components";

const ChapterTitle = styled.button`
  margin: ${({ theme }) => theme.margin.base};
  margin-bottom: 0;
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid ${({ theme }) => theme.colors.semiLightBlue};

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  font-family: "Giants-Regular";
`;

interface BookmarkChapterProps {
  chapterTitle: string;
  topicCount: number;
  isTopicOn: boolean;
  onTopicToggle: () => void;
  children: ReactNode;
}

function BookmarkChapterUI({
  chapterTitle,
  isTopicOn,
  onTopicToggle,
  topicCount,
  children,
}: BookmarkChapterProps) {
  return (
    <>
      <ChapterTitle onClick={onTopicToggle}>{`${
        isTopicOn ? "▼" : "▶"
      } ${chapterTitle}(${topicCount})`}</ChapterTitle>
      {isTopicOn && children}
    </>
  );
}

export default BookmarkChapterUI;
