import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Exam } from "./Exam";
import ex1 from "../../../styles/images/ex1.png";
import ex2 from "../../../styles/images/ex2.png";
import { ExamModel } from "../../../types/questionTypes";
import Layout from "../../atoms/layout/Layout";
import TitleBox from "../ui/TitleBox";

const meta = {
  title: "Organisms/Exam",
  component: Exam,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphonex",
    },
  },
  decorators: [
    (Story) => (
      <Layout>
        <TitleBox handleBackPage={() => {}} category=""></TitleBox>
        <Story />
      </Layout>
    ),
  ],
} satisfies Meta<typeof Exam>;

export default meta;
type Story = StoryObj<typeof meta>;

const questionList: ExamModel[] = [
  {
    answer: "정답",
    description: ex1,
    descriptionComment: "",
    score: 2,
    choiceType: "String",
    choiceList: [
      {
        choice: "묘청 등이 서경 천도를 주장하였다.",
        key: "오답주제1",
      },
      { choice: "최충헌이 왕에게 봉사 10조를 올렸다.", key: "정답" },
      { choice: "강조가 정변을 일으켜 왕을 폐위하였다.", key: "오답주제2" },
      {
        choice: "이자겸과 척준경이 반란을 일으켜 궁궐을 불태웠다.",
        key: "오답주제3",
      },
      {
        choice: "김보당이 폐위된 왕의 복위를 주장하며 군사를 일으켰다.",
        key: "오답주제4",
      },
    ],
  },
  {
    answer: "정답",
    description: ex2,
    descriptionComment: "",
    score: 2,
    choiceType: "String",
    choiceList: [
      {
        choice: "조선의 기본 법전인 경국대전을 반포하였다.",
        key: "오답주제7",
      },
      {
        choice: "역대 문물을 정리한 동국문헌비고를 간행하였다.",
        key: "오답주제4",
      },
      {
        choice: "삼남 지방의 농법을 소개한 농사직설을 편찬하였다.",
        key: "정답",
      },
      {
        choice: "전세를 1결당 4~6두로 고정하는 영정법을 제정하였다.",
        key: "오답주제6",
      },
      {
        choice: "삼정의 문란을 시정하기 위해 삼정이정청을 설치하였다.",
        key: "오답주제8",
      },
    ],
  },
];

export const Learning: Story = {
  args: {
    examList: [
      ...Array(25).fill(questionList[0]),
      ...Array(25).fill(questionList[1]),
    ],
    category: "모의고사",
    handleNextContent: () => {
      console.log("완료");
    },
    timeLimit: 80 * 60,
  },
};
