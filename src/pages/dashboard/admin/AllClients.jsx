import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAllClients } from "../../../redux/features/userSlice";
import { setUsers } from "../../../redux/features/userSlice";

import RoleHeader from "../../../components/RoleHeader";
import CreateUser from "../../../components/CreateUser";
import SideBar from "../../../components/SideBar";
import Loading from "../../../components/Loading";

import ProfileCard from "../../../components/ProfileCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Cards = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const options1 = ["Home Maid"];
const options2 = ["Yearly"];

const AllClients = () => {
  const [createModal, setCreateModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { users: clients, isLoading } = useAppSelector((state) => state.user);
  const { query: searchValue } = useAppSelector((state) => state.query);

  useEffect(() => {
    dispatch(getAllClients(1))
      .unwrap()
      .then((resp) => {
        dispatch(setUsers(resp.data));
      })
      .catch((error) => {});
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleEdit = (client) => {
    setCreateModal(true);
    setEditing(true);
    setUser(client);
  };

  const handleDelete = (id) => {};

  const displayName = `${user?.lastName} ${user?.firstName}`;

  return (
    <Container>
      <RoleHeader
        text=""
        users={clients}
        sort
        onClick={() => {
          setCreateModal(true);
        }}
      />
      <Cards>
        {clients
          ?.filter((val) => {
            let searchVal = searchValue?.toLowerCase();
            if (!searchVal) return true;
            return (
              val.first_name?.toLowerCase().startsWith(searchVal) ||
              val.middle_name?.toLowerCase().startsWith(searchVal) ||
              val.lastName?.toLowerCase().startsWith(searchVal) ||
              val.gender?.toLowerCase().startsWith(searchVal)
            );
          })
          ?.map((client) => (
            <ProfileCard
              role="Client"
              header1="TYPE"
              header2="DURATION"
              options1={options1}
              options2={options2}
              id={client?.id}
              name={`${client?.first_name} ${client?.last_name}`}
              img={client.avatar}
              key={client?.id}
              user={client}
              onEdit={() => handleEdit(client)}
              onDelete={() => handleDelete(client?._id)}
              onClick={() => navigate(`${client?.id}`)}
            />
          ))}
      </Cards>

      <SideBar
        isOpen={createModal}
        hasCloseBtn={true}
        onClose={() => {
          setCreateModal(false);
          setEditing(false);
        }}
      >
        <CreateUser
          editing={editing}
          role="client"
          user={user}
          setIsCreating={createModal}
        />
      </SideBar>
    </Container>
  );
};

export default AllClients;
