
import styled from "styled-components";
import Card from "../util/Card";

const StyledCharacterBox = styled(Card)`
transition: 0.5s;
cursor: pointer;

&:hover {
  transform: scale(1.05);
}
`;

export default StyledCharacterBox;