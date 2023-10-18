import Icon from "../icon/Icon";

interface BackButtonProps {
  color?: string;
  onClick: () => void;
}

function BackButton({ color = "inherit", onClick }: BackButtonProps) {
  return (
    <button onClick={onClick}>
      <Icon icon="back" size={20} color={color} />
    </button>
  );
}

export default BackButton;
