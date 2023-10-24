import { useNavigate } from "react-router-dom";
import Icon from "../icon/Icon";

interface BackButtonProps {
  color?: string;
}

function BackButton({ color = "inherit" }: BackButtonProps) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <Icon icon="back" size={20} color={color} />
    </button>
  );
}

export default BackButton;
