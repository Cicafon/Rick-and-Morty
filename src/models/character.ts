class Character {
  id: number;
  name: string;
  picture: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  lastKnownLoc: string;
  nrOfApp: number;

  constructor(
    charId: number,
    charName: string,
    charPicture: string,
    charStatus: string,
    charSpecies: string,
    charGender: string,
    charOrigin: string,
    charLastKnowLoc: string,
    charNrofApp: number
  ) {
    this.id = charId;
    this.name = charName;
    this.picture = charPicture;
    this.status = charStatus;
    this.species = charSpecies;
    this.gender = charGender;
    this.origin = charOrigin;
    this.lastKnownLoc = charLastKnowLoc;
    this.nrOfApp = charNrofApp;
  }
}

export default Character;
