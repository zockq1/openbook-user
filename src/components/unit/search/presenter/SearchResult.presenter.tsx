import { useContext, useMemo, useState } from "react";
import ToggleButtonUI from "../../common/container/ToggleButtonListUI.container";
import { MenuModel, SearchModel } from "../../../../types/commonTypes";
import { useNavigate } from "react-router-dom";
import MenuUI from "../../common/container/MenuUI.container";
import formatSearchResult from "../../../../service/formatSearchResult";
import useQuesryString from "../../../../hooks/useQueryString";
import styled, { ThemeContext } from "styled-components";
import Text from "../../../atoms/text/Text";
import EmptyUI from "../../skeleton/EmptyUI";

const Label = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textBlue};
  .string {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
  .number {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

type SearchType = "단원" | "주제" | "키워드";

interface SearchResultProps {
  searchResult: SearchModel;
}

function SearchResult({ searchResult }: SearchResultProps) {
  const theme = useContext(ThemeContext);
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
        icon: (
          <Label>
            <span className="number">{`${chapterNumber}`}</span>
            <span className="string">단원</span>
          </Label>
        ),
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
        icon: (
          <Label>
            <span className="number">{`${chapterNumber}`}</span>
            <span className="string">단원</span>
          </Label>
        ),
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
        title: (
          <>
            {formatSearchResult(`${keywordName}`, search)}
            {`(${topicTitle})`}
          </>
        ),
        description: (
          <Text color={theme.colors.textBlue}>
            {formatSearchResult(keywordComment, search)}
          </Text>
        ),
        onClickMain: () =>
          navigate(`/learning/chapter?chapter=${chapterNumber}`),
        onClickSub: () =>
          navigate(`/learning/chapter?chapter=${chapterNumber}`),
        icon: (
          <Label>
            <span className="number">{`${chapterNumber}`}</span>
            <span className="string">단원</span>
          </Label>
        ),
      };
      return result;
    });
  }, [keywordList, navigate, search, theme]);

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
            contents: `단원(${chapterList.length})`,
            isActive: saerchType === "단원",
          },
          {
            onClick: () => {
              handleSearchType("주제");
            },
            contents: `주제(${topicList.length})`,
            isActive: saerchType === "주제",
          },
          {
            onClick: () => {
              handleSearchType("키워드");
            },
            contents: `키워드(${keywordList.length})`,
            isActive: saerchType === "키워드",
          },
        ]}
      />
      {saerchType === "단원" && chapterList.length === 0 ? (
        <EmptyUI message={`${search} 검색 결과가 존재하지 않습니다.`} />
      ) : (
        <MenuUI menuList={chapterMenu} />
      )}
      {saerchType === "주제" && topicList.length === 0 ? (
        <EmptyUI message={`${search} 검색 결과가 존재하지 않습니다.`} />
      ) : (
        <MenuUI menuList={topicMenu} />
      )}
      {saerchType === "키워드" && keywordList.length === 0 ? (
        <EmptyUI message={`${search} 검색 결과가 존재하지 않습니다.`} />
      ) : (
        <MenuUI menuList={keywordMenu} />
      )}
    </>
  );
}

export default SearchResult;
