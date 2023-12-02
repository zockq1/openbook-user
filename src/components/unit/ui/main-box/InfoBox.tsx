import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuLabelBox from "../../../atoms/box/MenuLabelBox";

const Box = styled(Link)`
  position: relative;
  @media (min-width: 768px) {
    grid-column: 2/4;
  }
  display: flex;
  justify-content: start;
  margin: 8px;
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  overflow: hidden;
`;

const BoxImage = styled.img`
  position: absolute;
  height: 80%;
  width: 40%;
  top: 50%;
  transform: translateY(-50%);
  right: 24px;
`;

interface QuizBoxProps {
  image: string;
  link: string;
  title: string;
  icon: ReactNode;
  hover?: boolean;
  setHover?: () => void;
}

const Description = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  color: ${({ theme }) => theme.colors.textBlue};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
  }
`;

function InfoBox({
  image,
  link,
  title,
  icon,
  hover = false,
  setHover,
}: QuizBoxProps) {
  return (
    <Box to={link} onMouseEnter={setHover} className={hover ? "hover" : ""}>
      <Description>
        <MenuLabelBox state="Open">{icon}</MenuLabelBox>
        &nbsp;&nbsp;{title}
      </Description>
      <BoxImage src={image} alt={title + " 이미지"} />
    </Box>
  );
}

export default InfoBox;
