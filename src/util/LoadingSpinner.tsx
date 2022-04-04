import { Plane } from "react-loader-spinner";
import styled from "styled-components";

const StyledLoadingSpinner = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
`;

const LoadingSpinner = () => {
  return (
    <StyledLoadingSpinner>
      <Plane ariaLabel="loading-indicator" color="grey" />
    </StyledLoadingSpinner>
  );
};

export default LoadingSpinner;
