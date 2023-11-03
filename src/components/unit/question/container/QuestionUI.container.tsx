import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { QuestionModel } from "../../../../types/questionTypes";
import TextBox from "../../../atoms/box/TextBox";
import { RowList } from "../../../atoms/layout/List";
import { LongChoiceItem } from "../../../molecules/list-item/LongChoiceItem";

interface QuestionProps {
  quetion: QuestionModel;
  onChoiceClick: (choiceId: string) => void;
  image: string;
}

const Description = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  min-height: calc((100vh - 540px));
  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.small};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  width: 90%;
  height: 90%;
  object-fit: contain;
  opacity: 0.15;
`;

function QuestionUI({ quetion, onChoiceClick, image }: QuestionProps) {
  const { descriptionList, choiceList, answer, isFinish, checkedChoiceKey } =
    quetion;

  return (
    <>
      <Description>
        <Image src={image} />
        {descriptionList.description.map((item) => {
          return (
            <TextBox maxWidth="full" key={item}>
              {item}
            </TextBox>
          );
        })}
      </Description>
      <RowList>
        {choiceList.map((item, index) => (
          <LongChoiceItem
            handleChoiceClick={onChoiceClick}
            choiceKey={String(index) + item.key}
            isCorrect={answer === item.key}
            choice={item.choice}
            isFinish={isFinish}
            selectedCheckbox={checkedChoiceKey}
            key={String(index) + item.key}
          />
        ))}
      </RowList>
    </>
  );
}

export default QuestionUI;
