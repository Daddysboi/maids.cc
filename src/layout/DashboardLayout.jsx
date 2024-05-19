import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/loginSlice";
import { useAppSelector } from "../redux/hooks";

import { adminLinks } from "../pages/dashboard/Links";
import { checkInLocation } from "../utils/helpers";
import DashboardHeader from "../pages/dashboard/Header.Dashboard";
import { primaryColors } from "../assets/Colors";
import { BottomGradient } from "../components/third-party/Form";

import library from "../assets/images/library.webp";
import Logo from "../components/Logo";

const Wrapper = styled.div`
  background-color: ${primaryColors.DashBoardBackground};
  padding: 5rem 0 3rem 20%;
  min-height: 100vh;
  min-width: 100vw;
  overflow-y: hidden;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    padding-inline: ${(props) => (props.open ? "32% 0.5rem" : "3rem")};
  }

  @media only screen and (min-width: 481px) and (max-width: 600px) {
    padding-inline: 25% 0.5rem;
  }

  @media only screen and (min-width: 601px) and (max-width: 1200px) {
    padding-inline: 17% 0.5rem;
  }
  @media only screen and (min-width: 1201px) {
    padding-inline: 17% 0.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 1rem;
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 13rem;
  padding-top: 1rem;
  padding-left: 2rem;
  background-color: ${primaryColors.Purple};
  /* background-color: #000; */
  border-radius: 0 1.5rem 0 0;
  min-height: calc(100vh - 4rem);
  margin-top: -1rem;
  position: fixed;
  top: 5rem;
  left: 0;
  bottom: 0;
  z-index: 2;
  padding-bottom: 1rem;
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    width: 5.8rem;
    padding-left: 0.2rem;
    display: ${(props) => (props.open ? "block" : "none")};
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 940px) {
    width: 6rem;
    padding-left: 0.5rem;
  }
  // iPads, Tablets
  @media only screen and (min-width: 941px) and (max-width: 1200px) {
    width: 9rem;
    padding-left: 0.5rem;
  }
`;

const Button = styled.button`
  display: flex;
  gap: 0.5rem;
  padding: 8px;
  border-radius: 0.5rem;
  font-size: 0.7rem;
  cursor: pointer;
  margin-left: ${({ active }) => (active ? "0.5rem" : "")};
  transition: background-color 0.2s ease;
  background-color: ${({ active }) => (active ? "#0d214a" : "transparent")};
  color: ${({ active }) =>
    active ? `${primaryColors.Purple}` : `${primaryColors.LightPurple}`};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  width: 7rem;
  &:hover {
    /* background-color: "#adc2eb"; */
    color: ${primaryColors.LightPurple};
    /* width: 7rem; */
  }

  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    max-width: 4.3rem;
    padding-inline: 0.3rem;
    margin-left: 0;
  }
  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 1160px) {
    width: 4.5rem;
  }
`;

const SubButton = styled(Button)`
  margin: 0 0 0 1.2rem;
`;

const SideBarImg = styled.img`
  margin-top: 6rem;
  height: 4rem;
`;

const DashBoardLayout = () => {
  const [showSublinks, setShowSublinks] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const clickHandler = (url, type) => {
    if (type === "button") {
      dispatch(logout())
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          alert("Logout failed. Please try again.");
        });
    } else if (url === "dashboard") {
      navigate("/dashboard");
      return;
    } else if (type === "sublinks") {
      setShowSublinks(!showSublinks);
    } else {
      navigate(url);
    }
  };
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Wrapper open={open}>
      <DashboardHeader
        open={open}
        setOpen={setOpen}
        handleToggle={handleToggle}
      />

      <Container>
        <Aside open={open}>
          <Logo isDashBoard />
          <Links>
            {adminLinks.map((sidebar, index) => (
              <div key={index}>
                <Button
                  className={"relative group/btn "}
                  onClick={() => clickHandler(sidebar.link, sidebar.type)}
                  active={checkInLocation(sidebar.link)}
                  disabled={sidebar?.disabled}
                >
                  {sidebar.icon}
                  {sidebar.title}
                  <span>
                    {sidebar.sublinks ? (
                      <FontAwesomeIcon
                        icon={showSublinks ? faChevronRight : faChevronDown}
                      />
                    ) : null}
                  </span>
                  <BottomGradient />
                </Button>
                {sidebar.sublinks && showSublinks && (
                  <>
                    {sidebar.sublinks.map((item, subIndex) => (
                      <SubButton
                        onClick={() => navigate(item.link)}
                        key={subIndex}
                      >
                        {item.icon}
                        {item.title}
                      </SubButton>
                    ))}
                  </>
                )}
              </div>
            ))}
          </Links>
          <div>
            <SideBarImg src={library} alt="library" />
          </div>
        </Aside>
        <Outlet />
      </Container>
    </Wrapper>
  );
};

export default DashBoardLayout;
