import TitleBox from "../molecules/TitleBox";
import Layout from "../atoms/Layout";
import styled from "styled-components";
import TimelineList from "../organisms/TimelineList";
import Button from "../atoms/Button";
import { TimeLineModel } from "../../types/questionTypes";

interface TimelineLearningTemplateProps {
  chapterNumber: number;
  title: string;
  dateList: TimeLineModel[];
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

function TimelineLearningTemplate({
  chapterNumber,
  title,
  dateList,
  handleNextContent,
}: TimelineLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox
        backLink={`/jeong-ju-haeng/${chapterNumber}`}
        title={title}
        category="연표 학습"
      />
      <Line />
      <TimelineList dateList={dateList} />
      <Button onClick={handleNextContent}>다음</Button>
    </Layout>
  );
}

export default TimelineLearningTemplate;
