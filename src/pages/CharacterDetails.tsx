import ProfileWrapper from "../components/ProfileWrapper";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Character from "../models/character";

const DetailTitle = styled.p`
  font-weight: bold;
`;

const CharacterDetails: React.FC = () => {
  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsloading] = useState(false);
  const params = useParams<{ characterId: string }>();

  //fetch the data of a single character
  const getSingleCharacter = useCallback(async () => {
    setIsloading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${params.characterId}`
      );
      if (!response.ok) {
        throw new Error("cannot fetch single character");
      }
      const data = await response.json();
      const characterDetails = new Character(
        data.id,
        data.name,
        data.image,
        data.status,
        data.species,
        data.gender,
        data.origin.name,
        data.location.name,
        data.episode.length
      );
      setCharacter(characterDetails);
    } catch (err) {
      alert(err);
    }
    setIsloading(false);
  }, [params.characterId]);

  useEffect(() => {
    getSingleCharacter();
  }, [getSingleCharacter]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!character?.name && !isLoading) {
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
