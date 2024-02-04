import { useSelector } from "react-redux";
import { KeywordModel } from "../../../../types/topicTypes";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";
import KeywordUI from "../presenter/KeywordUI";

interface KeywordProps {
  keyword: KeywordModel;
}

function Keyword({ keyword }: KeywordProps) {
  const { isCommentOn: isCommentOnGlobal } = useSelector(
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
