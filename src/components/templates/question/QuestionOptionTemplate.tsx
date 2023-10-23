import styled, { ThemeContext } from "styled-components";
import QuestionOptionSelect, {
  QuestionOptionItemProps,
} from "../../molecules/select/QuestionOptionSelect";
import BackButton from "../../atoms/button/BackButton";
import Button from "../../atoms/button/Button";
import { ReactNode, useContext } from "react";
import MainContentLayout from "../../atoms/layout/MainContentLayout";

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

const Back = styled.div`
  display: flex;
`;

interface QuestionOptionTemplateProps {
  title: string;
  icon: ReactNode;
  handleStart: () => void;
  handleBackPage: () => void;
  optionList: QuestionOptionItemProps[];
}

function QuestionOptionTemplate({
  title,
  icon,
  optionList,
  handleStart,
  handleBackPage,
}: QuestionOptionTemplateProps) {
  const theme = useContext(ThemeContext);
  return (
    <QuizBackground>
      <Back>
        <BackButton onClick={handleBackPage} color={theme.colors.grey} />
      </Back>
      <MainContentLayout>
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
            <QuestionOptionSelect
              title={item.title}
              icon={item.icon}
              handleSelect={item.handleSelect}
              selectName={item.selectName}
              optionList={item.optionList}
              key={index}
            />
          );
        })}
        <Button onClick={handleStart}>퀴즈 시작</Button>
      </MainContentLayout>
    </QuizBackground>
  );
}

export default QuestionOptionTemplate;
