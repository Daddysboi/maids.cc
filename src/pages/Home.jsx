import styled from "styled-components";

import Hero from "./home/Hero";
import SignUp from "./home/SignUp";

const Container = styled.section`
  padding: 0 3rem;
  font-family: "Inter", sans-serif;
  @media only screen and (max-width: 769px) {
    padding: 0;
  }
`;
const Homepage = () => {
  return (
    <>
      <Hero isHero hasCTA paddingTop="8rem" />
      <Container>
        <SignUp />
      </Container>
    </>
  );
};

export default Homepage;
