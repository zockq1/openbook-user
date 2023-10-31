import { Content } from "../types/jjhTypes";

function getContentName(content: Content) {
  switch (content) {
    case "CHAPTER_INFO":
      return "단원 학습";
    case "TIMELINE_STUDY":
      return "연표 학습";
    case "TIMELINE_QUESTION":
      return "연표 문제";
    case "TOPIC_STUDY":
      return "주제 학습";
    case "TOPIC_QUESTION":
      return "주제 문제";
    case "CHAPTER_COMPLETE_QUESTION":
      return "단원 마무리 문제";
    default:
      return "";
  }
}

export default getContentName;
