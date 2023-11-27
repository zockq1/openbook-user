import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuLabelBox from "../../../atoms/box/MenuLabelBox";

const Box = styled.li`
  position: relative;
  width: 100%;
  height: calc((100vh - 184px) / 3 - 20px);
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  overflow: hidden;
`;

const InnerBox = styled.div`
  width: 100%;
  height: 100%;
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
  color: ${({ theme }) => theme.colors.textBlue};
`;

interface QuizBoxProps {
  image: string;
  link: string;
  title: string;
  icon: ReactNode;
}

function QuestionBox({ image, link, title, icon }: QuizBoxProps) {
  return (
    <Box>
      <Link to={link}>
        <InnerBox>
          <BoxTitle>
            <MenuLabelBox state="Open">{icon}</MenuLabelBox>
            &nbsp;&nbsp;{title}
          </BoxTitle>
          <BoxImage src={image} alt={title + " 이미지"} />
        </InnerBox>
      </Link>
    </Box>
  );
}

export default QuestionBox;
