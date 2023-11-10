import { useDispatch } from "react-redux";
import ToggleButtonUI from "../../common/container/ToggleButtonListUI.container";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  keywordCommentOff,
  keywordCommentOn,
  keywordOff,
  keywordOn,
} from "../../../../store/slices/keywordSlice";

function KeywordToggleButton() {
  const dispatch = useDispatch();
  const { isKeywordCommentOn, isKeywordOn } = useSelector(
    (state: RootState) => state.keyword
  );

  const handleCommentToggle = () => {
    if (isKeywordCommentOn) dispatch(keywordCommentOff());
    else dispatch(keywordCommentOn());
  };

  const handleKeywordToggle = () => {
    if (isKeywordOn) dispatch(keywordOff());
    else dispatch(keywordOn());
  };

  return (
    <ToggleButtonUI
      buttonList={[
        {
          contents: isKeywordOn ? "키워드 On" : "키워드 Off",
          isActive: isKeywordOn,
          onClick: handleKeywordToggle,
        },
        {
          contents: isKeywordCommentOn ? "해설 On" : "해설 Off",
          isActive: isKeywordCommentOn,
          onClick: handleCommentToggle,
        },
      ]}
    />
  );
}

export default KeywordToggleButton;
