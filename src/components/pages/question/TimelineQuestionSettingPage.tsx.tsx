import { useState } from "react";
import Icon from "../../atoms/icon/Icon";
import QuestionOptionTemplate from "../../templates/question/QuestionOptionTemplate";
import { useNavigate } from "react-router-dom";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";

function TimelineQuestionSettingPage() {
  const navigate = useNavigate();
  const { data: chapterList } = useGetChaptersQuery();
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(Infinity);
  const [selectedChapter, setSelectedChapter] = useState<number>(-1);
  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] =
    useState<number>(1);

  const handleSelectTimeLimit = (e: any) => {
    setSelectedTimeLimit(Number(e.target.value));
  };

  const handleSelectChapter = (e: any) => {
    setSelectedChapter(Number(e.target.value));
  };

  const handleSelectNumberOfQuestion = (e: any) => {
    setSelectedNumberOfQuestion(Number(e.target.value));
  };

  if (!chapterList) {
    return <div>Loading...</div>;
  }

  const handleStart = () => {
    let chapter = selectedChapter;
    if (selectedChapter === -1) {
      chapter =
        chapterList[Math.floor(Math.random() * chapterList.length)].number;
    }
    navigate(
      `/question/timeline?timelimit=${selectedTimeLimit}&chapter=${chapter}&noq=${selectedNumberOfQuestion}`
    );
  };

  return (
    <QuestionOptionTemplate
      title="연표 문제"
      handleBackPage={() => navigate("/question")}
      icon={<Icon category="연표 문제" />}
      handleStart={handleStart}
      optionList={[
        {
          title: "시간제한",
          icon: <Icon category="시간제한" />,
          handleSelect: handleSelectTimeLimit,
          selectName: "time-limit",
          optionList: [
            { value: Infinity, key: Infinity, description: "무제한" },
            { value: 60 * 20, key: 60 * 20, description: "20분" },
          ],
        },
        {
          title: "단원 선택",
          icon: <Icon category="단원 학습" />,
          handleSelect: handleSelectChapter,
          selectName: "chapter",
          optionList: [
            { value: -1, key: -1, description: "무작위" },
            { value: 0, key: 0, description: "전체" },
            ...chapterList.map((item) => {
              return {
                value: item.number,
                key: item.number,
                description: `${item.number}. ${item.title}`,
              };
            }),
          ],
        },
        {
          title: "문제 수",
          icon: <Icon category="갯수" />,
          handleSelect: handleSelectNumberOfQuestion,
          selectName: "number-of-question",
          optionList: [{ value: 1, key: 1, description: "1" }],
        },
      ]}
    />
  );
}

export default TimelineQuestionSettingPage;
