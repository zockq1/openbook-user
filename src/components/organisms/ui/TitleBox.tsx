import styled, { ThemeContext } from "styled-components";
import Icon, { IconType } from "../../atoms/icon/Icon";
import BackButton from "../../atoms/button/BackButton";
import Text from "../../atoms/text/Text";
import { useContext } from "react";

interface TitleBoxProps {
  title?: string;
  icon: IconType | undefined | null;
  category: string;
  dateComment?: string;
  handleBackPage: () => void;
}

const StyledTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 100;

  width: 100%;

  padding: ${({ theme }) => theme.padding.large};
  margin-bottom: 10px;
  border-radius: 0 0 50px 50px;
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.blue};

  color: ${({ theme }) => theme.colors.white};
`;

const Category = styled.span`
  display: flex;
  align-items: center;

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const FixedBackButton = styled.div`
  position: fixed;
  z-index: 99;
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.blue};

  & > button {
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
  }
`;

const TitleBox = ({
  title,
  icon,
  category,
  dateComment,
  handleBackPage,
}: TitleBoxProps) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <FixedBackButton>
        <BackButton onClick={handleBackPage} color="white" />
      </FixedBackButton>
      <StyledTitleBox>
        <Category>
          <BackButton onClick={handleBackPage} color="white" />
          &nbsp;&nbsp;
          {icon && <Icon icon={icon} />}
          &nbsp;&nbsp;
          {category}
        </Category>
        {title && <br />}
        {title && (
          <Text
            weight={theme.fontWeight.bold}
            size={theme.fontSizes.xxl}
            textAlign="center"
            margin="auto"
          >
            {title}
          </Text>
        )}
        {dateComment && (
          <Text
            weight={theme.fontWeight.light}
            size={theme.fontSizes.small}
            color={theme.colors.lightBlue}
            margin="auto"
            textAlign="center"
            lineHeight="200%"
          >
            {dateComment}
          </Text>
        )}
      </StyledTitleBox>
    </>
  );
};

export default TitleBox;
