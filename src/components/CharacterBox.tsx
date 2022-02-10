import { Link } from "react-router-dom";
import StyledCharacterBox from "./StyledCharacterBox";

const CharacterBox: React.FC<{ id: number; name: string; picture: string }> = (
  props
) => {
  return (
    <StyledCharacterBox>
      <Link to={`/details/${props.id}`}>
        <img alt="character" src={props.picture} />
        <h2>{props.name}</h2>
      </Link>
    </StyledCharacterBox>
  );
};

export default CharacterBox;
