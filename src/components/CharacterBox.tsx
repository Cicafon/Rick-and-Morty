import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../util/Card";

const StyledCharacterBox = styled(Card)`
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const CharacterBox: React.FC<{ id: number; name: string; picture: string }> = (
  props
) => {
  return (
    <StyledCharacterBox>
      <Link to={`/details/${props.id}`}>
        <img alt={props.name} src={props.picture} />
        <h2>{props.name}</h2>
      </Link>
    </StyledCharacterBox>
  );
};

export default CharacterBox;
