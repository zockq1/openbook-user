import { BsCardText, BsPostcard, BsQuestionSquare } from "react-icons/bs";
import { FaRunning } from "react-icons/fa";
import { TbClockHour5, TbClockQuestion } from "react-icons/tb";

interface Iconprops {
  category: string;
  color?: string;
  size?: number | string;
}

function Icon({ category, color = "inherit", size }: Iconprops) {
  const icons: { [key: string]: JSX.Element } = {
    정주행: <FaRunning color={color} size={size} />,
    "단원 학습": <BsPostcard color={color} size={size} />,
    "연표 학습": <TbClockHour5 color={color} size={size} />,
    "연표 문제": <TbClockQuestion color={color} size={size} />,
    "주제 학습": <BsCardText color={color} size={size} />,
    "주제별 문제": <BsQuestionSquare color={color} size={size} />,
    "단원 마무리 학습": <BsQuestionSquare color={color} size={size} />,
  };

  const matchedIcon = Object.keys(icons).find((key) => category.includes(key));
  return matchedIcon ? icons[matchedIcon] : null;
}

export default Icon;
