import { useEffect } from "react";
import useQuesryString from "../../../service/useQueryString";
import { useLazyGetSearchQuery } from "../../../store/api/jjhApi";
import Layout from "../../atoms/layout/Layout";
import MainContentLayout from "../../atoms/layout/MainContentLayout";
import TitleBox from "../../organisms/ui/TitleBox";
import Search from "../../unit/search/presenter/Search.presenter";
import SearchResult from "../../unit/search/presenter/SearchResult.presenter";

function SearchPage() {
  const { search } = useQuesryString();
  const [getSearchTrigger, { data: searchResult }] = useLazyGetSearchQuery();

  useEffect(() => {
    if (search) {
      getSearchTrigger(search);
    }
  }, [search, getSearchTrigger]);

  return (
    <Layout>
      <TitleBox icon="TOPIC_STUDY" category="검색" />
      <MainContentLayout>
        <Search />
        {searchResult && <SearchResult searchResult={searchResult} />}
      </MainContentLayout>
    </Layout>
  );
}

export default SearchPage;