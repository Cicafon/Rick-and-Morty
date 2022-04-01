import BoxItem from "../models/boxitem";
import Character from "../models/character";

export const getAllCharacter = async () => {
  const response = await fetch(`${process.env.REACT_APP_URL}`);
  if (!response.ok) {
    throw new Error("cannot fetch characters");
  }
  const data = await response.json();
  const shortenedData: BoxItem[] = data.results.map(
    (item: any) => new BoxItem(item.id, item.name, item.image)
  );
  return shortenedData;
};

export const getSingleCharacter = async (characterId: string) => {
  const response = await fetch(`${process.env.REACT_APP_URL}/${characterId}`);
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
  return characterDetails;
};
