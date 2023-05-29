import styled from "styled-components";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";

const TopicBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;

  width: 95%;
  height: 80vh;

  border-radius: 10px;

  margin: 85px auto 10px;
  padding-left: 15px;
  padding-top: 15px;
  background-color: #fff;
`;

const TopicTitle = styled.p`
  font-weight: 700;
  font-size: 18px;
`;

const BookmarkButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

interface TopicComponentProps {
  topicTitle: string;
  topic: { startDate: number; endDate: number; detail: string } | undefined;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

function TopicInfo({
  topicTitle,
  topic,
  isBookmarked,
  onBookmarkToggle,
}: TopicComponentProps) {
  return (
    <TopicBox>
      <TopicTitle>{topicTitle}</TopicTitle>
      <BookmarkButton onClick={onBookmarkToggle}>
        {isBookmarked ? (
          <RiBookmarkFill size={30} />
        ) : (
          <RiBookmarkLine size={30} />
        )}
      </BookmarkButton>
      <br />
      <p>
        {topic?.startDate} ~ {topic?.endDate}
      </p>
      <br />
      {topic?.detail &&
        topic?.detail.split("\n").map((line, index) => {
          return <p key={index}>{line}</p>;
        })}
    </TopicBox>
  );
}

export default TopicInfo;
