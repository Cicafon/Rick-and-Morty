import ProfileWrapper from "../components/ProfileWrapper";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Character from "../models/character";
import { getSingleCharacter } from "../lib/api";

const DetailTitle = styled.p`
  font-weight: bold;
`;

const CharacterDetails: React.FC = () => {
  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsloading] = useState(false);
  const params = useParams<{ characterId: string }>();

  const loadCharacter = useCallback(async () => {
    setIsloading(true);
    try {
      const response = await getSingleCharacter(params.characterId);
      setCharacter(response);
    } catch (err) {
      alert(err);
    } finally {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    loadCharacter();
  }, [loadCharacter]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!character?.name) {
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
