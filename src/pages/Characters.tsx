import React, { useState, useEffect } from "react";
import BoxItem from "../models/boxitem";
import CharacterBox from "../components/CharacterBox";
import ListWrapper from "../components/ListWrapper";
import Paginate from "../util/Paginate";
import { useHistory, useParams } from "react-router-dom";
import { getAllCharacter } from "../lib/api";
import useHttp from "../hooks/use-http";

const CharacterList: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ page: string }>();
  const { page } = params;
  const numberpage = +page;

  const [currentPage, setCurrentPage] = useState(numberpage);
  const [picPerPage] = useState(6);
  const {
    sendRequest,
    status,
    data: characters,
    error,
  } = useHttp(getAllCharacter, true);

  useEffect(() => {
    sendRequest(null);
  }, [sendRequest]);

  //pagination, navigate between the pages
  useEffect(() => {
    setCurrentPage(numberpage);
    if (characters) {
      if (
        characters.length > 0 &&
        picPerPage &&
        numberpage > Math.ceil(characters.length / picPerPage)
      ) {
        history.replace("/characters/1");
      }
    }
  }, [numberpage, picPerPage, history, characters]);

  const indexOfLastPic = currentPage * picPerPage;
  const indexOfFirstPic = indexOfLastPic - picPerPage;
  const currentPictures = characters?.slice(indexOfFirstPic, indexOfLastPic);

  const paginateing = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    history.push(`/characters/${pageNumber}`);
  };

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <ListWrapper>
        {currentPictures.length &&
          currentPictures.map((character: BoxItem) => (
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
