import { useState } from "react";
import styled from "styled-components";
import { IoNotifications, IoGift } from "react-icons/io5";
import { RiFolder5Fill } from "react-icons/ri";
import { MdOutlineCreditScore } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

import { useAppSelector } from "../../redux/hooks";

import SearchBar from "../../components/SearchBar";

import myphoto from "../../assets/images/myphoto.jpeg";
import { primaryColors } from "../../assets/Colors";

const Container = styled.div`
  display: flex;
  height: 4rem;
  margin-bottom: 1rem;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 2;
`;

const NavIcons = styled.span`
  margin: 1rem;
  z-index: 5;
  font-size: 1.5rem;
  color: #333;
  transition: 0.3s;
  cursor: pointer;
  display: none;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    display: block;
    font-size: 1rem;
  }
`;

const Left = styled.div`
  width: 20%;
  @media only screen and (min-width: 601px) and (max-width: 1200px) {
    width: 17%;
  }
`;

const Right = styled.div`
  background-color: ${primaryColors.White};
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 5rem;
  box-shadow: 1px 1px 2px 2px rgba(0.1, 0.1, 0.1, 0.03);
  @media only screen and (min-width: 320px) and (max-width: 1200px) {
    padding: 0 0.5rem;
    gap: 0.2rem;
    width: 100%;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const Circles = styled.div`
  display: none;
  @media only screen and (min-width: 480px) {
    border-radius: 1rem;
    background: ${primaryColors.Gray};
    height: 2rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #a7a7a7;
  }
`;

const IconsTab = styled.div`
  display: none;
  @media only screen and (min-width: 480px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

const UserTab = styled.div`
  width: 7rem;
  background: ${primaryColors.Gray};
  height: 2rem;
  border-radius: 1rem 0.5rem 0.5rem 1rem;
  display: flex;
  gap: 0.5rem;
  font-size: 0.6rem;
`;

const SessionTab = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
`;

const ProfilePix = styled.div`
  border-radius: 1rem;
  background: ${primaryColors.Purple};
  height: 2rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  height: 1.85rem;
  width: 1.85rem;
  border-radius: 1rem;
`;

const initialState = {
  session: "",
  term: "",
};

const Header = ({ handleToggle, open }) => {
  const [formData, setFormData] = useState(initialState);

  const { user } = useAppSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "session") {
      setSelectedsession(value);
    }
  };

  const icons = [
    <IoNotifications />,
    <IoGift />,
    <MdOutlineCreditScore />,
    <RiFolder5Fill />,
  ];

  const toggleSrc = open ? (
    <FaTimes onClick={handleToggle} />
  ) : (
    <FaBars onClick={handleToggle} />
  );
  return (
    <Container open={open} handleToggle={handleToggle}>
      <Left>
        <NavIcons>{toggleSrc}</NavIcons>
      </Left>
      <Right>
        <SearchBar />

        <Tabs>
          <IconsTab>
            {icons.map((icon, index) => (
              <Circles key={index}>{icon}</Circles>
            ))}
          </IconsTab>
          <SessionTab></SessionTab>
          <UserTab>
            <ProfilePix>
              <Img src={myphoto} alt={user?.firstName} />
            </ProfilePix>
            {user?.firstName} {user?.lastName}
          </UserTab>
        </Tabs>
      </Right>
    </Container>
  );
};

export default Header;
