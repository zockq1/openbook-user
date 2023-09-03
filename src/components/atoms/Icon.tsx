// BsCardText, BsPostcard, BsQuestionSquare, BsGear: Designed by Bootstrap
// FaRunning: Designed by Font Awesome
// TbClockHour5, TbClockQuestion: Designed by Tabler Icons
// AiOutlineHome: Designed by Ant Design Icons
// LuFileQuestion: Designed by Lineicons
// LiaReadme: Designed by Linea Icons

import {
  BsCardText,
  BsPostcard,
  BsQuestionSquare,
  BsGear,
} from "react-icons/bs";
import { FaRunning } from "react-icons/fa";
import { TbClockHour5, TbClockQuestion } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { LuFileQuestion } from "react-icons/lu";
import { LiaReadme } from "react-icons/lia";
import { GrUser } from "react-icons/gr";

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
    Home: <AiOutlineHome color={color} size={size} />,
    Question: <LuFileQuestion color={color} size={size} />,
    MyInfo: <LiaReadme color={color} size={size} />,
    Option: <BsGear color={color} size={size} />,
    인물: <GrUser color={color} size={size} />,
  };

  const matchedIcon = Object.keys(icons).find((key) => category.includes(key));
  return matchedIcon ? icons[matchedIcon] : null;
}

export default Icon;
