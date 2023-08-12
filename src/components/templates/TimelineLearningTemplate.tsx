import TitleBox from "../molecules/TitleBox";
import Layout from "../atoms/Layout";
import styled from "styled-components";
import TimelineList from "../organisms/TimelineList";

interface TimelineLearningTemplateProps {
  title: string;
  dateList: {
    comment: string;
    date: number;
  }[];
}

const Line = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.blue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  width: 16px;
  height: 100%;
  left: 90px;
  z-index: 0;
`;

function TimelineLearningTemplate({
  title,
  dateList,
}: TimelineLearningTemplateProps) {
  return (
    <Layout>
      <TitleBox title={title} category="연표 학습" />
      <Line />
      <TimelineList dateList={dateList} />
    </Layout>
  );
}

export default TimelineLearningTemplate;
