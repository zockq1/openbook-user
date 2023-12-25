import { useEffect } from "react";
import useQuesryString from "../../../hooks/useQueryString";
import { useLazyGetSearchQuery } from "../../../store/api/jjhApi";
import TitleBox from "../../unit/ui/TitleBox";
import Search from "../../unit/search/presenter/Search.presenter";
import SearchResult from "../../unit/search/presenter/SearchResult.presenter";
import Loading from "../../unit/skeleton/LoadingUI";
import ErrorUI from "../../unit/skeleton/ErrorUI";
import ContentLayout from "../../atoms/layout/ContentLayout";

function SearchPage() {
  const { search } = useQuesryString();
  const [
    getSearchTrigger,
    { data: searchResult, isFetching, error, isError, isSuccess },
  ] = useLazyGetSearchQuery();

  useEffect(() => {
    if (search) {
      getSearchTrigger(search);
    }
  }, [search, getSearchTrigger]);

  const renderContent = () => {
    if (isFetching) {
      return <Loading image="search" />;
    }

    if (isError && error) {
      return (
        <ErrorUI message="검색 결과 불러오기에 실패하였습니다." error={error} />
      );
    }

    if (isSuccess && searchResult) {
      return <SearchResult searchResult={searchResult} />;
    }

    return null;
  };

  return (
    <>
      <TitleBox icon="TOPIC_STUDY" category="검색" />
      <ContentLayout leftMenu={<div />}>
        <div>
          <Search />
          {renderContent()}
        </div>
      </ContentLayout>
    </>
  );
}

export default SearchPage;
