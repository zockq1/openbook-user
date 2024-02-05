import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";
import KeywordUI from "../presenter/KeywordUI";

interface KeywordProps {
  title: string;
  comment: string;
  file?: string;
  isQuestion?: boolean;
}

function Keyword({ title, comment, file, isQuestion = false }: KeywordProps) {
  const { isCommentOn: isCommentOnGlobal } = useSelector(
    (state: RootState) => state.keyword
  );
  const [isCommentOn, setIsCommentOn] = useState(
    isQuestion ? false : isCommentOnGlobal
  );

  useEffect(() => {
    if (isQuestion) return;
    setIsCommentOn(isCommentOnGlobal);
  }, [isCommentOnGlobal, isQuestion]);

  const toggleComment = () => {
    if (isQuestion) return;
    setIsCommentOn((prev) => !prev);
  };

  return (
    <KeywordUI
      title={title}
      comment={comment}
      file={file}
      isCommentOn={isCommentOn}
      onCommentToggle={toggleComment}
    />
  );
}

export default Keyword;
