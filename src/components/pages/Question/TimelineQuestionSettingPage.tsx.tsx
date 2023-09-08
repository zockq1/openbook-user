import { useState } from "react";
import Icon from "../../atoms/Icon";
import QuestionOptionTemplate from "../../templates/Question/QuestionOptionTemplate";
import { useNavigate } from "react-router-dom";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";

function TimelineQuestionSettingPage() {
  const navigate = useNavigate();
  const { data: chapterList } = useGetChaptersQuery();
  const [selectedTimeLimit, setSelectedTimeLimit] = useState("무제한");
  const [selectedChapter, setSelectedChapter] = useState("random");
  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] = useState("1");

  const handleStart = () => {
    let chapter = selectedChapter;
    switch (selectedChapter) {
      case "all":
        chapter = "0";
        break;
      case "random":
        chapter = "-1";
        break;
    }
    navigate(
      `/question/timeline?timelimit=${selectedTimeLimit}&chapter=${chapter}&noq=${selectedNumberOfQuestion}`
    );
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

  if (!chapterList) {
    return <div>Loading...</div>;
  }

  return (
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
  );
}

export default TimelineQuestionSettingPage;
