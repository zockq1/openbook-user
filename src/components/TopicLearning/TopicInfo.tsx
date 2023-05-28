import styled from "styled-components";

const TopicBox = styled.div`
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

interface TopicComponentProps {
  topicTitle: string;
  topic: { startDate: number; endDate: number; detail: string } | undefined;
}

function TopicInfo({ topicTitle, topic }: TopicComponentProps) {
  return (
    <TopicBox>
      <TopicTitle>{topicTitle}</TopicTitle>
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
