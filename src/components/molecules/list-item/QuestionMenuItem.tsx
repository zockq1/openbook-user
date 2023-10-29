import MenuLabelBox from "../../atoms/box/MenuLabelBox";
import { QuestionMenuModel } from "../../../types/commonTypes";
import styled, { ThemeContext } from "styled-components";
import Icon from "../../atoms/icon/Icon";
import Text from "../../atoms/text/Text";
import { useContext } from "react";

interface QuestionMenuItemProps {
  questionMenuItem: QuestionMenuModel;
}

const StyledQuestionMenuItem = styled.li<{ color: string; total: boolean }>`
  display: flex;
  margin: ${({ theme }) => theme.margin.base};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-radius: 16px;
  border: ${({ color, total }) => (total ? `5px solid ${color}` : "")};
`;

const MainMenuItem = styled.div<{ color: string; total: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: calc(75%);
  padding: ${({ theme }) => theme.padding.base};

  border-radius: 10px 0 0 10px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SubMenuItem = styled.div<{ color: string; total: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 0 10px 10px 0;
  white-space: nowrap;
  width: calc(25%);
  background-color: ${({ color }) => color};
  color: ${({ theme }) => theme.colors.white};
  line-height: 120%;
`;

const QuestionMenuDescription = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  margin-right: auto;
  height: 50px;
  width: 100%;
`;

const MenuDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
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
  const {
    title,
    subTitle,
    score,
    onClickMain,
    onClickSub,
    color,
    icon,
    description,
  } = questionMenuItem;
  const theme = useContext(ThemeContext);

  return (
    <StyledQuestionMenuItem color={color} total={title.includes("전체 진행도")}>
      <MainMenuItem
        onClick={onClickMain}
        color={color}
        total={title.includes("전체 진행도")}
      >
        {score && (
          <>
            <MenuLabelBox state={color}>
              <Score>{score}%</Score>
            </MenuLabelBox>
            <QuestionMenuDescription>
              <Title>{title}</Title>
            </QuestionMenuDescription>
            <Progress>
              <Bar score={score} color={color} />
            </Progress>
          </>
        )}

        {icon && (
          <>
            <MenuLabelBox state={"Open"}>
              <Icon
                icon={icon}
                color={
                  color === theme.colors.red
                    ? theme.colors.red
                    : theme.colors.black
                }
              />
            </MenuLabelBox>
            <MenuDescription>
              <Text
                weight={theme.fontWeight.medium}
                size={theme.fontSizes.small}
                padding={theme.padding.xs_Lsmall}
                color={
                  color === theme.colors.red
                    ? theme.colors.red
                    : theme.colors.black
                }
              >
                {title}
              </Text>
              {description && (
                <Text
                  weight={theme.fontWeight.regular}
                  size={theme.fontSizes.xs}
                  padding={theme.padding.xs_Lsmall}
                  color={
                    color === theme.colors.red
                      ? theme.colors.lightRed
                      : theme.colors.grey
                  }
                >
                  {description}
                </Text>
              )}
            </MenuDescription>
          </>
        )}
      </MainMenuItem>
      <SubMenuItem
        onClick={onClickSub}
        color={color}
        total={title.includes("전체 진행도")}
      >
        {subTitle}
      </SubMenuItem>
    </StyledQuestionMenuItem>
  );
}

export default QuestionMenuItem;
