import MenuLabelBox from "../../atoms/box/MenuLabelBox";
import { QuestionMenuModel } from "../../../types/commonTypes";
import styled from "styled-components";

interface QuestionMenuItemProps {
  questionMenuItem: QuestionMenuModel;
}

const StyledQuestionMenuItem = styled.li`
  display: flex;
`;

const MainMenuItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: calc(75% - 20px);
  margin: 10px 0 10px 20px;
  padding: ${({ theme }) => theme.padding.base};

  border-radius: 10px 0 0 10px;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
`;

const SubMenuItem = styled.div<{ color: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  white-space: nowrap;
  width: calc(25% - 20px);
  margin: 10px 20px 10px 0;
  border-radius: 0 10px 10px 0;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ color }) => color};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 120%;
`;

const MenuDescription = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  margin-right: auto;
  height: 50px;
  width: 100%;
`;

const Progress = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  bottom: 12px;
  left: 20px;

  border-radius: 10px;
  width: calc(100% - 32px);
  height: 15px;
  padding-right: 5px;
  background: ${({ theme }) => theme.colors.bg};
`;

const Bar = styled.div<{ score: number; color: string }>`
  width: ${({ score }) => `${score}%`};
  border-radius: 10px;
  background: ${({ color }) => color};
  height: 5px;
`;

const Title = styled.div`
  position: absolute;
  max-width: 100%;
  overflow: scroll;
  white-space: nowrap;
  top: 15px;
  left: 5px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  color: ${({ theme }) => theme.colors.black};

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
`;

const Score = styled.div`
  position: absolute;
  top: 28px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

function QuestionMenuItem({ questionMenuItem }: QuestionMenuItemProps) {
  const { title, subTitle, score, onClickMain, onClickSub, color } =
    questionMenuItem;

  return (
    <StyledQuestionMenuItem>
      <MainMenuItem onClick={onClickMain}>
        <MenuLabelBox state={color}>
          <Score>{score}%</Score>
        </MenuLabelBox>
        <MenuDescription>
          <Title>{title}</Title>
        </MenuDescription>
        <Progress>
          <Bar score={score} color={color} />
        </Progress>
      </MainMenuItem>
      <SubMenuItem onClick={onClickSub} color={color}>
        {subTitle}
      </SubMenuItem>
    </StyledQuestionMenuItem>
  );
}

export default QuestionMenuItem;
