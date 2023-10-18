import { useState } from "react";
import Icon from "../../atoms/icon/Icon";
import QuestionOptionTemplate from "../../templates/question/QuestionOptionTemplate";
import { useNavigate } from "react-router-dom";
import { useGetRoundsQuery } from "../../../store/api/questionApi";

function MockExamSettingPage() {
  const navigate = useNavigate();
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(Infinity);
  const [selectedRound, setSelectedRound] = useState<number>(0);
  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] =
    useState<number>(5);
  const { data: roundList } = useGetRoundsQuery();
  const handleStart = () => {
    console.log("모의고사");
    navigate(
      `/question/mock-exam?timelimit=${selectedTimeLimit}&round=${selectedRound}&noq=${selectedNumberOfQuestion}`
    );
  };

  const handleSelectTimeLimit = (e: any) => {
    setSelectedTimeLimit(e.target.value);
  };

  const handleSelectChapter = (e: any) => {
    setSelectedRound(e.target.value);
  };

  const handleSelectNumberOfQuestion = (e: any) => {
    setSelectedNumberOfQuestion(e.target.value);
  };

  if (!roundList) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionOptionTemplate
      title="모의고사"
      handleBackPage={() => navigate("/question")}
      icon={<Icon icon="pen" />}
      handleStart={handleStart}
      optionList={[
        {
          title: "시간제한",
          icon: <Icon icon="clock" />,
          handleSelect: handleSelectTimeLimit,
          selectName: "time-limit",
          optionList: [
            { value: 60 * 70, key: 60 * 70, description: "70분" },
            { value: 60 * 80, key: 60 * 80, description: "80분" },
          ],
        },
        {
          title: "회차 선택",
          icon: <Icon icon="단원 학습" />,
          handleSelect: handleSelectChapter,
          selectName: "chapter",
          optionList: [
            { value: 0, key: 0, description: "무작위" },
            ...roundList.map((item) => {
              return {
                value: item.number,
                key: item.number,
                description: String(item.number) + "회",
              };
            }),
          ],
        },
        {
          title: "문제 수",
          icon: <Icon icon="listNumber" />,
          handleSelect: handleSelectNumberOfQuestion,
          selectName: "number-of-question",
          optionList: [{ value: 50, key: 50, description: "50문제" }],
        },
      ]}
    />
  );
}

export default MockExamSettingPage;
