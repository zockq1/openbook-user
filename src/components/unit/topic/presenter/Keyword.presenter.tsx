import { useSelector } from "react-redux";
import { KeywordModel } from "../../../../types/topicTypes";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";
import KeywordUI from "../container/KeywordUI.container";

interface KeywordProps {
  keyword: KeywordModel;
}

function Keyword({ keyword }: KeywordProps) {
  const { isKeywordCommentOn: isCommentOnGlobal } = useSelector(
    (state: RootState) => state.keyword
  );
  const [isCommentOn, setIsCommentOn] = useState(isCommentOnGlobal);

  useEffect(() => {
    setIsCommentOn(isCommentOnGlobal);
  }, [isCommentOnGlobal]);

  const toggleComment = () => {
    setIsCommentOn((prev) => !prev);
  };
  return (
    <KeywordUI
      keyword={keyword}
      isCommentOn={isCommentOn}
      onCommentToggle={toggleComment}
    />
  );
}

export default Keyword;
