import { useMemo, useState } from "react";
import ToggleButtonUI from "../../common/container/ToggleButtonListUI.container";
import { MenuModel, SearchModel } from "../../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import MenuUI from "../../common/container/MenuUI.container";
import formatSearchResult from "../../../../service/formatSearchResult";
import useQuesryString from "../../../../service/useQueryString";

type SearchType = "단원" | "주제" | "키워드";

interface SearchResultProps {
  searchResult: SearchModel;
}

function SearchResult({ searchResult }: SearchResultProps) {
  const { search } = useQuesryString();
  const navigate = useNavigate();
  const [saerchType, setSearchType] = useState<SearchType>("단원");
  const { chapterList, topicList, keywordList } = searchResult;

  const chapterMenu: MenuModel[] = useMemo(() => {
    return chapterList.map((chapter) => {
      const { chapterNumber, chapterTitle } = chapter;
      const result: MenuModel = {
        type: "Base",
        title: formatSearchResult(chapterTitle, search),
        onClickMain: () =>
          navigate(`/learning/chapter?chapter=${chapterNumber}`),
        onClickSub: () =>
          navigate(`/learning/chapter?chapter=${chapterNumber}`),
        icon: chapterNumber,
      };
      return result;
    });
  }, [chapterList, navigate, search]);

  const topicMenu: MenuModel[] = useMemo(() => {
    return topicList.map((topic) => {
      const { chapterNumber, chapterTitle, topicTitle } = topic;
      const result: MenuModel = {
        type: "Base",
        title: formatSearchResult(topicTitle, search),
        description: chapterTitle,
        onClickMain: () =>
          navigate(`/learning/chapter?chapter=${chapterNumber}`),
        onClickSub: () =>
          navigate(`/learning/chapter?chapter=${chapterNumber}`),
        icon: chapterNumber,
      };
      return result;
    });
  }, [topicList, navigate, search]);

  const keywordMenu: MenuModel[] = useMemo(() => {
    return keywordList.map((keyword) => {
      const { chapterNumber, topicTitle, keywordName, keywordComment } =
        keyword;
      const result: MenuModel = {
        type: "Base",
        title: formatSearchResult(`${keywordName}(${topicTitle})`, search),
        description: formatSearchResult(keywordComment, search),
        onClickMain: () =>
          navigate(`/learning/chapter?chapter=${chapterNumber}`),
        onClickSub: () =>
          navigate(`/learning/chapter?chapter=${chapterNumber}`),
        icon: chapterNumber,
      };
      return result;
    });
  }, [keywordList, navigate, search]);

  const handleSearchType = (type: SearchType) => {
    setSearchType(type);
  };

  return (
    <>
      <ToggleButtonUI
        buttonList={[
          {
            onClick: () => {
              handleSearchType("단원");
            },
            contents: "단원",
            isActive: saerchType === "단원",
          },
          {
            onClick: () => {
              handleSearchType("주제");
            },
            contents: "주제",
            isActive: saerchType === "주제",
          },
          {
            onClick: () => {
              handleSearchType("키워드");
            },
            contents: "키워드",
            isActive: saerchType === "키워드",
          },
        ]}
      />
      {saerchType === "단원" && <MenuUI menuList={chapterMenu} />}
      {saerchType === "주제" && <MenuUI menuList={topicMenu} />}
      {saerchType === "키워드" && <MenuUI menuList={keywordMenu} />}
    </>
  );
}

export default SearchResult;