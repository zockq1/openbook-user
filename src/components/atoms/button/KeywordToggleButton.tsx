import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  keywordCommentOff,
  keywordCommentOn,
} from "../../../store/slices/keywordSlice";

const ToggleContainer = styled.div<{ open: boolean }>`
  position: absolute;
  width: 86px;
  top: 45px;
  right: 20px;
  overflow: hidden;
  cursor: pointer;
  z-index: 999;

  > .toggle-container {
    display: flex;
    justify-content: ${({ open }) => (open ? "start" : "end")};
    align-items: center;
    padding: 5px;
    text-align: end;
    width: ${({ open }) => (open ? "80px" : "86px")};
    height: 24px;
    border-radius: 30px;
    border: 2px solid ${({ theme }) => theme.colors.bg};
    background-color: ${({ theme }) => theme.colors.bg};
  }

  > .toggle--checked {
    background-color: ${({ theme }) => theme.colors.blue};
    transition: 0.5s;
  }

  > .toggle-item {
    display: flex;
    align-items: center;
    position: absolute;
    width: max-content;
    top: 1px;
    left: -49px;
    background-color: transparent;
    transition: 0.5s;

    > .toggle-text {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      font-weight: ${({ theme }) => theme.fontWeight.light};
      font-size: 14px;
    }

    > .toggle-text.on {
      color: ${({ theme, open }) =>
        open ? theme.colors.white : "transparent"};
    }

    > .toggle-text.off {
      color: ${({ theme, open }) =>
        !open ? theme.colors.blue : "transparent"};
    }

    > .toggle-circle {
      width: 22px;
      height: 22px;
      margin: 0 4px;
      border-radius: 50%;
      background-color: ${({ theme, open }) =>
        open ? theme.colors.bg : theme.colors.blue};
      transition: 0.5s;
    }
  }

  > .toggle--checked {
    left: 7px;
    transition: 0.5s;
  }
`;

function KeywordToggleButton() {
  const dispatch = useDispatch();
  const isKeywordCommentOn = useSelector(
    (state: RootState) => state.keyword.isKeywordCommentOn
  );

  const handleToggle = () => {
    if (isKeywordCommentOn) dispatch(keywordCommentOff());
    else dispatch(keywordCommentOn());
  };

  return (
    <ToggleContainer
      // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
      onClick={handleToggle}
      open={isKeywordCommentOn}
    >
      <div
        className={`toggle-container ${
          isKeywordCommentOn ? "toggle--checked" : null
        }`}
      />
      <div
        className={`toggle-item ${
          isKeywordCommentOn ? "toggle--checked" : null
        }`}
      >
        <div className={`toggle-text on`}>해설ON</div>
        <div
          className={`toggle-circle ${
            isKeywordCommentOn ? "toggle--checked" : null
          }`}
        />
        <div className={`toggle-text off`}>해설OFF</div>
      </div>
    </ToggleContainer>
  );
}

export default KeywordToggleButton;
