import { useNavigate, useParams } from "react-router-dom";
import TopicLearningTemplate from "../../templates/JJH/TopicLearningTemplate";
import { useGetTopicQuery } from "../../../store/api/topicApi";
import { useEffect, useState } from "react";
import TopicQuestionTemplate from "../../templates/JJH/TopicQuestionTemplate";
import {
  useGetTtoKQuestionQuery,
  useGetTtoSQuestionQuery,
} from "../../../store/api/questionApi";
import { QuestionModel } from "../../../types/questionTypes";
import { useGetContentListQuery } from "../../../store/api/chapterApi";
import useGetExTopicInfo from "../../../example/useGetExTopicInfo";
import useGetExTtoKQuestionList from "../../../example/useGetExTtoKQuestionList";
import useGetExTtoSQuestionList from "../../../example/useGetExTtoSQuestionList";
import useGetExContentList from "../../../example/useGetExContentList";

type SelectedContent = "Learning" | "Question";

function TopicLearningPage() {
  const navigate = useNavigate();
  const { chapter, topic } = useParams();
  /******************************* 실제 코드 *********************************/
  // const { data: topicInfo } = useGetTopicQuery(String(topic));
  // const { data: TtoKQuestionList } = useGetTtoKQuestionQuery(String(topic));
  // const { data: TtoSQuestionList } = useGetTtoSQuestionQuery(String(topic));
  //const { data: contentList } = useGetContentListQuery(Number(chapter));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  const { data: topicInfo } = useGetExTopicInfo();
  const { data: TtoKQuestionList } = useGetExTtoKQuestionList();
  const { data: TtoSQuestionList } = useGetExTtoSQuestionList();
  const { data: contentList } = useGetExContentList();
  /******************************* 예시 코드 *********************************/
  const [selectedContent, setSelectedContent] =
    useState<SelectedContent>("Learning");
  const [questionList, setQuestionList] = useState<QuestionModel[]>([]);

  useEffect(() => {
    const questionList1 = TtoKQuestionList ? [...TtoKQuestionList] : [];
    const questionList2 = TtoSQuestionList ? [...TtoSQuestionList] : [];
    setQuestionList([...questionList1, ...questionList2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  const handleNextQuestion = () => {
    setSelectedContent("Question");
  };

  if (!contentList || !topicInfo) {
    return <div>Loading...</div>;
  }

  if (questionList.length === 0) {
    return <div>Loading...</div>;
  }

  const handleNextContent = () => {
    contentList.forEach((item, index, arr) => {
      if (item.title === topic) {
        const nextContent = arr[index + 1].content;
        const nextTopic = arr[index + 1].title;
        if (nextContent === "주제 학습") {
          setSelectedContent("Learning");
          navigate(`/jeong-ju-haeng/${chapter}/topic-learning/${nextTopic}`);
        } else if (nextContent === "단원 마무리 학습") {
          navigate(`/jeong-ju-haeng/${chapter}/final-learning/`);
        }
      }
    });
  };

  return (
    <>
      {selectedContent === "Learning" ? (
        <TopicLearningTemplate
          chapterNumber={Number(chapter)}
          topicTitle={String(topic)}
          topicInfo={topicInfo}
          handleNextContent={handleNextQuestion}
        />
      ) : (
        <TopicQuestionTemplate
          chapterNumber={Number(chapter)}
          topicTitle={String(topic)}
          questionList={questionList}
          handleNextContent={handleNextContent}
        />
      )}
    </>
  );
}
export default TopicLearningPage;
