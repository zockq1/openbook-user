import styled from "styled-components";
import QuestionOptionItem, {
  QuestionOptionItemProps,
} from "../../molecules/QuestionOptionItem";
import BackButton from "../../atoms/BackButton";
import Button from "../../atoms/Button";
import { ReactNode } from "react";

const QuizBackground = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;

  width: 100vw;
  height: 100vh;

  padding: ${({ theme }) => theme.padding.large};
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.grey};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.grey};
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

interface QuestionOptionTemplateProps {
  title: string;
  icon: ReactNode;
  handleStart: () => void;
  optionList: QuestionOptionItemProps[];
}

function QuestionOptionTemplate({
  title,
  icon,
  optionList,
  handleStart,
}: QuestionOptionTemplateProps) {
  return (
    <QuizBackground>
      <BackButton backLink="/question" />
      <Box>
        <Title>
          {icon}
          &nbsp;{title}
        </Title>
      </Box>
      <br />
      <br />
      {optionList.map((item, index) => {
        return (
          <QuestionOptionItem
            title={item.title}
            icon={item.icon}
            handleSelect={item.handleSelect}
            selectedItem={item.selectedItem}
            selectName={item.selectName}
            optionList={item.optionList}
            key={index}
          />
        );
      })}

      <Button onClick={handleStart}>퀴즈 시작</Button>
    </QuizBackground>
  );
}

export default QuestionOptionTemplate;
