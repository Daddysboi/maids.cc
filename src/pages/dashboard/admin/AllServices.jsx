import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAllServices } from "../../../redux/features/serviceSlice";

import CreateService from "../../../components/CreateService";
import RoleHeader from "../../../components/RoleHeader";
import Loading from "../../../components/Loading";
import SideBar from "../../../components/SideBar";
import ServiceList from "../../../components/ServiceList";
import AssignMaidService from "../../../components/AssignMaidService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: hidden;
  @media only screen and (min-width: 320px) and (max-width: 870px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  @media only screen and (min-width: 320px) and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;
const AllServices = () => {
  const [searchValue, setSearchValue] = useState("");
  const [editing, setEditing] = useState(false);
  const [creatingSubject, setCreatingSubject] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { services, isLoading } = useAppSelector((state) => state.service);

  if (isLoading) {
    return <Loading />;
  }

  const handleEdit = (subjectId) => {
    setCreatingSubject(true);
    setEditing(true);
  };

  const handleDelete = (subjectId) => {};

  return (
    <Container>
      <Header>
        <AssignMaidService />
        <RoleHeader
          text="Add"
          type="services"
          value={searchValue}
          onClick={() => {
            setCreatingSubject(true);
            setEditing(false);
          }}
          onChange={(e) => setSearchValue(e.target?.value)}
          edit="Edit"
          onEdit={() => handleEdit()}
          onDelete={() => handleDelete()}
          canDelete="Delete"
        />
        {/* Todo: HandleEdit and HandleDelete */}
      </Header>
      <ServiceList />

      <SideBar
        isOpen={creatingSubject}
        hasCloseBtn
        onClose={() => setCreatingSubject(false)}
      >
        <CreateService
          editing={editing}
          user={user}
          setIsCreating={setCreatingSubject}
        />
      </SideBar>
    </Container>
  );
};

export default AllServices;
