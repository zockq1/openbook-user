import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import Text from "../atoms/Text";
import Icon from "../atoms/Icon";
import ChapterNumber from "../atoms/ChapterNumber";

const Box = styled(Link)`
  position: relative;
  width: calc(100vw - 40px);
  height: 150px;
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  overflow: hidden;
`;

const BoxImage = styled.img`
  position: absolute;
  height: 80%;
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

interface QuizBoxProps {
  children?: ReactNode;
  image: string;
  link: string;
  title: string;
  icon: ReactNode;
  descriptionTime: string;
  descriptionCount: string;
  description: string;
}

const Description = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 5px 5px 5px 10px;
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

function QuestionBox({
  children,
  image,
  link,
  title,
  icon,
  description,
  descriptionCount,
  descriptionTime,
}: QuizBoxProps) {
  const theme = useContext(ThemeContext);
  return (
    <Box to={link}>
      <BoxTitle>
        <ChapterNumber state="Open">{icon}</ChapterNumber>
        &nbsp;&nbsp;{title}
      </BoxTitle>
      <br />
      <Description>
        <Icon category="시간제한" />
        <Text size={theme.fontSizes.xs}>&nbsp;&nbsp;{descriptionTime}</Text>
      </Description>
      <Description>
        <Icon category="갯수" />
        <Text size={theme.fontSizes.xs}>&nbsp;&nbsp;{descriptionCount}</Text>
      </Description>
      <Description>
        <Icon category="설명" />
        <Text size={theme.fontSizes.xs}>&nbsp;&nbsp;{description}</Text>
      </Description>
      {children}
      <BoxImage src={image} alt={title + " 이미지"} />
    </Box>
  );
}

export default QuestionBox;
