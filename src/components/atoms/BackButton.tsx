import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  color?: string;
}

function BackButton({ color = "inherit" }: BackButtonProps) {
  const navigate = useNavigate();
  return <AiOutlineLeft size={24} color={color} onClick={() => navigate(-1)} />;
}

export default BackButton;
