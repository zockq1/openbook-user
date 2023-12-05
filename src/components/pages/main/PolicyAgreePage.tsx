import { useState } from "react";
import { usePolicyAgreeMutation } from "../../../store/api/withdrawalApi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TitleBox from "../../unit/ui/TitleBox";
import ContentLayout from "../../atoms/layout/ContentLayout";

const NextButton = styled.button`
  width: 180px;
  height: 40px;
  margin: 10px;
  margin-top: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.textBlue};
`;

function PolicyAgreePage() {
  const navigate = useNavigate();
  const [isChecked, setChecked] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [policyAgree] = usePolicyAgreeMutation();

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setChecked(newCheckedState);
    setButtonDisabled(!newCheckedState);
  };

  const handleButtonClick = async () => {
    try {
      await policyAgree().unwrap();
      navigate("/", { replace: true });
    } catch (error: any) {
      alert(error.error);
    }
  };
  return (
    <>
      <TitleBox icon="lock" category="개인정보 처리방침" />
      <ContentLayout>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          동의
        </label>
        <br />
        <NextButton onClick={handleButtonClick} disabled={isButtonDisabled}>
          다음
        </NextButton>
      </ContentLayout>
    </>
  );
}

export default PolicyAgreePage;
