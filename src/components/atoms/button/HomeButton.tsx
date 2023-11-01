import { useNavigate } from "react-router-dom";
import Icon from "../icon/Icon";

interface HomeButtonProps {
  color?: string;
  onClick?: () => void;
}

function HomeButton({ color = "inherit", onClick }: HomeButtonProps) {
  const navigate = useNavigate();
  return (
    <button onClick={onClick ? onClick : () => navigate("/")}>
      <Icon icon="home" size={20} color={color} />
    </button>
  );
}

export default HomeButton;
