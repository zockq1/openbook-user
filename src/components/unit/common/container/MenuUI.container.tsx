import styled, { ThemeContext } from "styled-components";
import { MenuModel } from "../../../../types/commonTypes";
import { useContext } from "react";
import { ColumnList } from "../../../atoms/layout/List";
import MenuLabelBox from "../../../atoms/box/MenuLabelBox";
import Text from "../../../atoms/text/Text";

interface MenuUIProps {
  menuList: MenuModel[];
}

const StyledQuestionMenuItem = styled.div<{ color: string; total: boolean }>`
  display: flex;
  margin: ${({ theme }) => theme.margin.base};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  border-radius: 10px;
  border: ${({ color, total, theme }) =>
    total ? `5px solid ${color}` : `2px solid ${theme.colors.textBlue}`};
  overflow: hidden;
`;

const MainMenuItem = styled.div<{ color: string; important: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: calc(75%);
  padding: ${({ theme }) => theme.padding.base};

  background-color: ${({ theme }) => theme.colors.white};
`;

const SubMenuItem = styled.div<{ color: string; important: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  white-space: nowrap;
  width: calc(25%);
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  border-left: ${({ color, important, theme }) =>
    !color
      ? "0"
      : important
      ? `5px solid ${color}`
      : `2px solid ${theme.colors.textBlue}`};
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
  height: 100%;
  padding: 2px;
  overflow: scroll;
  white-space: nowrap;
  top: 15px;
  left: 5px;
  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

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

function MenuUI({ menuList }: MenuUIProps) {
  const theme = useContext(ThemeContext);
  return (
    <ColumnList>
      {menuList.map((menu, index) => {
        const {
          type,
          title,
          icon,
          state = "Open",
          subTitle = "",
          score = 0,
          description = null,
          content = null,
          onClickMain = () => {},
          onClickSub = () => {},
          mainColor = "",
          important = false,
        } = menu;
        return (
          <li key={index}>
            <StyledQuestionMenuItem color={mainColor} total={important}>
              <MainMenuItem
                onClick={onClickMain}
                color={mainColor}
                important={important}
              >
                {type === "Progress" ? (
                  <>
                    <MenuLabelBox state={mainColor}>
                      <Score>{score}%</Score>
                    </MenuLabelBox>
                    <QuestionMenuDescription>
                      <Title>{title}</Title>
                    </QuestionMenuDescription>
                    <Progress>
                      <Bar score={score} color={mainColor} />
                    </Progress>
                  </>
                ) : (
                  <>
                    <MenuLabelBox state={state}>{icon}</MenuLabelBox>
                    <MenuDescription>
                      <Text
                        weight={theme.fontWeight.bold}
                        size={theme.fontSizes.small}
                        padding={theme.padding.xs_Lsmall}
                        color={
                          state === "Locked"
                            ? theme.colors.red
                            : theme.colors.textBlue
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
                            state === "Locked"
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
                color={mainColor}
                important={important}
              >
                {subTitle}
              </SubMenuItem>
            </StyledQuestionMenuItem>
            {state !== "Locked" && content}
          </li>
        );
      })}
    </ColumnList>
  );
}

export default MenuUI;
