import type { Meta, StoryObj } from "@storybook/react";
import ChapterLearningTemplate from "./ChpaterLearningTemplate";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta = {
  title: "Templates/ChapterLearning",
  component: ChapterLearningTemplate,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphonex",
    },
  },
} satisfies Meta<typeof ChapterLearningTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Learning: Story = {
  args: {
    title: "1단원",
    content: "1단원 내용",
    backLink: "/jeong-ju-haeng/1",
  },
};

export const JJH: Story = {
  args: {
    title: "1단원",
    content: "1단원 내용",
    backLink: "/jeong-ju-haeng/1",
    handleNextContent: () => {
      console.log("다음 콘텐트로 이동");
    },
  },
};
