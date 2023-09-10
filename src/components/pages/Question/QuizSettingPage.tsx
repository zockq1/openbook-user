import { useState } from "react";
import Icon from "../../atoms/Icon";
import QuestionOptionTemplate from "../../templates/Question/QuestionOptionTemplate";
import { useNavigate } from "react-router-dom";
import { useGetChaptersQuery } from "../../../store/api/chapterApi";

function QuizSettingPage() {
  const navigate = useNavigate();
  const { data: chapterList } = useGetChaptersQuery();
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(Infinity);
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] =
    useState<number>(5);

  const handleStart = () => {
    navigate(
      `/question/quiz?timelimit=${selectedTimeLimit}&chapter=${selectedChapter}&noq=${selectedNumberOfQuestion}`
    );
  };

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
            { value: 0, key: 0, description: "무작위" },
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
          optionList: [
            { value: 5, key: 5, description: "5" },
            { value: 10, key: 10, description: "10" },
            { value: 20, key: 20, description: "20" },
          ],
        },
      ]}
    />
  );
}

export default QuizSettingPage;
