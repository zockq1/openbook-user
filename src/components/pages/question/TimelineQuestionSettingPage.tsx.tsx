import { useState } from "react";
import Icon from "../../atoms/icon/Icon";
import QuestionOptionTemplate from "../../templates/question/QuestionOptionTemplate";
import { useNavigate } from "react-router-dom";
import { useGetTimelineListQuery } from "../../../store/api/timelineApi";

function TimelineQuestionSettingPage() {
  const navigate = useNavigate();
  const { data: timelineList } = useGetTimelineListQuery();
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(Infinity);
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] =
    useState<number>(1);

  const handleSelectTimeLimit = (e: any) => {
    setSelectedTimeLimit(Number(e.target.value));
  };

  const handleSelectChapter = (e: any) => {
    setSelectedId(Number(e.target.value));
  };

  const handleSelectNumberOfQuestion = (e: any) => {
    setSelectedNumberOfQuestion(Number(e.target.value));
  };

  if (!timelineList) {
    return <div>Loading...</div>;
  }

  const handleStart = () => {
    navigate(
      `/question/timeline?timelimit=${selectedTimeLimit}&id=${selectedId}&noq=${selectedNumberOfQuestion}`
    );
  };

  return (
    <QuestionOptionTemplate
      title="연표 문제"
      handleBackPage={() => navigate("/question")}
      icon={<Icon icon="연표 문제" />}
      handleStart={handleStart}
      optionList={[
        {
          title: "시간제한",
          icon: <Icon icon="clock" />,
          handleSelect: handleSelectTimeLimit,
          selectName: "time-limit",
          optionList: [
            { value: Infinity, key: Infinity, description: "무제한" },
            { value: 60 * 20, key: 60 * 20, description: "20분" },
          ],
        },
        {
          title: "연표 선택",
          icon: <Icon icon="연표 문제" />,
          handleSelect: handleSelectChapter,
          selectName: "chapter",
          optionList: [
            { value: -1, key: -1, description: "전체" },
            { value: 0, key: 0, description: "무작위" },
            ...timelineList.map((timeline) => {
              return {
                value: timeline.id,
                key: timeline.id,
                description: `${timeline.era}(${timeline.startDate} ~ ${timeline.endDate})`,
              };
            }),
          ],
        },
        {
          title: "문제 수",
          icon: <Icon icon="listNumber" />,
          handleSelect: handleSelectNumberOfQuestion,
          selectName: "number-of-question",
          optionList: [{ value: 1, key: 1, description: "1" }],
        },
      ]}
    />
  );
}

export default TimelineQuestionSettingPage;
