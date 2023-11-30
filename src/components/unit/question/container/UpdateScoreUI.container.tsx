import styled from "styled-components";
import { QuestionScoreModel } from "../../../../types/questionTypes";

const WrongQuestionListContainer = styled.div`
  margin: ${({ theme }) => theme.margin.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
`;

const WrongQuestionList = styled.table`
  width: 100%;

  tr {
    width: 100%;
  }

  th {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    padding: ${({ theme }) => theme.padding.small};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
  td {
    padding: ${({ theme }) => theme.padding.small};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSizes.small};
    border-top: ${({ theme }) => theme.border.default};
  }

  th,
  td {
    width: 50%;
    text-align: center;
    border-left: ${({ theme }) => theme.border.default};
  }

  th:first-child,
  td:first-child {
    border-left: none;
  }

  td:last-child {
    border-bottom: none;
  }

  .blue {
    color: ${({ theme }) => theme.colors.blue};
  }

  .red {
    color: ${({ theme }) => theme.colors.red};
  }
`;

interface UpdateScoreUIProps {
  updateScoreList: QuestionScoreModel[];
}

function UpdateScoreUI({ updateScoreList }: UpdateScoreUIProps) {
  return (
    <WrongQuestionListContainer>
      <WrongQuestionList>
        <thead>
          <tr>
            <th>문제 분류</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody>
          {updateScoreList.map((item, index) => {
            let prev = item.prevScore.toFixed(1);
            let plus = (item.nextScore - item.prevScore).toFixed(1);
            let next = item.nextScore.toFixed(1);
            return (
              <tr key={index}>
                <td>{item.questionCategoryName}</td>
                <td>
                  {prev} +{" "}
                  <span className={plus === "0" ? "red" : "blue"}>{plus}</span>{" "}
                  {" => "} {next}
                </td>
              </tr>
            );
          })}
        </tbody>
      </WrongQuestionList>
    </WrongQuestionListContainer>
  );
}

export default UpdateScoreUI;
