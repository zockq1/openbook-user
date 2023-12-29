import { useSelector } from "react-redux";
import { TopicMenuModel } from "../../../../types/topicTypes";
import KeywordListUI from "../container/KeywordListUI.container";
import TopicUI from "../container/TopicUI.container";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";

interface TopicProps {
  topic: TopicMenuModel;
}

function Topic({ topic }: TopicProps) {
  const { keywordList, state, onClick } = topic;
  const { isKeywordOn: isKeywordOnGlobal } = useSelector(
    (state: RootState) => state.keyword
  );
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isKeywordOn, setIsKeywordOn] = useState(isKeywordOnGlobal);

  useEffect(() => {
    setIsKeywordOn(isKeywordOnGlobal);
  }, [isKeywordOnGlobal]);

  const toggleKeywordList = () => {
    setIsKeywordOn((prev) => !prev);
  };

  return (
    <>
      <TopicUI
        topic={topic}
        isLoggedIn={isLoggedIn}
        onKeywordToggle={toggleKeywordList}
      />
      {state !== "Locked" && state !== "Divider" && (
        <KeywordListUI
          keywordList={keywordList}
          state={state}
          onClickQuestion={onClick}
          isKeywordOn={isKeywordOn}
          onKeywordToggle={toggleKeywordList}
          content={topic.content}
        />
      )}
    </>
  );
}

export default Topic;
