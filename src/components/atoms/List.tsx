import styled from "styled-components";

const ColumnList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const RowList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export { RowList, ColumnList };
