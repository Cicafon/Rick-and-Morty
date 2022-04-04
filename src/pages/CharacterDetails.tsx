import ProfileWrapper from "../components/ProfileWrapper";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getSingleCharacter } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../util/LoadingSpinner";

const DetailTitle = styled.p`
  font-weight: bold;
`;

const CharacterDetails: React.FC = () => {
  const {
    sendRequest,
    data: character,
    status,
    error,
  } = useHttp(getSingleCharacter, true);
  const params = useParams<{ characterId: string }>();
  const { characterId } = params;

  useEffect(() => {
    sendRequest(characterId);
  }, [sendRequest, characterId]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{`Character with this ID not found.`}</p>;
  }

  return (
    <ProfileWrapper>
      <img alt="profile" src={character?.picture} />
      <section>
        <h1>{character?.name}</h1>
        <div>
          <DetailTitle>Status</DetailTitle>
          <p>{character?.status}</p>
        </div>
        <div>
          <DetailTitle>Species</DetailTitle>
          <p>{character?.species}</p>
        </div>
        <div>
          <DetailTitle>Gender</DetailTitle>
          <p>{character?.gender}</p>
        </div>
        <div>
          <DetailTitle>Origin</DetailTitle>
          <p>{character?.origin}</p>
        </div>
        <div>
          <DetailTitle>Last known location</DetailTitle>
          <p>{character?.lastKnownLoc}</p>
        </div>
        <div>
          <DetailTitle>Number of apperance</DetailTitle>
          <p>{character?.nrOfApp}</p>
        </div>
      </section>
    </ProfileWrapper>
  );
};

export default CharacterDetails;
