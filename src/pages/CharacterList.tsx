import React, { useState, useEffect, useCallback } from "react";
import BoxItem from "../models/boxitem";
import CharacterBox from "../components/CharacterBox";
import ListWrapper from "../components/ListWrapper";
import Paginate from "../util/Paginate";
import { useHistory, useParams } from "react-router-dom";
import { getAllCharacter } from "../lib/api";

const CharacterList: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ page: string }>();
  const { page } = params;
  const numberpage = +page;
  const [characters, setCharacter] = useState<BoxItem[]>([]);
  const [currentPage, setCurrentPage] = useState(numberpage);
  const [picPerPage] = useState(6);
  const [isLoading, setIsloading] = useState(false);

  const loadCharacters = useCallback(async () => {
    setIsloading(true);
    try {
      const response = await getAllCharacter();
      setCharacter(response);
    } catch (err) {
      alert(err);
    } finally {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  //pagination, navigate between the pages
  useEffect(() => {
    setCurrentPage(numberpage);
    if (
      characters.length > 0 &&
      picPerPage &&
      numberpage > Math.ceil(characters.length / picPerPage)
    ) {
      history.replace("/characters/1");
    }
  }, [numberpage, characters.length, picPerPage, history]);

  const indexOfLastPic = currentPage * picPerPage;
  const indexOfFirstPic = indexOfLastPic - picPerPage;
  const currentPictures = characters.slice(indexOfFirstPic, indexOfLastPic);

  const paginateing = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    history.push(`/characters/${pageNumber}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <ListWrapper>
        {currentPictures.map((character) => (
          <CharacterBox
            key={character.id}
            id={character.id}
            name={character.name}
            picture={character.picture}
          />
        ))}
      </ListWrapper>
      <Paginate
        picPerPage={picPerPage}
        totalPics={characters.length}
        paginateing={paginateing}
        currentPage={currentPage}
      />
    </React.Fragment>
  );
};

export default CharacterList;
