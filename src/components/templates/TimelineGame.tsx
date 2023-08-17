import styled from "styled-components";
import TitleBox from "../molecules/TitleBox";
import TimelineItem from "../molecules/TimelineItem";
import Layout from "../atoms/Layout";
import Button from "../atoms/Button";

interface TimelineGameProps {
  chapterNumber: number;
  handleNextContent: () => void;
}

const Line = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.blue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  width: 16px;
  height: 80%;
  left: 90px;
  z-index: 0;
`;

const TopicBox = styled.div`
  position: absolute;
  top: 18%;
  right: 0%;

  display: flex;
  justify-content: space-around;
  width: max-content;
  padding: 4px;
  margin: 15px;
  border-radius: 10px;

  border: 5px dotted ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.bg};
`;

const Topic = styled.div`
  width: max-content;
  padding: 8px;
  border-radius: ${({ theme }) => theme.padding.base};

  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.small};

  line-height: 120%;
`;

const dateList = [
  {
    date: 1206,
    comment: "몽골 부족 통일",
  },
  {
    date: 1279,
    comment: "남송 멸망",
  },
];

const title = "1. 교역망의 발달과 은 유통";

function TimelineGame({ handleNextContent, chapterNumber }: TimelineGameProps) {
  return (
    <Layout>
      <TopicBox>
        <Topic>원 건국</Topic>
      </TopicBox>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        title={title}
        category="연표 문제"
      />

      <Line />
      {dateList.map((item, index) => {
        return (
          <TimelineItem
            date={item.date}
            comment={item.comment}
            key={index}
          ></TimelineItem>
        );
      })}
      <Button onClick={handleNextContent}>다음</Button>
    </Layout>
  );
}

export default TimelineGame;
