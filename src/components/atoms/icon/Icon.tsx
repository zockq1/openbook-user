import "../../../styles/flaticons.css";
import { Content } from "../../../types/jjhTypes";
import { TopicCategory } from "../../../types/topicTypes";
import styled from "styled-components";

export type IconType =
  | "run"
  | "home"
  | "fileQuestion"
  | "myInfo"
  | "option"
  | "인물"
  | "clock"
  | "listNumber"
  | "description"
  | "pen"
  | "question"
  | "infinity"
  | "dice"
  | "login"
  | "user"
  | "lock"
  | "back"
  | "arrow"
  | "check"
  | "one"
  | "two"
  | "three"
  | "fail"
  | Content
  | TopicCategory;

const StyledIcon = styled.i<{ size: number | undefined; color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ size }) => (size ? size + "px" : "auto")};
  width: ${({ size }) => (size ? size + "px" : "auto")};
  font-size: ${({ size }) => (size ? size + "px" : "auto")};
  color: ${({ color }) => color};
`;

interface Iconprops {
  icon: IconType;
  color?: string;
  size?: number;
}

function Icon({ icon, size, color = "inherit" }: Iconprops) {
  const icons: { [key: string]: string } = {
    //콘텐트
    CHAPTER_INFO: "fi fi-rr-rectangle-list",
    TIMELINE_STUDY: "fi fi-rr-calendar-clock",
    TIMELINE_QUESTION: "fi fi-rr-calendar-clock",
    TOPIC_STUDY: "fi fi-rr-blog-text",
    TOPIC_QUESTION: "fi fi-rr-question-square",
    CHAPTER_COMPLETE_QUESTION: "fi fi-rr-question-square",

    // 주제
    인물: "fi fi-rr-user",
    국가: "fi fi-br-flag",
    왕: "fi fi-bs-user-crown",
    시대: "fi fi-rr-hourglass-end",
    사건: "fi fi-br-exclamation",
    조직: "fi fi-rr-users-alt",
    기구: "fi fi-rr-bank",
    문화: "fi fi-rs-book-open-cover",
    사회: "fi fi-rr-share",
    제도: "fi fi-rr-pen-field",
    신분: "fi fi-rr-id-card-clip-alt",

    //아이콘
    run: "fi fi-br-running",
    home: "fi fi-rr-house-chimney",
    fileQuestion: "fi fi-rr-question-square",
    myInfo: "fi fi-rs-book-open-reader",
    option: "fi fi-rr-settings",
    clock: "fi fi-sr-clock-five",
    listNumber: "fi fi-br-hastag",
    description: "fi fi-sr-poll-h",
    pen: "fi fi-sr-pen-clip",
    question: "fi fi-br-question",
    infinity: "fi fi-br-infinity",
    dice: "fi fi-sr-dice-alt",
    login: "fi fi-br-sign-in-alt",
    user: "fi fi-rr-circle-user",
    lock: "fi fi-sr-lock",
    back: "fi fi-br-angle-left",
    arrow: "fi fi-br-angle-double-right",
    check: "fi fi-sr-checkbox",
    one: "fi fi-sr-square-1",
    two: "fi fi-sr-square-2",
    three: "fi fi-sr-square-3",
    fail: "fi fi-br-ban",
  };

  const matchedIcon = Object.keys(icons).find((key) => icon.includes(key));
  return matchedIcon ? (
    <StyledIcon className={icons[matchedIcon]} size={size} color={color} />
  ) : null;
}

export default Icon;
