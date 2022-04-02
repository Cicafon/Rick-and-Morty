import styled from "styled-components";

const StyledPaginate: React.FC = styled.ul`
  list-style: none;
  margin: 1rem;
  padding: 0;
  display: flex;
  justify-content: center;
  list-style: none;
`;

const StyledListItem = styled.li<{ active: boolean }>`
  margin: 0.5rem;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  border: ${(props) => (props.active ? "solid 2px rgb(8, 32, 68)" : "")};
  color: ${(props) => (props.active ? "rgb(8, 32, 68)" : "")};
  font-weight: ${(props) => (props.active ? "bold" : "")};
`;

interface Props {
  picPerPage: number;
  totalPics: number;
  currentPage: number;
  paginateing: (number: number) => void;
}
const Paginate: React.FC<Props> = (props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalPics / props.picPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledPaginate>
      {pageNumbers.map((number) => (
        <StyledListItem
          active={props.currentPage === number ? true : false}
          key={number}
          onClick={() => props.paginateing(number)}
        >
          {number}
        </StyledListItem>
      ))}
    </StyledPaginate>
  );
};

export default Paginate;
