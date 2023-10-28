import { useNavigate } from "react-router-dom";
import Icon from "../icon/Icon";

interface BackButtonProps {
  color?: string;
  onClick?: () => void;
}

function BackButton({ color = "inherit", onClick }: BackButtonProps) {
  const navigate = useNavigate();
  return (
    <button onClick={onClick ? onClick : () => navigate(-1)}>
      <Icon icon="back" size={20} color={color} />
    </button>
  );
}

export default BackButton;
