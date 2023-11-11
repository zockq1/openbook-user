import { useDispatch } from "react-redux";
import ToggleButtonUI from "../../common/container/ToggleButtonListUI.container";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  CommentOff,
  CommentOn,
  keywordOff,
  keywordOn,
  topicOff,
  topicOn,
} from "../../../../store/slices/keywordSlice";

interface KeywordToggleButtonProps {
  topic?: boolean;
  keyword?: boolean;
  comment?: boolean;
}

function KeywordToggleButton({
  comment = false,
  keyword = false,
  topic = false,
}: KeywordToggleButtonProps) {
  const dispatch = useDispatch();
  const { isCommentOn, isKeywordOn, isTopicOn } = useSelector(
    (state: RootState) => state.keyword
  );

  const handleTopicToggle = () => {
    if (isTopicOn) dispatch(topicOff());
    else dispatch(topicOn());
  };

  const handleCommentToggle = () => {
    if (isCommentOn) dispatch(CommentOff());
    else dispatch(CommentOn());
  };

  const handleKeywordToggle = () => {
    if (isKeywordOn) dispatch(keywordOff());
    else dispatch(keywordOn());
  };

  const buttonList = [];
  if (topic) {
    buttonList.push({
      contents: isTopicOn ? "주제 On" : "주제 Off",
      isActive: isTopicOn,
      onClick: handleTopicToggle,
    });
  }
  if (keyword) {
    buttonList.push({
      contents: isKeywordOn ? "키워드 On" : "키워드 Off",
      isActive: isKeywordOn,
      onClick: handleKeywordToggle,
    });
  }
  if (comment) {
    buttonList.push({
      contents: isCommentOn ? "해설 On" : "해설 Off",
      isActive: isCommentOn,
      onClick: handleCommentToggle,
    });
  }

  return <ToggleButtonUI buttonList={buttonList} />;
}

export default KeywordToggleButton;
