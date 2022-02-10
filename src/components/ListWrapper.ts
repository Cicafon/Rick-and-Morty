import styled from "styled-components";
const ListWrapper = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  animation: items-appear 1s ease-out forwards;
  & a {
    text-decoration: none;
    color: #212529;
  }

  @keyframes items-appear {
    from {
      opacity: 0;
      transform: translateY(3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  img {
    max-width: 100%;
   
  }
`;

export default ListWrapper;
