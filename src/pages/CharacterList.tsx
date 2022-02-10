import React, { useState, useEffect, useCallback } from "react";
import BoxItem from "../models/boxitem";
import CharacterBox from "../components/CharacterBox";
import ListWrapper from "../components/ListWrapper";
import Paginate from "../util/Paginate";
import { useHistory, useParams } from "react-router-dom";

const CharacterList: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ page: string }>();
  const { page } = params;
  const numberpage = +page;
  const [characters, setCharacter] = useState<BoxItem[]>([]);
  const [currentPage, setCurrentPage] = useState(numberpage);
  const [picPerPage] = useState(6);

  // fetching all the characters by UseEffect in CharacterList.tsx.
  // Notes:
  // This app is using 2 fetch calls as a result I put them here dierctly in the component.
  // If there were more calls, better to use a custom hook not to have too many code repetition
  // and move the getAllCharacter and getSingleCharacter funtions to a separate file/folder to ake the code shorter here

  const getAllCharacter = useCallback(async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      if (!response.ok) {
        throw new Error("cannot fetch characters");
      }
      const data = await response.json();
      const shortenedData: BoxItem[] = data.results.map(
        (item: any) => new BoxItem(item.id, item.name, item.image)
      );
      setCharacter(shortenedData);
    } catch (err) {
      alert(err);
    }
  }, []);

  useEffect(() => {
    //history.replace(`/items/${currentPage}`);
    getAllCharacter();
  }, [getAllCharacter]);

  //pagination, navigate between the pages
  useEffect(() => {
    setCurrentPage(numberpage);
    // NEW PART:
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
