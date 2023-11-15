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

  strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.colors.red};
  }

  & > * {
    word-break: keep-all;
  }
`;

const MainMenuItem = styled.div<{ color: string; important: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.padding.base};

  background-color: ${({ theme }) => theme.colors.white};
`;

const SubMenuItem = styled.div<{ color: string; important: boolean }>`
  position: relative;
  display: flex;
  flex-shrink: 0;
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

const MenuDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-left: 12px;
`;

const Progress = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  border-radius: 10px;
  width: calc(100%);
  height: 15px;
  padding: 5px;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
`;

const Bar = styled.div<{ score: number; color: string }>`
  width: ${({ score }) => `${score}%`};
  border-radius: 10px;
  background: ${({ color }) => color};
  height: 5px;
`;

const Score = styled.div`
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
                    <MenuDescription>
                      <Text
                        weight={theme.fontWeight.bold}
                        size={theme.fontSizes.xs}
                        color={
                          state === "Locked"
                            ? theme.colors.red
                            : theme.colors.textBlue
                        }
                      >
                        {title}
                      </Text>
                      <Progress>
                        <Bar score={score} color={mainColor} />
                      </Progress>
                    </MenuDescription>
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
              {type !== "Base" && (
                <SubMenuItem
                  onClick={onClickSub}
                  color={mainColor}
                  important={important}
                >
                  {subTitle}
                </SubMenuItem>
              )}
            </StyledQuestionMenuItem>
            {state !== "Locked" && content}
          </li>
        );
      })}
    </ColumnList>
  );
}

export default MenuUI;
