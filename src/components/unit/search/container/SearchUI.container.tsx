import styled, { ThemeContext } from "styled-components";
import Icon from "../../../atoms/icon/Icon";
import { useContext } from "react";

const SearchBox = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  margin: ${({ theme }) => theme.margin.base};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};

  background-color: ${({ theme }) => theme.colors.white};
`;
const Search = styled.input`
  width: 100%;
  margin: 0 8px;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;
const SearchButton = styled.button`
  margin: 0 12px;
`;

interface SearchUIProps {
  searchValue: string;
  onChangeSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

function SearchUI({
  searchValue,
  onChangeSearchValue,
  onSearch,
}: SearchUIProps) {
  const theme = useContext(ThemeContext);
  return (
    <SearchBox>
      <Search
        value={searchValue}
        onChange={onChangeSearchValue}
        onKeyPress={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
      <SearchButton onClick={onSearch}>
        <Icon icon="search" size={20} color={theme.colors.textBlue} />
      </SearchButton>
    </SearchBox>
  );
}

export default SearchUI;
