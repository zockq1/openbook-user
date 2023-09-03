import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactNode } from "react";
import ChapterNumber from "../atoms/ChapterNumber";
import Icon from "../atoms/Icon";

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
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.grey};
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
      {/* <BoxTitle>{title + " >"}</BoxTitle> */}
      <BoxTitle>
        <ChapterNumber state="Open">{<Icon category="정주행" />}</ChapterNumber>
        &nbsp;&nbsp;{title}
      </BoxTitle>
      <BoxImage src={image} alt={title + " 이미지"} />
      {children}
    </Box>
  );
}

export default LargeBox;
