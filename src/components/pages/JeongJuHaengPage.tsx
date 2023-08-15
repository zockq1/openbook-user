import styled from "styled-components";
import ChapterLearningTemplate from "../templates/ChpaterLearningTemplate";
import TimelineLearningTemplate from "../templates/TimelineLearningTemplate";
import FindTopicGame from "../templates/FindTopicGameTemplate";
import TimelineGame from "../templates/TimelineGame";
import TopicLearningTemplate from "../templates/TopicLearningTemplate";
import FindSentenceGameTemplate from "../templates/FindSentenceGameTemplate";
import { QuestionModel } from "../../types/questionTypes";
import FindKeywordGameTemplate from "../templates/FindKeywordGameTemplate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const title = "1. 교역망의 발달과 은 유통";
const content =
  '<h2>1. 명의 해금 정책과 조공 무역 체제</h2><figure class="table"><table><tbody><tr><th>조선</th><td><p>조선은 조천사를 통해 명과 공무역</p><p>﻿조선은 생사, 비단, 서적 등을 수입</p></td></tr><tr><th>일본</th><td><p>무로마치 막부는 15세기 초 명의 책봉</p><p>﻿무로마치 막부는 생사, &nbsp;비단, 도자기, 서적 수입</p></td></tr><tr><th>류큐</th><td><p>류큐는 명과 조공 무역 전개</p><p>﻿﻿명의 해금 정책으로 류큐가 중계 무역의 거 포르투갈 상인의 진축로 류큐의 중계 무역 쇠퇴</p></td></tr></tbody></table></figure>';
const dateList = [
  {
    date: 1206,
    comment: "몽골 부족 통일",
    topicTitle: "1",
  },
  {
    date: 1234,
    comment: "금 몽골에 멸망",
    topicTitle: "1",
  },
  {
    date: 1271,
    comment: "원 건국",
    topicTitle: "1",
  },
  {
    date: 1279,
    comment: "남송 멸망",
    topicTitle: "1",
  },
];

const topicInfo = {
  startDate: 1352,
  endDate: 1374,
  category: "인물",
  extraDate: [
    {
      date: 1234,
      comment: "1234",
    },
  ],
  keywordList: [
    {
      name: "반원 개혁",
      comment: "원의 간섭에서 벗어나기 위해 반원 개혁 추진",
    },
    {
      name: "쌍성총관부",
      comment: "쌍성총관부를 공격하여 철령 이북의 영토를 회복",
    },
    {
      name: "신돈",
      comment:
        "신돈을 등용하여 불법적인 농장을 없애고 토지를 원래의 주인에게 돌려줌",
    },
  ],
  sentenceList: [
    "원의 간섭에서 벗어나기 위해 반원 개혁을 추진",
    "쌍성총관부를 공격하여 철령 이북의 영토를 회복",
    "신돈을 등용하여 불법적인 농장을 없애고 토지를 원래의 주인에게 돌려줌",
  ],
};

const topicTitle = "공민왕";

const FSquestion: QuestionModel[] = [
  {
    answer: "공민왕",
    choiceList: [
      { choice: "원의 간섭에서 벗어나기 위해 반원 개혁을 추진", key: "공민왕" },
      { choice: "오답1 문장 입니다.", key: "오답주제1" },
      { choice: "오답2 문장 입니다.", key: "오답주제2" },
      { choice: "오답3 문장 입니다.", key: "오답주제3" },
    ],
  },
  {
    answer: "공민왕",
    choiceList: [
      {
        choice:
          "신돈을 등용하여 불법적인 농장을 없애고 토지를 원래의 주인에게 돌려줌",
        key: "공민왕",
      },
      { choice: "오답4 문장 입니다.", key: "오답주제4" },
      { choice: "오답5 문장 입니다.", key: "오답주제5" },
      { choice: "오답6 문장 입니다.", key: "오답주제6" },
    ],
  },
];

