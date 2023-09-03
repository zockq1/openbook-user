import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactNode } from "react";

const Box = styled(Link)`
  position: relative;
  width: calc(100vw - 40px);
  height: 55vw;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  overflow: hidden;
`;

const BoxImage = styled.img`
  position: absolute;
  width: 50%;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

const BoxTitle = styled.div`
  width: max-content;
  padding: ${({ theme }) => theme.padding.small};
  margin: ${({ theme }) => theme.margin.small};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.bg};
`;

interface LargeBoxProps {
  children?: ReactNode;
  image: string;
  link: string;
  title: string;
}

function LargeBox({ children, image, link, title }: LargeBoxProps) {
  return (
    <Box to={link}>
      <BoxTitle>{title + " >"}</BoxTitle>
      <BoxImage src={image} alt={title + " 이미지"} />
      {children}
    </Box>
  );
}

export default LargeBox;
