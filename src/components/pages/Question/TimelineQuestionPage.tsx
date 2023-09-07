import useGetExChapterList from "../../../example/useGetExJJHChapterList";
import { useState } from "react";
import Icon from "../../atoms/Icon";
import QuestionOptionTemplate from "../../templates/Question/QuestionOptionTemplate";
import { useNavigate, useParams } from "react-router-dom";
import TimelineQuestionTemplate from "../../templates/Question/TimelineQuestionTemplate";
import useGetExDateList from "../../../example/useGetExDateList";
import { useGetTimelineQuery } from "../../../store/api/questionApi";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";

function TimelineQuestionPage() {
  const navigate = useNavigate();
  const { chapter } = useParams();
  /******************************* 실제 코드 *********************************/
  const { data: chapterList } = useGetChaptersQuery();
  const { data: dateList } = useGetTimelineQuery(Number(chapter));
  /************************ ↓예시 코드↓ / ↑실제 코드↑ **************************/
  // const { data: dateList } = useGetExDateList();
  // const { data } = useGetExChapterList();
  // const [chapterList] = useState(data);
  /******************************* 예시 코드 *********************************/
  const [selectedTimeLimit, setSelectedTimeLimit] = useState("무제한");
  const [selectedChapter, setSelectedChapter] = useState("무작위");
  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] = useState("1");
  const [start, setStart] = useState<boolean>(false);

  const handleStart = () => {
    setStart(true);
  };

  const handleNext = () => {
    navigate("/question");
  };

  const handleSelectTimeLimit = (e: any) => {
    setSelectedTimeLimit(e.target.value);
  };

  const handleSelectChapter = (e: any) => {
    setSelectedChapter(e.target.value);
  };

  const handleSelectNumberOfQuestion = (e: any) => {
    setSelectedNumberOfQuestion(e.target.value);
  };

  if (!dateList || !chapterList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {start ? (
        <TimelineQuestionTemplate
          backLink="/question"
          handleNextContent={handleNext}
          dateList={dateList}
        />
      ) : (
        <QuestionOptionTemplate
          title="연표 문제"
          icon={<Icon category="연표 문제" />}
          handleStart={handleStart}
          optionList={[
            {
              title: "시간제한",
              icon: <Icon category="시간제한" />,
              handleSelect: handleSelectTimeLimit,
              selectedItem: selectedTimeLimit,
              selectName: "time-limit",
              optionList: [
                { value: "infinite", key: "infinite", description: "무제한" },
              ],
            },
            {
              title: "단원 선택",
              icon: <Icon category="단원 학습" />,
              handleSelect: handleSelectChapter,
              selectedItem: selectedChapter,
              selectName: "chapter",
              optionList: [
                { value: "random", key: "random", description: "무작위" },
                { value: "all", key: "all", description: "전체" },
                ...chapterList.map((item) => {
                  return {
                    value: `${item.number}`,
                    key: `${item.number}`,
                    description: `${item.number}. ${item.title}`,
                  };
                }),
              ],
            },
            {
              title: "문제 수",
              icon: <Icon category="갯수" />,
              handleSelect: handleSelectNumberOfQuestion,
              selectedItem: selectedNumberOfQuestion,
              selectName: "number-of-question",
              optionList: [{ value: "1", key: "1", description: "1" }],
            },
          ]}
        />
      )}
    </>
  );
}

export default TimelineQuestionPage;
