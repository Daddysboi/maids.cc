import { Link } from "react-router-dom";
import styled from "styled-components";

import Img from "../assets/Logo/maids-logo.png";
import Img2 from "../assets/Logo/maids-logo2.png";

import { primaryColors } from "../assets/Colors";

const LinkTag = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color || primaryColors.Gray};
  text-decoration: none;
  font-weight: 700;
  font-size: 1.2rem;
  gap: 0.15rem;
  @media only screen and (max-width: 820px) {
    font-size: 1.2rem;
  }
`;

const Image = styled.img`
  height: 2.5rem;
  @media only screen and (max-width: 820px) {
    height: 3rem;
  }
`;

const Text = styled.h1`
  display: none;
  @media only screen and (min-width: 1000px) {
    display: block;
  }
`;

const Logo = ({ color, isDashBoard }) => {
  return (
    <LinkTag color={color} to="/">
      {isDashBoard ? (
        <Image src={Img2} alt="Logo" />
      ) : (
        <Image src={Img} alt="Logo" />
      )}

      <Text>Maids.cc</Text>
    </LinkTag>
  );
};

export default Logo;
