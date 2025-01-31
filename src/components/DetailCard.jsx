import styled from "styled-components";

import { primaryColors } from "../assets/Colors";

const Card = styled.div`
  border-radius: 5px;
  box-shadow: 1px 1px 2px 2px rgba(0.1, 0.1, 0.1, 0.03);
  width: ${(props) => props.width || "14rem"};
  height: ${(props) => props.height || "6.5rem"};
  padding: ${(props) => props.padding || `1rem 0 0 2rem`};
  background-color: ${(props) => props.backgroundColor || primaryColors.White};
  display: flex;
  gap: 1rem;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    /* max-width: 90%; */
    padding-bottom: 0.5rem;
    overflow-x: hidden;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  margin-bottom: 3rem;
`;

const Top = styled.div``;

const Child = styled.div`
  padding-top: ${(props) => props.paddingTop || ""};
`;
const Right = styled.div`
  align-self: center;
`;

const CardTxt = styled.h1`
  font-weight: 600;
  margin: 0.5rem 0;
  font-size: ${(props) => props.h1 || "1.2rem"};
`;

const CardHead = styled.h5`
  font-size: 0.7rem;
  font-weight: 600;
  margin: 0;
`;

const CardSubHead = styled.p`
  font-size: ${(props) => props.p || "0.5rem"};
  font-weight: 400;
  margin: 0;
  opacity: 0.7;
`;

const Span = styled.span`
  color: ${primaryColors.Green};
`;

const Img = styled.img`
  height: 2rem;
`;

const DetailCard = ({
  value,
  heading,
  rate,
  subtext,
  image,
  width,
  height,
  children,
  chart,
  h1,
  p,
  padding,
  backgroundColor,
  paddingTop,
}) => {
  return (
    <Card
      height={height}
      width={width}
      padding={padding}
      backgroundColor={backgroundColor}
    >
      <Left>
        <Top>
          <CardTxt h1={h1}>{value}</CardTxt>
          <CardHead>{heading}</CardHead>
          <CardSubHead p={p}>
            <Span>{rate}</Span> {subtext}
          </CardSubHead>
        </Top>
        <Child paddingTop={paddingTop}>{children}</Child>
      </Left>
      <Right>
        <Img src={image} alt="" />
      </Right>
      {chart && <div> {chart} </div>}
    </Card>
  );
};

export default DetailCard;
