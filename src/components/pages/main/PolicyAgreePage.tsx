import { useState } from "react";
import styled from "styled-components";
import TopicList from "../../unit/topic/presenter/TopicList.presenter";
import {
  CheckBoxInput,
  CheckBoxLabel,
} from "../../atoms/checkbox/QuestionCheckBox";

const NextButton = styled.button`
  height: 50px;
  width: 70%;

  margin: ${({ theme }) => theme.margin.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

const Container = styled.div`
  padding: 10px;
`;

const AggreCheckboxButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: calc(30% - 10px);
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: ${({ theme }) => theme.border.default};

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface PolicyAgreeProps {
  handleSubmit: () => Promise<void>;
}

function PolicyAgreePage({ handleSubmit }: PolicyAgreeProps) {
  const [isChecked, setChecked] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setChecked(newCheckedState);
    setButtonDisabled(!newCheckedState);
  };

  return (
    <Container>
      <TopicList
        topicList={[
          {
            title: "개인정보 처리방침",
            date: "",
            state: "Timeline",
            isBookmarked: false,
            keywordList: [],
            onClick: () => {},
            content: (
              <div>
                제1조 (목적) <br />본 개인정보 처리방침은 정주행 한국사(이하
                "회사"라 함)가 회원의 개 인정보를 수집, 이용, 관리, 보호하는
                것을 목적으로 합니다.` <br />
                <br />제 2조 (수집하는 개인정보의 항목 및 수집 방법) <br /> ①
                회사는 회원가입, 서비스 이용 등의 과정에서 다음과 같은
                개인정보를 수 집할 수 있습니다. <br />
                필수 수집 항목 : 소셜 로그인 식별자, 기타 사용 데이터(사용자
                학습 정보)
                <br /> ② 회사는 다음과 같은 방법으로 개인정보를 수집합니다.
                회원이 직접 입력하는 경우 소셜 로그인을 통해 수집하는 경우{" "}
                <br /> <br /> 제 3조 (개인정보의 수집 및 이용목적)
                <br />
                회사는 다음과 같은 목적으로 회원의 개인정보를 수집 및
                이용합니다. 서비스 제공을 위한 회원 식별 및 인증 서비스 이용 및
                문의사항 처리 새로운 서비스 및 이벤트 안내 마케팅 및 광고 활용을
                위한 통계 및 분석 자료 작성 <br /> <br />제 4조 (개인정보의 보유
                및 이용기간) <br /> 회사는 회원의 개인정보를 회원 탈퇴 시까지
                보유 및 이용하며, 다 만 관계법령에 따라 보존할 필요가 있는
                경우에는 해당 기간 동안 보존합니다. <br />
                <br />제 5조 (개인정보의 제공 및 위탁)
                <br /> 회사는 회원의 개인정보를 제3자에게 제공하지 않으며,
                회사의 서 비스 운영에 필요한 경우에만 개인정보 처리 업무를
                위탁할 수 있 습니다. 이 경우 회사는 위탁계약 등을 통해
                개인정보보호 관련 법 령을 준수하도록 감독합니다. <br /> <br />{" "}
                제 6조 (개인정보의 파기)
                <br />
                회사는 회원의 개인정보가 수집 및 이용목적을 달성한 후에는 지 체
                없이 파기합니다. 단, 관계 법령에 따라 보존할 필요가 있는 경
                우에는 회원의 개인정보를 보관합니다. 제7조 (회원의 권리) 회원은
                언제든지 자신의 개인정보에 대해 열람, 정정, 삭제를 요청 할 수
                있습니다. 또한 회사는 회원의 요청에 따라 개인정보의 오류 를
                정정하거나 삭제해야 할 경우 지체 없이 조치합니다. <br /> <br />
                제 8조 (개인정보보호책임자) <br /> 회원은 회사의 개인정보 처리에
                관한 불만이 있거나 개인정보보호 관련 문의사항이 있는 경우 회사의
                개인정보보호책임자에게 문의 할 수 있습니다. <br />
                개인정보보호책임자 : 임현우 이메일 : whskwock@naver.com <br />{" "}
                개인정보보호책임자 : 탁재민 이메일 : zockq1@naver.com <br />
                <br />제 9조 (개인정보 처리방침 변경)
                <br /> 회사는 법령, 정부 지침의 변경, 보안기술의 개선 등의
                사유로 개인 정보 처리방침을 변경할 수 있습니다. 변경된 개인정보
                처리방침 은 회사의 홈폐이지 등을 통해 공지됩니다. <br />
                <br />제 10 조 (기타)
                <br /> 본 약관에 명시되지 않은 사항에 대해서는 대한민국 관련
                법령 및 회사가 정한 이용약관, 운영정책 등에 따릅니다. <br />{" "}
                <br />
              </div>
            ),
          },
        ]}
      />
      <ButtonContainer>
        <AggreCheckboxButton onClick={handleCheckboxChange}>
          <CheckBoxInput
            choiceKey={"policy"}
            handleCheckboxChange={handleCheckboxChange}
            selectedCheckbox={isChecked ? "policy" : ""}
          />
          <CheckBoxLabel
            choiceKey={"policy"}
            isCorrect={false}
            isFinish={false}
          />
          &nbsp; 동의
        </AggreCheckboxButton>

        <NextButton onClick={handleSubmit} disabled={isButtonDisabled}>
          다음
        </NextButton>
      </ButtonContainer>
    </Container>
  );
}

export default PolicyAgreePage;