const FKquestion: QuestionModel[] = [
  {
    answer: "공민왕",
    choiceList: [
      {
        choice: "반원 개혁",
        comment: "원의 간섭에서 벗어나기 위해 반원 개혁 추진",
        key: "공민왕",
      },
      {
        choice: "오답1",
        comment: "오답1 키워드 설명 입니다.",
        key: "오답주제1",
      },
      {
        choice: "오답2",
        comment: "오답2 키워드 설명 입니다.",
        key: "오답주제2",
      },
      {
        choice: "오답3",
        comment: "오답3 키워드 설명 입니다.",
        key: "오답주제3",
      },
    ],
  },
  {
    answer: "공민왕",
    choiceList: [
      {
        choice: "쌍성총관부",
        comment: "쌍성총관부를 공격하여 철령 이북의 영토를 회복",
        key: "공민왕",
      },
      {
        choice: "오답4",
        comment: "오답4 키워드 설명 입니다.",
        key: "오답주제4",
      },
      {
        choice: "오답5",
        comment: "오답5 키워드 설명 입니다.",
        key: "오답주제5",
      },
      {
        choice: "오답6",
        comment: "오답6 키워드 설명 입니다.",
        key: "오답주제6",
      },
    ],
  },
];

const FTquestion: QuestionModel[] = [
  {
    answer: "공민왕",
    descriptionKeyword: [
      { name: "쌍성총관부", comment: "쌍성총관부 설명" },
      { name: "반원 개혁", comment: "반원 개혁" },
    ],

    choiceList: [
      { choice: "공민왕", key: "공민왕" },
      { choice: "오답1", key: "오답1" },
      { choice: "오답2", key: "오답2" },
      { choice: "오답3", key: "오답3" },
    ],
  },
  {
    answer: "공민왕",
    description: "쌍성총관부를 공격하여 철령 이북의 영토를 회복",
    choiceList: [
      {
        choice: "공민왕",
        key: "공민왕",
      },
      { choice: "오답4", key: "오답4" },
      { choice: "오답5", key: "오답5" },
      { choice: "오답6 ", key: "오답6" },
    ],
  },
];

const progressList = [
  "단원 학습",
  "연표 학습",
  "연표 문제",
  "주제 학습",
  "주제 보고 키워드 맞추기",
  "주제 보고 문장 맞추기",
  "키워드 보고 주제 맞추기",
];

function JeongJuHaengPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(progressList[0]);
  const handleNextProgress = () => {
    if (!progressList[progressList.indexOf(progress) + 1]) {
      navigate("/jeong-ju-haeng");
    }
    setProgress(progressList[progressList.indexOf(progress) + 1]);
  };
  return (
    <Box>
      {progress === "단원 학습" && (
        <ChapterLearningTemplate
          title={title}
          content={content}
          handleNextProgress={handleNextProgress}
        />
      )}
      {progress === "연표 학습" && (
        <TimelineLearningTemplate
          title={title}
          dateList={dateList}
          handleNextProgress={handleNextProgress}
        />
      )}
      {progress === "연표 문제" && (
        <TimelineGame handleNextProgress={handleNextProgress} />
      )}
      {progress === "주제 학습" && (
        <TopicLearningTemplate
          title={topicTitle}
          topicInfo={topicInfo}
          handleNextProgress={handleNextProgress}
        />
      )}
      {progress === "주제 보고 키워드 맞추기" && (
        <FindKeywordGameTemplate
          topicTitle={topicTitle}
          questionList={FKquestion}
          handleNextProgress={handleNextProgress}
        />
      )}
      {progress === "주제 보고 문장 맞추기" && (
        <FindSentenceGameTemplate
          topicTitle={topicTitle}
          questionList={FSquestion}
          handleNextProgress={handleNextProgress}
        />
      )}
      {progress === "키워드 보고 주제 맞추기" && (
        <FindTopicGame
          topicTitle={topicTitle}
          questionList={FTquestion}
          handleNextProgress={handleNextProgress}
        />
      )}
    </Box>
  );
}

export default JeongJuHaengPage;