import { useState } from "react";
import styled from "styled-components";

import DetailCard from "../../../components/DetailCard";
import ChartCard from "../../../components/ChartCard";
import AppButton from "../../../components/Button";
import DoughnutChart from "../../../components/DoughnutChart";
import AreaChart from "../../../components/AreaChart";

import studentIcon from "../../../assets/images/36006.jpg";
import { primaryColors } from "../../../assets/Colors";

const Container = styled.div`
  display: flex;
  gap: 3rem;
  flex-direction: column;
  padding-bottom: 3rem;
`;

const ScrollableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 10px; /* Optional: add some padding for better look */

  /* Optional: to hide the scrollbar */
  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;

const EventList = styled.div`
  display: flex;
  gap: 1rem;
`;

const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Date = styled.div`
  background-color: ${({ color }) => color};
  border-radius: 1rem;
  width: 17.5%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoText = styled.p`
  font-size: 0.6rem;
  line-height: 1rem;
  font-weight: 500;
  margin: 0;
`;

const DateText = styled.p`
  font-size: 0.6rem;
  font-weight: 600;
  margin: 0;
`;

const Bar = styled.div`
  height: 0.3rem;
  border-radius: 0.15rem;
  background: gray;
  width: 90%;
`;

const Line = styled.div`
  background: yellow;
  height: 0.3rem;
  width: 80%;
`;

const DaysLeft = styled.div`
  font-size: 0.45rem;
  opacity: 0.8;
`;

const details = [
  {
    value: 176,
    heading: "Total Maids",
    rate: "+0.5%",
    subtext: "more than last year",
    img: `${studentIcon}`,
  },
  {
    value: 69,
    heading: "Total Clients",
    rate: "-3%",
    subtext: "less than last year",
    img: `${studentIcon}`,
  },
  {
    value: 17,
    heading: "Services",
    rate: "6%",
    subtext: "more than last year",
    img: `${studentIcon}`,
  },
  {
    value: "82",
    heading: "Invoice Status",
    rate: "+2%",
    subtext: "more than last year",
    img: `${studentIcon}`,
  },
];

const eventList = [
  {
    day: "3",
    weekday: "Wed",
    event: "I need a yound maid who can cook at VGC",
    color: `${primaryColors.LightPurple}`,
  },
  {
    day: "8",
    weekday: "Fri",
    event: "I need a nany for my baby",
    color: `${primaryColors.mintGreen}`,
  },
];

// doughnut chart

const AdminDashboard = ({ Top, CardWrapper, Mid, data }) => {
  const [slot, setSlot] = useState("week");

  return (
    <Container>
      {/* Top */}
      <Top>
        <CardWrapper>
          {details.map(({ value, heading, rate, subtext, img }, i) => (
            <div key={i}>
              <DetailCard
                value={value}
                heading={heading}
                rate={rate}
                subtext={subtext}
                image={img}
              />
            </div>
          ))}
        </CardWrapper>

        <ScrollableContainer>
          <DetailCard
            value="Total Maids by Gender"
            width="28rem"
            height="14rem"
            subtext={`We have ${data[0]} Male and ${data[1]} Females`}
            h1="1rem"
            p="0.7rem"
          >
            <DoughnutChart data={data} labelA="Male" labelB="Female" />
          </DetailCard>
        </ScrollableContainer>
      </Top>

      {/* Mid */}
      <Mid>
        <ScrollableContainer>
          <ChartCard width="15rem" height="20rem">
            <AreaChart Heading="Finance" slot={slot} setSlot={setSlot} />
          </ChartCard>
        </ScrollableContainer>

        <DetailCard
          h1="1rem"
          value="New Requests"
          width="15rem"
          height="20rem"
          paddingTop="1rem"
        >
          <EventWrapper>
            {eventList.map(({ day, weekday, event, color }, i) => (
              <EventList key={i}>
                <Date color={color}>
                  <DateText>{day}</DateText>
                  <DateText>{weekday}</DateText>
                </Date>
                <Info>
                  <InfoText>{event}</InfoText>
                  <span>
                    <DaysLeft> 3days Left</DaysLeft>

                    <Bar>
                      <Line></Line>
                    </Bar>
                  </span>
                </Info>
              </EventList>
            ))}
          </EventWrapper>

          <AppButton text=" View more" />
        </DetailCard>
      </Mid>

      {/* Bottom */}
    </Container>
  );
};

export default AdminDashboard;
