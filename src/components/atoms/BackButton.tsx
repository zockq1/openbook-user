import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  color?: string;
  backLink: string;
}

function BackButton({ color = "inherit", backLink }: BackButtonProps) {
  const navigate = useNavigate();
  return (
    <AiOutlineLeft size={24} color={color} onClick={() => navigate(backLink)} />
  );
}

export default BackButton;
