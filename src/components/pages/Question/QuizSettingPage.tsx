import { useState } from "react";
import Icon from "../../atoms/Icon";
import QuestionOptionTemplate from "../../templates/Question/QuestionOptionTemplate";
import { useNavigate } from "react-router-dom";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";

function QuizSettingPage() {
  const navigate = useNavigate();
  const { data: chapterList } = useGetChaptersQuery();
  const [selectedTimeLimit, setSelectedTimeLimit] = useState("infinite");
  const [selectedChapter, setSelectedChapter] = useState("random");
  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] = useState(5);

  const handleStart = () => {
    const chapter = selectedChapter === "random" ? 0 : selectedChapter;
    navigate(
      `/question/quiz?timelimit=${selectedTimeLimit}&chapter=${chapter}&noq=${selectedNumberOfQuestion}`
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
      title="퀴즈"
      icon={<Icon category="퀴즈" />}
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
          selectedItem: String(selectedNumberOfQuestion),
          selectName: "number-of-question",
          optionList: [
            { value: "5", key: "5", description: "5" },
            { value: "10", key: "10", description: "10" },
            { value: "20", key: "20", description: "20" },
          ],
        },
      ]}
    />
  );
}

export default QuizSettingPage;
