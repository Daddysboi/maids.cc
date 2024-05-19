import styled from "styled-components";
import { Link } from "react-router-dom";

import { getCurrentYear } from "../utils/helpers";
import Divider from "./Divider";

const Section = styled.footer`
  padding-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #f5f5f5;
  padding-top: 4rem;
  @media only screen and (min-width: 320px) and (max-width: 700px) {
    padding: 1rem 1rem;
  }
`;

const FooterColumnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  color: #000;
  padding: 0 4rem;
  row-gap: 4rem;

  @media only screen and (min-width: 320px) and (max-width: 699px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 1.5rem;
    gap: 1rem;
  }

  @media only screen and (min-width: 700px) and (max-width: 900px) {
    /* grid-template-columns: repeat(2, 1fr); */
    padding: 0 3rem;
  }
`;

const Column = styled.div`
  flex-direction: column;
  gap: 2px;
`;

const Head = styled.h4`
  font-weight: 400;
  margin-bottom: 1rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Ul = styled.ul`
  display: flex;
  gap: 7px;
  opacity: 0.75;
  flex-direction: column;
  font-size: 0.85rem;
  padding-bottom: 1rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 0.6rem;
    padding-bottom: 0rem;
  }
`;

const Bottom = styled.span`
  margin: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #000;
  gap: 0.3rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    margin: 0 1rem;
  }
`;

const FooterCopyWright = styled.span`
  display: flex;
  align-items: center;
  color: #000;
  gap: 0.3rem;
`;

const Text = styled.span`
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export const footerLinks = [
  {
    title: "Maid Services",
    links: ["About Maids", "FAQs", "Book a Maid", "Contact Us"],
  },
  {
    title: "Visa Services",
    links: [
      "Visa Information",
      "Apply for Visa",
      "Visa FAQs",
      "Contact Visa Service",
    ],
  },

  {
    title: "Blog",
    links: ["Dubai Living", "Travel Tips", "Culture", "Local Events"],
  },
  {
    title: "Pricing",
    links: [
      "Service Fees",
      "Payment Options",
      "Special Offers",
      "Customer Reviews",
    ],
  },
  {
    title: "Dubai Maids",
    links: ["About Dubai Maids", "Services", "Contact Us", "Join Our Team"],
  },
  {
    title: "Connect With Us",
    links: ["LinkedIn", "Twitter", "Instagram", "Facebook"],
  },
];

const privacy = {
  title: "Other",
  links: ["Privacy Policy", "Terms and Condition"],
};
const FooterColumn = ({ title, links }) => (
  <Column>
    <Head>{title}</Head>
    <Ul>
      {links.map((link, index) => (
        <Link href="/" key={index}>
          {link}
        </Link>
      ))}
    </Ul>
  </Column>
);

const Footer = () => {
  return (
    <Section>
      <FooterColumnContainer>
        {footerLinks.map((column, index) => (
          <FooterColumn key={index} title={column.title} links={column.links} />
        ))}
      </FooterColumnContainer>
      <Divider />
      <Bottom>
        <FooterCopyWright>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M3 10C3 6.1339 6.1339 3 10 3C13.8661 3 17 6.1339 17 10C17 13.8661 13.8661 17 10 17C6.1339 17 3 13.8661 3 10Z"
              stroke="#020202"
              strokeWidth="1.5"
            />
            <path
              d="M11.4 12.5669C11.019 12.7215 10.6115 12.8007 10.2002 12.8C8.54331 12.8 7.20001 11.547 7.20001 9.99995C7.20001 8.45295 8.54331 7.19995 10.2002 7.19995C10.6272 7.19995 11.0325 7.28325 11.4 7.43305"
              stroke="#020202"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <Text>{getCurrentYear()} Primy. All rights reserved</Text>
        </FooterCopyWright>
        <FooterColumn links={privacy.links} />
      </Bottom>
    </Section>
  );
};

export default Footer;
