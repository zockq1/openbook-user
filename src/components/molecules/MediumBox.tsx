import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: calc((100vw - 60px) / 2);
  margin: 10px 0px 10px 20px;
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  overflow: hidden;
`;

const BoxImage = styled.img`
  margin-top: 15px;
  width: 90%;
`;

const BoxTitle = styled.div`
  width: max-content;
  padding: ${({ theme }) => theme.padding.small};
  margin: ${({ theme }) => theme.margin.small};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.bg};
`;

interface MediumBoxProps {
  children?: ReactNode;
  image: string;
  link: string;
  title: string;
}

function MediumBox({ children, image, link, title }: MediumBoxProps) {
  return (
    <Box to={link}>
      <BoxTitle>{title + " >"}</BoxTitle>
      <BoxImage src={image} alt={title + " 이미지"} />
      {children}
    </Box>
  );
}

export default MediumBox;
