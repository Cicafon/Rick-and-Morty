import styled from "styled-components";
import Card from "../util/Card";

const ProfileWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  margin: 2rem auto 0.5rem auto;
  max-width: max-content;

  h1 {
    margin: 1 0 0 0;
    font-size: 1.2em;
  }

  section {
    width: 25rem;
    margin: 0;
    text-align: left;
    padding: 0 0.5rem;
  }

  p {
    margin: 5px 0 5px 0;
  }

  @media (min-width: 600px) {
    flex-direction: row;
    h1 {
      margin: 0;
      font-size: 1.5em;
    }
    div {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
    }
    section {
      margin: 0 0.5rem;
    }
  }
`;

export default ProfileWrapper;
