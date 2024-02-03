import { useState } from "react";
import SearchUI from "../presenter/SearchUI";
import useQuesryString from "../../../../hooks/useQueryString";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const { search } = useQuesryString();
  const [searchValue, setSearchValue] = useState(search);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/my-info/search?search=${searchValue}`, { replace: true });
  };

  return (
    <SearchUI
      searchValue={searchValue}
      onChangeSearchValue={handleChangeSearchValue}
      onSearch={handleSearch}
    />
  );
}

export default Search;
