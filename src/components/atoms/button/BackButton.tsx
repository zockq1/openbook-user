import { AiOutlineLeft } from "react-icons/ai";

interface BackButtonProps {
  color?: string;
  onClick: () => void;
}

function BackButton({ color = "inherit", onClick }: BackButtonProps) {
  return <AiOutlineLeft size={24} color={color} onClick={onClick} />;
}

export default BackButton;
