import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled(Link)`
  position: relative;
  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.padding.base};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  transition: transform ease 0.2s, box-shadow ease 0.2s;
`;

const BoxImage = styled.img`
  margin-bottom: 10px;
  width: 40px;
`;

interface QuizBoxProps {
  image: string;
  link: string;
  title: string;
  icon: ReactNode;
  hover?: boolean;
  setHover?: () => void;
}

function InfoBox({
  image,
  link,
  title,
  icon,
  hover = false,
  setHover,
}: QuizBoxProps) {
  return (
    <Box to={link}>
      <BoxImage src={image} />
      <div>{title}</div>
    </Box>
  );
}

export default InfoBox;
