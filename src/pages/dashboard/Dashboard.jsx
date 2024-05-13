import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import AppButton from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCreateModal } from "../../redux/features/modalSlice";

import AdminDashboard from "./admin/AdminDashboard";
import { FaPlus } from "react-icons/fa6";

const Container = styled.div`
  overflow: hidden;
`;

const WelcomeTab = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  // Mobile devices
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    /* flex-direction: column; */
    gap: 0.5rem;
  }

  // iPads, Tablets
  @media only screen and (min-width: 481px) and (max-width: 768px) {
  }

  // Small screens, laptops
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
  }
`;

const Heading = styled.h1`
  font-size: 1rem;
  font-weight: 600;
`;

const Subhead = styled.p`
  font-size: 0.7rem;
  text-transform: capitalize;
`;

const Top = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  // Mobile devices
  @media only screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 481px) and (max-width: 1100px) {
    flex-wrap: wrap;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 30rem;
  // Mobile devices
  @media only screen and (max-width: 480px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Mid = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: space-between;
  @media only screen and (min-width: 320px) and (max-width: 480px) {
    flex-direction: column;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 481px) and (max-width: 1100px) {
    flex-wrap: wrap;
  }
`;

const Bottom = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: space-between;
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleUnboarding = () => {
    dispatch(setCreateModal(true)).then(navigate("/dashboard/admin/maids"));
  };

  const displayName = `${user?.lastName} ${user?.firstName}`;

  const data = [57, 43];

  const action = {
    admin: { text: "New Maid", func: handleUnboarding },
  };

  const DashboardComponent = user ? AdminDashboard : null;

  return user ? (
    <Container>
      <WelcomeTab>
        <div>
          <Heading>Hey, {displayName ?? ""}</Heading>
          <Subhead>{user?.role}</Subhead>
        </div>
        {action[user?.role]?.text && (
          <AppButton
            text={action[user?.role].text}
            onClick={action[user?.role].func}
            small
            icon={<FaPlus />}
          />
        )}
      </WelcomeTab>
      {DashboardComponent ? (
        <DashboardComponent
          Top={Top}
          CardWrapper={CardWrapper}
          Mid={Mid}
          Bottom={Bottom}
          data={data}
        />
      ) : (
        <div>No dashboard available for this user.</div>
        //Todo
      )}
    </Container>
  ) : (
    <></>
  );
};

export default Dashboard;
