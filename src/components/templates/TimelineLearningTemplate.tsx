import TitleBox from "../molecules/TitleBox";
import Layout from "../atoms/Layout";
import styled from "styled-components";
import TimelineList from "../organisms/TimelineList";
import Button from "../atoms/Button";

interface TimelineLearningTemplateProps {
  title: string;
  dateList: {
    comment: string;
    date: number;
    topicTitle: string;
  }[];
  handleNextProgress: () => void;
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
  title,
  dateList,
  handleNextProgress,
}: TimelineLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox title={title} category="연표 학습" />
      <Line />
      <TimelineList dateList={dateList} />
      <Button onClick={handleNextProgress}>다음</Button>
    </Layout>
  );
}

export default TimelineLearningTemplate;
