import styled from "styled-components";
import { ReactNode } from "react";
import { OptionModel } from "../../types/CommonTypes";

const QuestionSelect = styled.select`
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 100%;
  height: 50px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.grey};
  text-align: center;
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

export interface QuestionOptionItemProps {
  handleSelect: (e: any) => void;
  icon: ReactNode;
  title: string;
  selectName: string;
  optionList: OptionModel[];
}

function QuestionOptionItem({
  handleSelect,
  icon,
  title,
  selectName,
  optionList,
}: QuestionOptionItemProps) {
  return (
    <Box>
      <Title>
        {icon}
        &nbsp;{title}
      </Title>
      <br />
      <QuestionSelect name={selectName} onChange={handleSelect}>
        {optionList.map((item) => {
          return (
            <option value={item.value} key={item.key}>
              {item.description}
            </option>
          );
        })}
      </QuestionSelect>
    </Box>
  );
}

export default QuestionOptionItem;
